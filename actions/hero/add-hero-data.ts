export const addHeroData = async (formData: {
  email: string;
  contact: string;
  motto: string;
  headline: string;
  intro: string;
  logo: File | string;
}) => {
  try {
    // Create a FormData instance
    const formDataToSend = new FormData();

    // Append the form fields
    formDataToSend.append("email", formData.email);
    formDataToSend.append("contact", formData.contact);
    formDataToSend.append("motto", formData.motto);
    formDataToSend.append("headline", formData.headline);
    formDataToSend.append("intro", formData.intro);

    // Append the image if it exists
    if (formData.logo) {
      formDataToSend.append("logo", formData.logo);
    }

    // Send the request
    const response = await fetch(`/dashboard/hero/api`, {
      method: "POST",
      body: formDataToSend, // Using FormData
    });

    return response;
  } catch (error) {
    console.error("An error occurred:", error);
  }
};
