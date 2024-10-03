export const addFeedback = async (formData: {
  name: string;
  company: string;
  feedback: string;
  color: string;
  image: File | null;
}) => {
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
    const response = await fetch(`/dashboard/feedback/api/add-feedback`, {
      method: "POST",
      body: formDataToSend, // Using FormData
    });

    return response;
  } catch (error) {
    console.error("An error occurred:", error);
  }
};
