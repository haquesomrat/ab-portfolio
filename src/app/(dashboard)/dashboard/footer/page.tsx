import AdminPanelLayout from "@/components/dashboard/admin-panel/admin-panel-layout";
import { ContentLayout } from "@/components/dashboard/admin-panel/content-layout";
import PlaceholderContent from "@/components/dashboard/admin-panel/placeholder-content";
import FooterContainer from "@/components/dashboard/footer/FooterContainer";
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

const FooterPage = () => {
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
              <BreadcrumbPage>Footer</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <FooterContainer />
      </ContentLayout>
    </AdminPanelLayout>
  );
};

export default FooterPage;
