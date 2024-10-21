export const getAllProjects = async () => {
  try {
    const response = await fetch(`/dashboard/projects/api`, {
      cache: "no-store",
      next: { revalidate: 3600 },
    });
    return response;
  } catch (error) {
    console.error("An error occurred while fetching:", error);
  }
};
