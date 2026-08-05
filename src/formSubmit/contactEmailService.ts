  import { supabase } from '../supabaseClient';

export interface ContactFormData {
  f_name: string;
  l_name: string;
  email: string;
  mobile: string;
  frk_midv_id: string;
  message: string;
}

const WEB3FORMS_ACCESS_KEY = '62931d8e-a207-4cdf-8236-f64db32759e9';

export const sendContactEmail = async (formData: ContactFormData) => {
  try {
    let vehicleDetailsStr = 'No specific vehicle searched';

    if (formData.frk_midv_id && formData.frk_midv_id.trim() !== '') {
      const { data: vehicleData, error: dbError } = await supabase
        .from('vehicles')
        .select('*')
        .or(`id.eq.${formData.frk_midv_id},vin.ilike.%${formData.frk_midv_id}%`)
        .maybeSingle();

      if (!dbError && vehicleData) {
        vehicleDetailsStr = `
----------------------------------
ATTACHED VEHICLE DETAILS:
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
        Accept: 'application/json'
      },
      body: JSON.stringify({
        access_key: WEB3FORMS_ACCESS_KEY,
        subject: `New Inquiry from ${formData.f_name} ${formData.l_name}`,
        from_name: `${formData.f_name} ${formData.l_name}`,
        email: formData.email,
        phone: formData.mobile,
        message: `
Client Details:
----------------------------------
First Name: ${formData.f_name}
Last Name: ${formData.l_name}
Email: ${formData.email}
Phone: ${formData.mobile}
Search Term / Vehicle ID: ${formData.frk_midv_id || 'N/A'}

${vehicleDetailsStr}

Message:
${formData.message}
        `
      })
    });

    const result = await response.json();

    if (result.success) {
      return { success: true };
    } else {
      return { success: false, error: result.message };
    }
  } catch (error: any) {
    return { success: false, error: error.message || 'Failed to submit form' };
  }
};