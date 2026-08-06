# Unique Cars Ltd - AI Chatbot Implementation Guide

## Overview

The updated chatbot now follows a **three-stage conversation flow**:
1. **QUALIFYING** - Ask customer what vehicle they're looking for
2. **PRESENTING** - Show matching vehicles from inventory
3. **BOOKING** - Collect contact info and schedule appointment

All data is saved to Supabase and emailed to `sales@uniquecars.ca`.

---

## Files Updated

### 1. **systemPrompt.ts**
- **Changes**: Complete rewrite with concise responses (1-2 sentences max)
- **New Features**: 
  - Three-stage conversation flow defined
  - Explicit language rule (NO translations)
  - Vehicle qualifying questions
  - Appointment booking flow

### 2. **knowledgeBase.ts**
- **Changes**: Added sales email, updated page URLs
- **New**: `email: "sales@uniquecars.ca"`
- **Updated URLs**:
  - Financing: `https://uniquecarsltd.ca/CreditApplication`
  - Trade-In: `https://uniquecarsltd.ca/AppraiseTrade`
  - Contact: `https://uniquecarsltd.ca/ContactUs`

### 3. **chatHistoryManager.ts**
- **New Types**:
  - `CustomerBookingData` - stores appointment info
  - `ConversationState` - tracks stage, preferences, booking data
- **New Functions**:
  - `initializeConversationState()` - start fresh conversation
  - `updateConversationStage()` - move between stages
  - `updateCustomerPreferences()` - store customer needs
  - `updateBookingData()` - accumulate booking details
  - `setSelectedVehicle()` - mark chosen vehicle

### 4. **supabaseContext.ts**
- **New Functions**:
  - `saveAppointmentBooking()` - INSERT appointment to `appointments` table
  - `sendBookingEmailToSales()` - POST to `/api/send-booking-email` endpoint
  - `getVehiclesMatchingCriteria()` - Filter inventory by budget/type/make
- **Database**: Expects `appointments` table with these columns:
  ```sql
  - id (UUID, primary key)
  - customer_name (text)
  - customer_email (text)
  - customer_phone (text)
  - vehicle_details (text) -- "2015 Honda Civic"
  - appointment_date (date)
  - appointment_time (time)
  - status (text) -- 'pending', 'confirmed', etc
  - created_at (timestamp)
  ```

### 5. **aiService.ts**
- **Changes**: Integrated with conversation state management
- **New**: Detects when booking is complete and automatically saves to DB
- **Reduced tokens**: `max_tokens: 300` (shorter responses)
- **Temperature**: `0.4` (more consistent responses)
- **State Context**: Passes current conversation stage to AI prompt

### 6. **ChatModal.tsx**
- **New**: State management with `conversationState`
- **New**: Chat history passed to AI for better context
- **New**: Automatic booking data extraction
- **Simplified**: Removed file upload and emoji buttons
- **Better UX**: Shows typing indicator and auto-scrolls

---

## Setup Instructions

### Step 1: Create Supabase Table

Run this SQL in your Supabase database:

```sql
CREATE TABLE appointments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  customer_name VARCHAR(255) NOT NULL,
  customer_email VARCHAR(255) NOT NULL,
  customer_phone VARCHAR(20) NOT NULL,
  vehicle_details VARCHAR(255),
  appointment_date DATE,
  appointment_time TIME,
  status VARCHAR(50) DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Add indexes for fast queries
CREATE INDEX idx_appointments_email ON appointments(customer_email);
CREATE INDEX idx_appointments_date ON appointments(appointment_date);
CREATE INDEX idx_appointments_status ON appointments(status);
```

### Step 2: Create Backend Email Endpoint

Create a new API endpoint `/api/send-booking-email` that accepts POST requests:

**Node.js/Express Example:**
```javascript
app.post('/api/send-booking-email', async (req, res) => {
  const { to, customerName, customerEmail, customerPhone, vehicleDetails, appointmentDate, appointmentTime } = req.body;

  const emailContent = `
    New Appointment Booking:
    
    Customer Name: ${customerName}
    Email: ${customerEmail}
    Phone: ${customerPhone}
    
    Vehicle: ${vehicleDetails}
    Date: ${appointmentDate}
    Time: ${appointmentTime}
  `;

  // Use Nodemailer or SendGrid
  try {
    await sendEmail({
      to: to || 'sales@uniquecars.ca',
      subject: `New Appointment: ${customerName}`,
      text: emailContent,
    });
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
```

