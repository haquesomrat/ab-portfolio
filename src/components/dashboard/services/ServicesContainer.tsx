import { ServiceTable } from "./ServicesTable";

const ServicesContainer = () => {
  return (
    <div className="w-full py-4">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Services</h2>
      </div>
      <ServiceTable />
      <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-[1px] w-full" />
    </div>
  );
};

export default ServicesContainer;
