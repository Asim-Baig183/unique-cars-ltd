// src/services/emailService.ts

const WEB3FORMS_ACCESS_KEY = 'f510b626-04fa-4d33-9bc7-1148f8617086'; // <-- YAHAN APNI ACCESS KEY PASTE KAREIN

export interface ContactFormData {
  f_name: string;
  l_name: string;
  email: string;
  mobile: string;
  frk_midv_id: string; // Vehicle Search field
  message: string;
}

export const sendContactEmail = async (formData: ContactFormData) => {
  try {
    const response = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        access_key: WEB3FORMS_ACCESS_KEY,
        subject: `[Contact Form] New Inquiry from ${formData.f_name} ${formData.l_name}`,
        from_name: `${formData.f_name} ${formData.l_name}`,
        customer_email: formData.email,
        customer_phone: formData.mobile,
        vehicle_search: formData.frk_midv_id || 'Not Specified',
        message: formData.message,
      }),
    });

    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Email sending error:', error);
    return { success: false, message: 'Network error occurred.' };
  }
};