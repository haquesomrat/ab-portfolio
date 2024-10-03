export const getSingleService = async (id: string) => {
  try {
    const response = await fetch(`/dashboard/services/api/${id}`);
    return response;
  } catch (error) {
    console.error("An error occurred:", error);
  }
};