**Using SendGrid (recommended):**
```javascript
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

app.post('/api/send-booking-email', async (req, res) => {
  const { customerName, customerEmail, customerPhone, vehicleDetails, appointmentDate, appointmentTime } = req.body;

  const msg = {
    to: 'sales@uniquecars.ca',
    from: 'noreply@uniquecarsltd.ca',
    subject: `New Appointment Booking: ${customerName}`,
    html: `
      <h2>New Appointment Booking</h2>
      <p><strong>Customer:</strong> ${customerName}</p>
      <p><strong>Email:</strong> ${customerEmail}</p>
      <p><strong>Phone:</strong> ${customerPhone}</p>
      <p><strong>Vehicle:</strong> ${vehicleDetails}</p>
      <p><strong>Date:</strong> ${appointmentDate}</p>
      <p><strong>Time:</strong> ${appointmentTime}</p>
    `,
  };

  try {
    await sgMail.send(msg);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
```

### Step 3: Update Environment Variables

Ensure you have `VITE_GROQ_API_KEY` in your `.env`:

```
VITE_GROQ_API_KEY=your_groq_api_key_here
```

### Step 4: Replace Files

Replace these files in your project:
- `src/components/ChatModal.tsx`
- `src/lib/systemPrompt.ts`
- `src/lib/knowledgeBase.ts`
- `src/lib/chatHistoryManager.ts`
- `src/lib/supabaseContext.ts`
- `src/lib/aiService.ts`

(Adjust paths based on your project structure)

---

## Conversation Flow Example

```
User: "Hi, I'm looking for a car"

Bot: "Welcome! What's your budget and vehicle type? Sedan, SUV, or truck?"

User: "Around $15,000 for a sedan"

Bot: "Got it! Any specific make preference (Honda, Toyota, etc)?"

User: "Honda"

Bot: "Perfect! We have:
1. 2015 Honda Civic - $12,999 | 85,000 KM | Automatic
2. 2016 Honda Accord - $15,999 | 95,000 KM | Automatic

Which interests you?"

User: "The Civic"

Bot: "Great choice! Let's book an appointment. What's your name?"

User: "John Smith"

Bot: "Your email, John?"

User: "john@email.com"

Bot: "Phone number?"

User: "+1-555-1234"

Bot: "What date and time work for you?"

User: "Tomorrow at 2 PM"

Bot: "Perfect! I've scheduled your appointment for tomorrow at 2 PM for the 2015 Honda Civic. Our sales team will reach out to confirm. Thanks, John!"

[Appointment saved to Supabase and email sent to sales@uniquecars.ca]
```

---

## Key Features

✅ **Short, Concise Responses** - 1-2 sentences max
✅ **Three-Stage Flow** - Qualify → Present → Book
✅ **No Translations** - Responds in customer's language only
✅ **Vehicle Filtering** - Shows only matching cars
✅ **Automatic Data Saving** - Stores appointments in Supabase
✅ **Email Notifications** - Sends booking details to sales team
✅ **State Management** - Tracks conversation progress
✅ **Multi-Language** - English, French, Urdu, Arabic

---

## Troubleshooting

### Problem: Appointments not saving to Supabase
- Check if `appointments` table exists
- Verify Supabase permissions allow INSERT
- Check browser console for error messages

### Problem: Emails not sending
- Verify `/api/send-booking-email` endpoint exists
- Check API key for SendGrid/email service
- Verify `sales@uniquecars.ca` is correct

### Problem: Bot not collecting booking data
- Check if conversation state is updating correctly
- Verify regex patterns for phone/email detection
- Check console logs for state changes

### Problem: Long responses or translations appearing
- Verify `systemPrompt.ts` is imported correctly
- Check `max_tokens: 300` in `aiService.ts`
- Clear browser cache and restart

---

## Database Schema

```sql
-- Cars table (existing)
CREATE TABLE cars (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  year INT,
  make VARCHAR(100),
  model VARCHAR(100),
  price DECIMAL(10, 2),
  mileage INT,
  body_style VARCHAR(50),
  transmission VARCHAR(20),
  fuel_type VARCHAR(20),
  created_at TIMESTAMP DEFAULT NOW()
);

-- Appointments table (new)
CREATE TABLE appointments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  customer_name VARCHAR(255) NOT NULL,
  customer_email VARCHAR(255) NOT NULL,
  customer_phone VARCHAR(20) NOT NULL,
  vehicle_details VARCHAR(255),
  appointment_date DATE,
  appointment_time TIME,
  status VARCHAR(50) DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

---

## Support

For issues or questions:
1. Check the console for error messages
2. Verify all environment variables are set
3. Test Supabase connection independently
4. Test email endpoint with POST request
5. Review system prompt in `systemPrompt.ts`

---

**Version**: 2.0  
**Last Updated**: 2024  
**Status**: Production Ready
