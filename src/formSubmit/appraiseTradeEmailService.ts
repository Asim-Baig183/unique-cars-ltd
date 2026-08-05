import { supabase } from '../supabaseClient';

export interface AppraiseFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  make: string;
  model: string;
  year: string;
  trim: string;
  temp_odometer: string;
  bodyStyle: string;
  transmission: string;
  driveLine: string;
  fuel_type: string;
  condition: string;
  vin_number: string;
  exterior_color: string;
  frk_desire_MidV_id: string;
  additional_info: string;
}

const WEB3FORMS_ACCESS_KEY = '62931d8e-a207-4cdf-8236-f64db32759e9';

export const sendAppraiseTradeEmail = async (formData: AppraiseFormData) => {
  try {
    let desiredVehicleDetails = 'No specific vehicle selected';

    // Supabase lookup for desired vehicle if ID/search term provided
    if (formData.frk_desire_MidV_id && formData.frk_desire_MidV_id.trim() !== '') {
      const { data: vehicleData, error: dbError } = await supabase
        .from('vehicles')
        .select('*')
        .or(`id.eq.${formData.frk_desire_MidV_id},vin.ilike.%${formData.frk_desire_MidV_id}%`)
        .maybeSingle();

      if (!dbError && vehicleData) {
        desiredVehicleDetails = `
----------------------------------
DESIRED VEHICLE INVENTORY DETAILS:
----------------------------------
Vehicle ID: ${vehicleData.id || 'N/A'}
Year/Make/Model: ${vehicleData.year || ''} ${vehicleData.make || ''} ${vehicleData.model || ''}
VIN: ${vehicleData.vin || 'N/A'}
Price: $${vehicleData.price || 'N/A'}
Stock #: ${vehicleData.stock_number || 'N/A'}
----------------------------------`;
      }
    }

    const response = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        access_key: WEB3FORMS_ACCESS_KEY,
        subject: `🔄 New Trade Appraisal Request: ${formData.firstName} ${formData.lastName}`,
        from_name: `${formData.firstName} ${formData.lastName}`,
        email: formData.email,
        phone: formData.phone,
        message: `
APPRAISE MY TRADE REQUEST
----------------------------------
CLIENT INFORMATION:
Name: ${formData.firstName} ${formData.lastName}
Email: ${formData.email}
Phone: ${formData.phone}

TRADE-IN VEHICLE DETAILS:
----------------------------------
Make: ${formData.make || 'N/A'}
Model: ${formData.model || 'N/A'}
Year: ${formData.year || 'N/A'}
Trim: ${formData.trim || 'N/A'}
Odometer/Kilometers: ${formData.temp_odometer || 'N/A'}
Body Style: ${formData.bodyStyle || 'N/A'}
Transmission: ${formData.transmission || 'N/A'}
Driveline: ${formData.driveLine || 'N/A'}
Fuel Type: ${formData.fuel_type || 'N/A'}
Condition: ${formData.condition || 'N/A'}
VIN: ${formData.vin_number || 'N/A'}
Exterior Color: ${formData.exterior_color || 'N/A'}

DESIRED VEHICLE SEARCH TERM:
${formData.frk_desire_MidV_id || 'None'}

${desiredVehicleDetails}

ADDITIONAL INFORMATION:
----------------------------------
${formData.additional_info || 'None provided'}
        `,
      }),
    });

    const result = await response.json();
    return result.success ? { success: true } : { success: false, error: result.message };
  } catch (error: any) {
    return { success: false, error: error.message || 'Failed to submit appraisal request' };
  }
};