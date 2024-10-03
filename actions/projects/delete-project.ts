export const deleteProject = async (id: string) => {
  try {
    const response = await fetch(
      `/dashboard/projects/api/delete-project/${id}`,
      {
        method: "DELETE",
      }
    );
    return response;
  } catch (error) {
    console.error("An error occurred:", error);
  }
};
