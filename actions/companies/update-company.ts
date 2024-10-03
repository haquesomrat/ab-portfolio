import axios from "axios";
export const updateCompany = async (
  id: string,
  formData: {
    companyName: string;
    companyImage: File | string;
  }
) => {
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
    const response = await axios.patch(
      `/dashboard/companies/api/update-company/${id}`,
      formDataToSend
    );

    return response;
  } catch (error) {
    console.error("An error occurred:", error);
  }
};
