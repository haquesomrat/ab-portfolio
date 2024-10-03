export const getAllNewsletters = async () => {
  try {
    const response = await fetch(`/dashboard/newsletter/api`);
    return response;
  } catch (error) {
    console.error("An error occurred while fetching :", error);
  }
};
