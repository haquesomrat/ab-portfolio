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
      const res = await fetch(`/dashboard/companies/api`);
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
    </div>
  );
};

export default CompanyUpdateContainer;
