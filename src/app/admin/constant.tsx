import { SideNavItem } from "@/types/types";
import {
  IconDashboard,
  IconStethoscope,
  IconUsers,
  IconClipboardList,
  IconHospital,
} from "@tabler/icons-react";

export const SIDENAV_ITEMS: SideNavItem[] = [
  {
    title: "Dashboard",
    path: "/admin/dashboard",
    icon: <IconDashboard width="24" height="24" />,
  },
  {
    title: "Hospital",
    path: "/admin/hospital",
    icon: <IconHospital width="24" height="24" />,
  },
  {
    title: "Manage Doctors",
    path: "/admin/manage-doctors",
    icon: <IconStethoscope width="24" height="24" />,
  },
  {
    title: "Claim Insurance Requests",
    path: "/admin/claim-insurance",
    icon: <IconClipboardList width="24" height="24" />,
  },
  {
    title: "Organ Donation Requests",
    path: "/admin/organ-donation",
    icon: <IconUsers width="24" height="24" />,
  },
];
