export const addService = async (formData: {
  name: string;
  details: string;
  logo: File | null;
}) => {
  try {
    // Create a FormData instance
    const formDataToSend = new FormData();

    // Append the form fields
    formDataToSend.append("name", formData.name);
    formDataToSend.append("details", formData.details);

    // Append the image if it exists
    if (formData.logo) {
      formDataToSend.append("logo", formData.logo);
    }

    // Send the request
    const response = await fetch(`/dashboard/services/api/add-service`, {
      method: "POST",
      body: formDataToSend, // Using FormData
    });

    return response;
  } catch (error) {
    console.error("An error occurred:", error);
  }
};
