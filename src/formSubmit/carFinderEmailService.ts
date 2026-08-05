export interface CarFinderFormData {
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
  additional_info: string;
}

const WEB3FORMS_ACCESS_KEY = '62931d8e-a207-4cdf-8236-f64db32759e9'; // 🔑 Apna Access Key yahan rakhein

export const sendCarFinderEmail = async (formData: CarFinderFormData) => {
  try {
    const response = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify({
        access_key: WEB3FORMS_ACCESS_KEY,
        subject: `🚗 New Car Finder Request: ${formData.firstName} ${formData.lastName}`,
        from_name: `${formData.firstName} ${formData.lastName}`,
        email: formData.email,
        phone: formData.phone,
        message: `
CAR FINDER REQUEST DETAILS
----------------------------------
CLIENT INFORMATION:
Name: ${formData.firstName} ${formData.lastName}
Email: ${formData.email}
Phone: ${formData.phone}

DESIRED VEHICLE DETAILS:
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

ADDITIONAL INFORMATION:
----------------------------------
${formData.additional_info || 'None provided'}
        `
      })
    });

    const result = await response.json();
    return result.success ? { success: true } : { success: false, error: result.message };
  } catch (error: any) {
    return { success: false, error: error.message || 'Failed to submit car finder request' };
  }
};