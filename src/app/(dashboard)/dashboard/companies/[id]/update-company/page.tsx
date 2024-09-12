import AdminPanelLayout from "@/components/dashboard/admin-panel/admin-panel-layout";
import { ContentLayout } from "@/components/dashboard/admin-panel/content-layout";
import PlaceholderContent from "@/components/dashboard/admin-panel/placeholder-content";
import CompaniesContainer from "@/components/dashboard/companies/add-company/CompaniesContainer";
import CompanyUpdateContainer from "@/components/dashboard/companies/update-company/CompanyUpdateContainer";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Link from "next/link";

interface UpdateCompanyPageProps {
  params: {
    id: string;
  };
}

const UpdateCompanyPage = ({ params }: UpdateCompanyPageProps) => {
  return (
    <AdminPanelLayout>
      <ContentLayout title="Companies">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="/">Home</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Dashboard</BreadcrumbPage>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Companies</BreadcrumbPage>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Update Company</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <CompanyUpdateContainer id={params?.id} />
      </ContentLayout>
    </AdminPanelLayout>
  );
};

export default UpdateCompanyPage;
