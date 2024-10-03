export const addHeroData = async (formData: {
  motto: string;
  headline: string;
  intro: string;
  logo: File | null;
}) => {
  try {
    // Create a FormData instance
    const formDataToSend = new FormData();

    // Append the form fields
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
