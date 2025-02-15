import { SideNavItem } from "@/types/types";
import {
  IconDashboard,
  IconUserPlus,
  IconStethoscope,
  IconUsers,
  IconClipboardList,
  IconCalendarEvent,
  IconSettings,
  IconHelpCircle,
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
    title: "Manage Patients",
    path: "/admin/manage-patients",
    icon: <IconUsers width="24" height="24" />,
  },
  {
    title: "Appointments",
    path: "/admin/appointments",
    icon: <IconCalendarEvent width="24" height="24" />,
  },
  {
    title: "Medical Records",
    path: "/admin/medical-records",
    icon: <IconClipboardList width="24" height="24" />,
  },
  {
    title: "Add New Staff",
    path: "/admin/add-staff",
    icon: <IconUserPlus width="24" height="24" />,
  },
  {
    title: "Settings",
    path: "/admin/settings",
    icon: <IconSettings width="24" height="24" />,
  },
  {
    title: "Support",
    path: "/admin/support",
    icon: <IconHelpCircle width="24" height="24" />,
  },
];
