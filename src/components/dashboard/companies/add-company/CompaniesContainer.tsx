"use client";
import React, { useEffect, useState } from "react";
import { AddCompaniesForm } from "./AddCompaniesForm";

const CompaniesContainer = () => {
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
        <h2 className="text-3xl font-bold tracking-tight">Add Company</h2>
      </div>
      <AddCompaniesForm />
    </div>
  );
};

export default CompaniesContainer;
