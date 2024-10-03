export const getAllExpertises = async () => {
  try {
    const response = await fetch(`/dashboard/expertise/api`);
    return response;
  } catch (error) {
    console.error("An error occurred while fetching companies:", error);
  }
};
