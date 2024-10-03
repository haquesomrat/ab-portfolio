export const getSingleProject = async (id: string) => {
  try {
    const response = await fetch(`/dashboard/projects/api/${id}`);
    return response;
  } catch (error) {
    console.error("An error occurred:", error);
  }
};
