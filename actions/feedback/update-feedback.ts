import axios from "axios";
export const updateFeedback = async (
  id: string,
  formData: {
    name: string;
    company: string;
    feedback: string;
    color: string;
    image: File | string;
  }
) => {
  try {
    // Create a FormData instance
    const formDataToSend = new FormData();

    // Append the form fields
    formDataToSend.append("name", formData.name);
    formDataToSend.append("company", formData.company);
    formDataToSend.append("feedback", formData.feedback);
    formDataToSend.append("color", formData.color);

    // Append the image if it exists
    if (formData.image) {
      formDataToSend.append("image", formData.image);
    }

    // Send the request
    const response = await axios.patch(
      `/dashboard/feedback/api/update-feedback/${id}`,
      formDataToSend
    );

    return response;
  } catch (error) {
    console.error("An error occurred:", error);
  }
};
