export const getAllSocials = async () => {
  try {
    const response = await fetch(`/dashboard/footer/api`);
    return response;
  } catch (error) {
    console.error("An error occurred while fetching :", error);
  }
};
