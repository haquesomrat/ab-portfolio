import {
  Users,
  Settings,
  LayoutGrid,
  LucideIcon,
  Building2,
  UserPen,
  Handshake,
  MessageCircleCode,
  CloudCog,
  FolderCode,
  Anchor,
  SquareTerminal,
} from "lucide-react";

type Submenu = {
  href: string;
  label: string;
  active: boolean;
};

type Menu = {
  href: string;
  label: string;
  active: boolean;
  icon: LucideIcon;
  submenus: Submenu[];
};

type Group = {
  groupLabel: string;
  menus: Menu[];
};

export function getMenuList(pathname: string): Group[] {
  return [
    {
      groupLabel: "",
      menus: [
        {
          href: "/dashboard",
          label: "Dashboard",
          active: pathname === "/dashboard",
          icon: LayoutGrid,
          submenus: [],
        },
      ],
    },
    {
      groupLabel: "Contents",
      menus: [
        {
          href: "/dashboard/hero",
          label: "Hero",
          active: pathname.includes("/hero"),
          icon: UserPen,
          submenus: [],
        },
        {
          href: "",
          label: "Companies",
          active: pathname === "/companies",
          icon: Building2,
          submenus: [
            {
              href: "/dashboard/companies",
              label: "All Companies",
              active: pathname === "/dashboard/companies",
            },
            {
              href: "/dashboard/companies/add-company",
              label: "Add New Company",
              active: pathname === "/dashboard/companies/add-company",
            },
          ],
        },
        {
          href: "/dashboard/services",
          label: "Services",
          active: pathname === "/services",
          icon: CloudCog,
          submenus: [
            {
              href: "/dashboard/services",
              label: "All Services",
              active: pathname === "/dashboard/services",
            },
            {
              href: "/dashboard/services/add-service",
              label: "Add Service",
              active: pathname === "/dashboard/services/add-service",
            },
          ],
        },
        {
          href: "/dashboard/projects",
          label: "Projects",
          active: pathname === "/projects",
          icon: FolderCode,
          submenus: [
            {
              href: "/dashboard/projects",
              label: "All Projects",
              active: pathname === "/dashboard/projects",
            },
            {
              href: "/dashboard/services/add-project",
              label: "Add Project",
              active: pathname === "/dashboard/projects/add-project",
            },
          ],
        },
        {
          href: "/dashboard/expertise",
          label: "My Expertise",
          active: pathname === "/expertise",
          icon: SquareTerminal,
          submenus: [
            {
              href: "/dashboard/expertise",
              label: "Expertises",
              active: pathname === "/dashboard/expertise",
            },
            {
              href: "/dashboard/services/add-expertise",
              label: "Add Expertise",
              active: pathname === "/dashboard/expertise/add-expertise",
            },
          ],
        },
        {
          href: "/dashboard/feedback",
          label: "Client Feedback",
          active: pathname === "/feedback",
          icon: MessageCircleCode,
          submenus: [
            {
              href: "/dashboard/feedback",
              label: "Feedback",
              active: pathname === "/dashboard/feedback",
            },
            {
              href: "/dashboard/services/add-feedback",
              label: "Add Feedback",
              active: pathname === "/dashboard/feedback/add-feedback",
            },
          ],
        },
        {
          href: "/dashboard/newsletter",
          label: "Newsletter",
          active: pathname === "/newsletter",
          icon: Handshake,
          submenus: [
            {
              href: "/dashboard/newsletter",
              label: "Newsletter",
              active: pathname === "/dashboard/newsletter",
            },
            {
              href: "/dashboard/services/add-newsletter",
              label: "Add Newsletter",
              active: pathname === "/dashboard/newsletter/add-newsletter",
            },
          ],
        },
        {
          href: "/dashboard/footer",
          label: "Footer",
          active: pathname === "/footer",
          icon: Anchor,
          submenus: [
            {
              href: "/dashboard/footer",
              label: "Footer",
              active: pathname === "/dashboard/footer",
            },
            {
              href: "/dashboard/services/add-footer",
              label: "Add Footer",
              active: pathname === "/dashboard/footer/add-footer",
            },
          ],
        },
      ],
    },
    {
      groupLabel: "Settings",
      menus: [
        {
          href: "/dashboard/users",
          label: "Users",
          active: pathname.includes("/users"),
          icon: Users,
          submenus: [],
        },
        {
          href: "/dashboard/account",
          label: "Account",
          active: pathname.includes("/dashboard/account"),
          icon: Settings,
          submenus: [],
        },
      ],
    },
  ];
}
