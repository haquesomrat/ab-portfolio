import AdminPanelLayout from "@/components/dashboard/admin-panel/admin-panel-layout";
import { ContentLayout } from "@/components/dashboard/admin-panel/content-layout";
import UpdateFeedbackContainer from "@/components/dashboard/feedback/update-feedback/UpdateFeedbackContainer";
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

const UpdateFeedbackPage = () => {
  return (
    <AdminPanelLayout>
      <ContentLayout title="Update Feedback">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="/">Home</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbLink asChild>
              <Link href="/">Dashboard</Link>
            </BreadcrumbLink>
            <BreadcrumbSeparator />
            <BreadcrumbLink asChild>
              <Link href="/dashboard/feedback">Feedback</Link>
            </BreadcrumbLink>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Update Feedback</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <UpdateFeedbackContainer />
      </ContentLayout>
    </AdminPanelLayout>
  );
};

export default UpdateFeedbackPage;
