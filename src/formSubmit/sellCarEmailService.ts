export interface SellCarFormData {
  firstName: string;
  lastName: string;
  email: string;
  mobile: string;
  make: string;
  model: string;
  year: string;
  vinNumber: string;
  mileage: string;
}

const WEB3FORMS_ACCESS_KEY = '62931d8e-a207-4cdf-8236-f64db32759e9';

export const sendSellCarEmail = async (formData: SellCarFormData) => {
  try {
    const response = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        access_key: WEB3FORMS_ACCESS_KEY,
        subject: `🚘 Sell Us Your Car Request: ${formData.firstName} ${formData.lastName}`,
        from_name: `${formData.firstName} ${formData.lastName}`,
        email: formData.email,
        phone: formData.mobile,
        message: `
SELL US YOUR CAR REQUEST DETAILS
----------------------------------
CLIENT DETAILS:
Name: ${formData.firstName} ${formData.lastName}
Email: ${formData.email}
Mobile: ${formData.mobile}

VEHICLE DETAILS:
----------------------------------
Make: ${formData.make || 'N/A'}
Model: ${formData.model || 'N/A'}
Year: ${formData.year || 'N/A'}
VIN Number: ${formData.vinNumber || 'N/A'}
Mileage: ${formData.mileage || 'N/A'}
        `,
      }),
    });

    const result = await response.json();
    return result.success ? { success: true } : { success: false, error: result.message };
  } catch (error: any) {
    return { success: false, error: error.message || 'Failed to submit request' };
  }
};