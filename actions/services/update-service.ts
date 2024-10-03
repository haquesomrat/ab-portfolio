import axios from "axios";
export const updateService = async (
  id: string,
  formData: {
    name: string;
    details: string;
    logo: File | string;
  }
) => {
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
    const response = await axios.patch(
      `/dashboard/services/api/update-service/${id}`,
      formDataToSend
    );

    return response;
  } catch (error) {
    console.error("An error occurred:", error);
  }
};
