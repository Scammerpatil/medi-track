import { SideNavItem } from "@/types/types";
import {
  IconDashboard,
  IconClipboardText,
  IconUsers,
  IconCalendarEvent,
  IconPill,
  IconUserCheck,
  IconSettings,
  IconHelpCircle,
} from "@tabler/icons-react";

export const SIDENAV_ITEMS: SideNavItem[] = [
  {
    title: "Dashboard",
    path: "/doctor/dashboard",
    icon: <IconDashboard width="24" height="24" />,
  },
  {
    title: "Find Patients",
    path: "/doctor/patients",
    icon: <IconUsers width="24" height="24" />,
  },
  {
    title: "Appointments",
    path: "/doctor/appointments",
    icon: <IconCalendarEvent width="24" height="24" />,
  },
];
