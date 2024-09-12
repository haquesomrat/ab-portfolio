import { CompanyList } from "./CompanyList";

const CompanyListContainer = () => {
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
