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
          active: pathname.includes("/ab-companies"),
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
          active: pathname.includes("/services"),
          icon: CloudCog,
          submenus: [
            {
              href: "/dashboard/services",
              label: "All Services",
              active: pathname === "/dashboard/services",
            },
            {
              href: "/dashboard/services/add-service",
              label: "Add New Services",
              active: pathname === "/dashboard/services/add-service",
            },
          ],
        },
        {
          href: "/dashboard/projects",
          label: "Projects",
          active: pathname.includes("/projects"),
          icon: FolderCode,
          submenus: [],
        },
        {
          href: "/dashboard/expertise",
          label: "My Expertise",
          active: pathname.includes("/expertise"),
          icon: SquareTerminal,
          submenus: [],
        },
        {
          href: "/dashboard/feedback",
          label: "Client Feedback",
          active: pathname.includes("/feedback"),
          icon: MessageCircleCode,
          submenus: [],
        },
        {
          href: "/dashboard/newsletter",
          label: "Newsletter",
          active: pathname.includes("/newsletter"),
          icon: Handshake,
          submenus: [],
        },
        {
          href: "/dashboard/footer",
          label: "Footer",
          active: pathname.includes("/footer"),
          icon: Anchor,
          submenus: [],
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
