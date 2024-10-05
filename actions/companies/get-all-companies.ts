export const getAllCompanies = async () => {
  try {
    const response = await fetch(`/dashboard/companies/api`, {
      cache: "no-store",
    });
    return response;
  } catch (error) {
    console.error("An error occurred while fetching companies:", error);
  }
};
