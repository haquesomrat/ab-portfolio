export const addProject = async (formData: {
  title: string;
  description: string;
  live_link: string;
  color: string;
  preview_image: File | null;
}) => {
  try {
    // Create a FormData instance
    const formDataToSend = new FormData();

    // Append the form fields
    formDataToSend.append("title", formData.title);
    formDataToSend.append("description", formData.description);
    formDataToSend.append("live_link", formData.live_link);
    formDataToSend.append("color", formData.color);

    // Append the image if it exists
    if (formData.preview_image) {
      formDataToSend.append("preview_image", formData.preview_image);
    }

    // Send the request
    const response = await fetch(`/dashboard/projects/api/add-project`, {
      method: "POST",
      body: formDataToSend, // Using FormData
    });

    return response;
  } catch (error) {
    console.error("An error occurred:", error);
  }
};
