export const deleteFeedback = async (id: string) => {
  try {
    const response = await fetch(
      `/dashboard/feedback/api/delete-feedback/${id}`,
      {
        method: "DELETE",
      }
    );
    return response;
  } catch (error) {
    console.error("An error occurred:", error);
  }
};
