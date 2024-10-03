export const deleteCompany = async (id: string) => {
  try {
    const response = await fetch(
      `/dashboard/companies/api/delete-company/${id}`,
      {
        method: "DELETE",
      }
    );
    return response;
  } catch (error) {
    console.error("An error occurred:", error);
  }
};
