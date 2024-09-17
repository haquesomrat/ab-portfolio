"use client";
import React, { useEffect, useState } from "react";
import { CompanyUpdateForm } from "./CompanyUpdateForm";

interface CompanyUpdateContainerProps {
  id: string;
}
const CompanyUpdateContainer = ({ id }: CompanyUpdateContainerProps) => {
  const [companies, setCompanies] = useState([]);
  useEffect(() => {
    const getAllCompanies = async () => {
      const res = await fetch(
        `${process.env.NEXTAUTH_URL}/dashboard/companies/api`
      );
      const data = await res.json();
      setCompanies(data);
    };
    getAllCompanies();
  }, []);

  return (
    <div className="w-full py-4">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Update Company</h2>
      </div>
      <CompanyUpdateForm id={id} />
      <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-[1px] w-full" />
    </div>
  );
};

export default CompanyUpdateContainer;
