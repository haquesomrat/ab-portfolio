import axios from "axios";
export const updateExpertise = async (
  id: string,
  formData: {
    name: string;
    duration: string;
    delay: string;
    radiusSmall: string;
    radiusLarge: string;
    logo: File | string;
  }
) => {
  try {
    // Create a FormData instance
    const formDataToSend = new FormData();

    // Append the form fields
    formDataToSend.append("name", formData.name);
    formDataToSend.append("duration", formData.duration);
    formDataToSend.append("delay", formData.delay);
    formDataToSend.append("radiusSmall", formData.radiusSmall);
    formDataToSend.append("radiusLarge", formData.radiusLarge);

    // Append the image if it exists
    if (formData.logo) {
      formDataToSend.append("logo", formData.logo);
    }

    // Send the request
    const response = await axios.patch(
      `/dashboard/expertise/api/update-expertise/${id}`,
      formDataToSend
    );

    return response;
  } catch (error) {
    console.error("An error occurred:", error);
  }
};
