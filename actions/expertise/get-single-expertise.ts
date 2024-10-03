export const getSingleExpertise = async (id: string) => {
  try {
    const response = await fetch(`/dashboard/expertise/api/${id}`);
    return response;
  } catch (error) {
    console.error("An error occurred:", error);
  }
};
