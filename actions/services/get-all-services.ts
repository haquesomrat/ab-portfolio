export const getAllServices = async () => {
  try {
    const response = await fetch(`/dashboard/services/api`);
    return response;
  } catch (error) {
    console.error("An error occurred while fetching services:", error);
  }
};
