export const getSingleFeedback = async (id: string) => {
  try {
    const response = await fetch(`/dashboard/feedback/api/${id}`);
    return response;
  } catch (error) {
    console.error("An error occurred:", error);
  }
};
