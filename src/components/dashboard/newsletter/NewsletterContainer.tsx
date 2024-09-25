import { NewsletterTable } from "./NewsletterTable";

const NewsletterContainer = () => {
  return (
    <div className="w-full py-4">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Newsletters</h2>
      </div>
      <NewsletterTable />
    </div>
  );
};

export default NewsletterContainer;
