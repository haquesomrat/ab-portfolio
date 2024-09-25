import AdminPanelLayout from "@/components/dashboard/admin-panel/admin-panel-layout";
import { ContentLayout } from "@/components/dashboard/admin-panel/content-layout";
import NewsletterContainer from "@/components/dashboard/newsletter/NewsletterContainer";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Link from "next/link";

export const metadata = {
  title: "The Developer's Dashboard",
  description: "Modern Thinking Developer With Impressive Ideas",
};

const NewsletterPage = () => {
  return (
    <AdminPanelLayout>
      <ContentLayout title="Dashboard">
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
              <BreadcrumbPage>Newsletters</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <NewsletterContainer />
      </ContentLayout>
    </AdminPanelLayout>
  );
};

export default NewsletterPage;
