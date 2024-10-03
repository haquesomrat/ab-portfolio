export const getSingleCompany = async (id: string) => {
  try {
    const response = await fetch(`/dashboard/companies/api/${id}`);
    return response;
  } catch (error) {
    console.error("An error occurred:", error);
  }
};
