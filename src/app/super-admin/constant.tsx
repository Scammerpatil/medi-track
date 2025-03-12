import { SideNavItem } from "@/types/types";
import {
  IconDashboard,
  IconUserCheck,
  IconBuildingHospital,
  IconStethoscope,
} from "@tabler/icons-react";

export const SIDENAV_ITEMS: SideNavItem[] = [
  {
    title: "Dashboard",
    path: "/super-admin/dashboard",
    icon: <IconDashboard width="24" height="24" />,
  },
  {
    title: "Approve Hospital Admins",
    path: "/super-admin/approve-admins",
    icon: <IconUserCheck width="24" height="24" />,
  },
  {
    title: "Approve Hospitals",
    path: "/super-admin/approve-hospitals",
    icon: <IconBuildingHospital width="24" height="24" />,
  },
];
