export const deleteSocial = async (platform: string) => {
  try {
    const response = await fetch(`/dashboard/footer/api/delete-social`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: platform }),
    });
    return response;
  } catch (error) {
    console.error("An error occurred:", error);
  }
};
