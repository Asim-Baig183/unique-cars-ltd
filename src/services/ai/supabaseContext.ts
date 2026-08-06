import { supabase } from '../../supabaseClient';
import {type CustomerBookingData } from './chatHistoryManager';

export const getLiveInventoryContext = async (): Promise<string> => {
  try {
    // Fetch cars from Supabase table
    const { data: cars, count, error } = await supabase
      .from('cars')
      .select('id, year, make, model, price, mileage, body_style, transmission, fuel_type', { count: 'exact' })
      .order('year', { ascending: false });

    if (error) {
      console.error("Supabase Inventory Error:", error.message);
      return "=== LIVE INVENTORY CONTEXT ===\nStatus: Error fetching database inventory. Check https://uniquecarsltd.ca/inventory";
    }

    if (!cars || cars.length === 0) {
      return "=== LIVE INVENTORY CONTEXT ===\nTotal vehicles in stock: 0";
    }

    const totalCount = count ?? cars.length;

    // Create detailed inventory list
    const inventorySummary = cars
      .map(
        (car) =>
          `- ${car.year || ''} ${car.make || ''} ${car.model || ''} | $${car.price ? car.price.toLocaleString() : 'N/A'} | ${car.mileage ? car.mileage.toLocaleString() + ' KM' : 'N/A'} | ${car.transmission || 'Unknown'}`
      )
      .join('\n');

    return `=== LIVE INVENTORY CONTEXT ===
Total cars available: ${totalCount}

VEHICLE LIST:
${inventorySummary}

INSTRUCTION: Always refer to the actual vehicles above when recommending cars. Be specific with make, model, year, and price.`;
  } catch (err) {
    console.error("Error fetching live inventory:", err);
    return "=== LIVE INVENTORY CONTEXT ===\nInventory lookup failed.";
  }
};

export const saveAppointmentBooking = async (
  bookingData: CustomerBookingData
): Promise<{ success: boolean; error?: string }> => {
  try {
    // Save to Supabase 'appointments' table
    const { data, error } = await supabase
      .from('appointments')
      .insert([
        {
          customer_name: bookingData.name,
          customer_email: bookingData.email,
          customer_phone: bookingData.phone,
          vehicle_details: bookingData.vehicleDetails,
          appointment_date: bookingData.appointmentDate,
          appointment_time: bookingData.appointmentTime,
          created_at: bookingData.createdAt,
          status: 'pending', // pending, confirmed, completed, cancelled
        },
      ])
      .select();

    if (error) {
      console.error("Supabase Insert Error:", error.message);
      return { success: false, error: error.message };
    }

    console.log("Appointment saved:", data);
    return { success: true };
  } catch (err) {
    console.error("Error saving appointment:", err);
    return { success: false, error: String(err) };
  }
};

export const sendBookingEmailToSales = async (
  bookingData: CustomerBookingData
): Promise<{ success: boolean; error?: string }> => {
  try {
    // Web3Forms API endpoint
    const emailData = {
      access_key: '62931d8e-a207-4cdf-8236-f64db32759e9', // Your Web3Forms Access Key
      service_id: 'default_service',
      template_id: 'default_template',
      from_name: 'Unique Cars Ltd Chatbot',
      from_email: 'noreply@uniquecarsltd.ca',
      to_email: 'sales@uniquecars.ca',
      subject: `New Appointment Booking: ${bookingData.name}`,
      reply_to_email: bookingData.email,
      
      // Email template variables
      customer_name: bookingData.name,
      customer_email: bookingData.email,
      customer_phone: bookingData.phone,
      vehicle_details: bookingData.vehicleDetails,
      appointment_date: bookingData.appointmentDate,
      appointment_time: bookingData.appointmentTime,
      
      // Email message content
      message: `
New Appointment Booking from Chatbot

---CUSTOMER INFORMATION---
Name: ${bookingData.name}
Email: ${bookingData.email}
Phone: ${bookingData.phone}

---APPOINTMENT DETAILS---
Vehicle: ${bookingData.vehicleDetails}
Date: ${bookingData.appointmentDate}
Time: ${bookingData.appointmentTime}

---ACTION REQUIRED---
Please follow up with the customer to confirm this appointment.

Sent from: Unique Cars Ltd Chatbot
      `,
    };

    const response = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(emailData),
    });

    const data = await response.json();

    if (data.success) {
      console.log('✅ Booking email sent successfully to sales@uniquecars.ca');
      return { success: true };
    } else {
      console.error('Web3Forms error:', data);
      return { success: false, error: data.message || 'Failed to send email' };
    }
  } catch (err) {
    console.error('Error sending email:', err);
    return { success: false, error: String(err) };
  }
};

export const getVehiclesMatchingCriteria = async (criteria: {
  budget?: string;
  vehicleType?: string;
  make?: string;
  transmission?: string;
}): Promise<any[]> => {
  try {
    let query = supabase.from('cars').select('*');

    // Filter by budget (simple parsing: "$10000-$20000" or "under $15000")
    if (criteria.budget) {
      // This is simplified - you may need more robust budget parsing
      const budgetNum = parseInt(criteria.budget.replace(/\D/g, ''));
      if (budgetNum) {
        query = query.lte('price', budgetNum * 1.2); // 20% flexibility
      }
    }

    // Filter by vehicle type
    if (criteria.vehicleType) {
      query = query.ilike('body_style', `%${criteria.vehicleType}%`);
    }

    // Filter by make
    if (criteria.make) {
      query = query.ilike('make', `%${criteria.make}%`);
    }

    // Filter by transmission
    if (criteria.transmission) {
      query = query.ilike('transmission', `%${criteria.transmission}%`);
    }

    const { data, error } = await query.limit(5);

    if (error) {
      console.error("Filter Error:", error.message);
      return [];
    }

    return data || [];
  } catch (err) {
    console.error("Error filtering vehicles:", err);
    return [];
  }
};
