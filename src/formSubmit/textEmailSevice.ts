export interface ContactTextData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  searchVehicle?: string;
  message: string;
}

export interface SendEmailResponse {
  success: boolean;
  message?: string;
}

export const sendTextEmail = async (data: ContactTextData): Promise<SendEmailResponse> => {
  const WEB3FORMS_URL = "https://api.web3forms.com/submit";

  // Web3Forms Key (Apni Key yahan replace karein)
  const ACCESS_KEY = "62931d8e-a207-4cdf-8236-f64db32759e9";

  const emailPayload = {
    access_key: ACCESS_KEY,
    subject: `New Text Inquiry from ${data.firstName} ${data.lastName}`,
    from_name: "Unique Cars Ltd - Text Us",
    "First Name": data.firstName,
    "Last Name": data.lastName,
    "Email": data.email,
    "Phone": data.phone,
    "Interested Vehicle": data.searchVehicle || "N/A",
    "Message": data.message || "No message provided",
  };

  try {
    const response = await fetch(WEB3FORMS_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(emailPayload),
    });

    const result = await response.json();

    if (response.ok && result.success) {
      return { success: true, message: "Email sent successfully!" };
    } else {
      return { 
        success: false, 
        message: result.message || "Failed to send email. Please try again." 
      };
    }
  } catch (error) {
    console.error("Error sending text inquiry email:", error);
    return {
      success: false,
      message: "Network error. Please check your connection and try again.",
    };
  }
};