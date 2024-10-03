export const getHeroData = async () => {
  try {
    const response = await fetch("/dashboard/hero/api");
    return response;
  } catch (error) {
    console.error("An error occurred while fetching companies:", error);
  }
};
