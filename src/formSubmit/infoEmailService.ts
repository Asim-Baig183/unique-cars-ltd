export interface InfoFormPayload {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  message: string;
  vehicleDetails?: {
    stockNumber?: string;
    year?: number;
    make?: string;
    model?: string;
    price?: string;
    vin?: string;
  };
}

export const sendInfoEmail = async (data: InfoFormPayload): Promise<Response> => {
  const WEB3FORMS_URL = "https://api.web3forms.com/submit";

  const emailBody = {
    access_key: "62931d8e-a207-4cdf-8236-f64db32759e9", // 👈 Yahan apni Web3Forms ki Key daalein
    subject: `New Inquiry: ${data.vehicleDetails?.year || ''} ${data.vehicleDetails?.make || ''} ${data.vehicleDetails?.model || ''} (Stock #${data.vehicleDetails?.stockNumber || 'N/A'})`,
    from_name: "Unique Cars Ltd - Get More Info",
    "First Name": data.firstName,
    "Last Name": data.lastName,
    "Email": data.email,
    "Phone": data.phone,
    "Message": data.message || "No message provided",
    "Stock Number": data.vehicleDetails?.stockNumber || "N/A",
    "Vehicle": `${data.vehicleDetails?.year || ''} ${data.vehicleDetails?.make || ''} ${data.vehicleDetails?.model || ''}`.trim() || "N/A",
    "Vehicle Price": data.vehicleDetails?.price || "N/A",
    "VIN": data.vehicleDetails?.vin || "N/A",
  };

  const response = await fetch(WEB3FORMS_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(emailBody),
  });

  const result = await response.json();

  if (!response.ok || !result.success) {
    throw new Error(result.message || "Failed to send information inquiry email");
  }

  return response;
};