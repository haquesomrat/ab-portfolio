import {
  Tag,
  Users,
  Settings,
  Bookmark,
  SquarePen,
  LayoutGrid,
  LucideIcon,
  Building2,
  UserPen,
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
        // {
        //   href: "",
        //   label: "Posts",
        //   active: pathname.includes("/posts"),
        //   icon: SquarePen,
        //   submenus: [
        //     {
        //       href: "/posts",
        //       label: "All Posts",
        //       active: pathname === "/posts",
        //     },
        //     {
        //       href: "/posts/new",
        //       label: "New Post",
        //       active: pathname === "/posts/new",
        //     },
        //   ],
        // },
        // {
        //   href: "/categories",
        //   label: "Categories",
        //   active: pathname.includes("/categories"),
        //   icon: Bookmark,
        //   submenus: [],
        // },
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
          icon: Building2,
          submenus: [],
        },
        {
          href: "/dashboard/projects",
          label: "Projects",
          active: pathname.includes("/projects"),
          icon: Building2,
          submenus: [],
        },
        {
          href: "/dashboard/expertise",
          label: "My Expertise",
          active: pathname.includes("/expertise"),
          icon: Building2,
          submenus: [],
        },
        {
          href: "/dashboard/feedback",
          label: "Client Feedback",
          active: pathname.includes("/feedback"),
          icon: Building2,
          submenus: [],
        },
        {
          href: "/dashboard/newsletter",
          label: "Newsletter",
          active: pathname.includes("/newsletter"),
          icon: Building2,
          submenus: [],
        },
        {
          href: "/dashboard/footer",
          label: "Footer",
          active: pathname.includes("/footer"),
          icon: Building2,
          submenus: [],
        },
        // {
        //   href: "/tags",
        //   label: "Tags",
        //   active: pathname.includes("/tags"),
        //   icon: Tag,
        //   submenus: [],
        // },
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
          href: "/account",
          label: "Account",
          active: pathname.includes("/account"),
          icon: Settings,
          submenus: [],
        },
      ],
    },
  ];
}
