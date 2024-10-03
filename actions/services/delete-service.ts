export const deleteService = async (id: string) => {
  try {
    const response = await fetch(
      `/dashboard/services/api/delete-service/${id}`,
      {
        method: "DELETE",
      }
    );
    return response;
  } catch (error) {
    console.error("An error occurred:", error);
  }
};
