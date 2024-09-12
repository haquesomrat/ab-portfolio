// "use client";
// import { useEffect, useState } from "react";
import { CompanyList } from "./CompanyList";

const CompanyListContainer = () => {
  // const [companies, setCompanies] = useState([]);
  // useEffect(() => {
  //   const getAllCompanies = async () => {
  //     const res = await fetch(
  //       `${process.env.NEXT_PUBLIC_BASE_URL}/dashboard/companies/api`
  //     );
  //     const data = await res.json();
  //     setCompanies(data);
  //   };
  //   getAllCompanies();
  // }, []);

  return (
    <div className="w-full py-4">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Company List</h2>
      </div>
      <CompanyList />
    </div>
  );
};

export default CompanyListContainer;
