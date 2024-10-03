export const addNewCompany = async (formData: {
  companyName: string;
  companyImage: File | null;
}) => {
  try {
    // Create a FormData instance
    const formDataToSend = new FormData();

    // Append the form fields
    formDataToSend.append("companyName", formData.companyName);

    // Append the image if it exists
    if (formData.companyImage) {
      formDataToSend.append("companyImage", formData.companyImage);
    }

    // Send the request
    const response = await fetch(`/dashboard/companies/api/add-company`, {
      method: "POST",
      body: formDataToSend, // Using FormData
    });

    return response;
  } catch (error) {
    console.error("An error occurred:", error);
  }
};
