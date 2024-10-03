export const getAllProjects = async () => {
  try {
    const response = await fetch(`/dashboard/projects/api`);
    return response;
  } catch (error) {
    console.error("An error occurred while fetching:", error);
  }
};
