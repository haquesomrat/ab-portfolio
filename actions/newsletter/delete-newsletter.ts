export const deleteNewsletter = async (id: string) => {
  try {
    const response = await fetch(
      `/dashboard/newsletter/api/delete-newsletter/${id}`,
      {
        method: "DELETE",
      }
    );
    return response;
  } catch (error) {
    console.error("An error occurred:", error);
  }
};
