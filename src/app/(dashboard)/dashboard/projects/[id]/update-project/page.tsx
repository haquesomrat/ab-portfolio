import AdminPanelLayout from "@/components/dashboard/admin-panel/admin-panel-layout";
import { ContentLayout } from "@/components/dashboard/admin-panel/content-layout";
import CompaniesContainer from "@/components/dashboard/companies/add-company/CompaniesContainer";
import AddProjectsContainer from "@/components/dashboard/projects/add-project/AddProjectContainer";
import ProjectsContainer from "@/components/dashboard/projects/ProjectsContainer";
import UpdateProjectsContainer from "@/components/dashboard/projects/update-project/UpdateProjectContainer";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Link from "next/link";
import React from "react";

const UpdateProjectPage = () => {
  return (
    <AdminPanelLayout>
      <ContentLayout title="Update Project">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="/">Home</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="/dashboard">Dashboard</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="/dashboard/projects">Projects</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Update Project</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <UpdateProjectsContainer />
      </ContentLayout>
    </AdminPanelLayout>
  );
};

export default UpdateProjectPage;
