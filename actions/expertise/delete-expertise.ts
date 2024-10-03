export const deleteExpertise = async (id: string) => {
  try {
    const response = await fetch(
      `/dashboard/expertise/api/delete-expertise/${id}`,
      {
        method: "DELETE",
      }
    );
    return response;
  } catch (error) {
    console.error("An error occurred:", error);
  }
};
