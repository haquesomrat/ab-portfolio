export const getAllFeedbacks = async () => {
  try {
    const response = await fetch(`/dashboard/feedback/api`);
    return response;
  } catch (error) {
    console.error("An error occurred while fetching :", error);
  }
};
