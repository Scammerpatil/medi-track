import { SideNavItem } from "@/types/types";
import {
  IconDashboard,
  IconClipboardText,
  IconCalendarEvent,
  IconUserCheck,
  IconStethoscope,
  IconPill,
  IconSettings,
  IconHelpCircle,
} from "@tabler/icons-react";

export const SIDENAV_ITEMS: SideNavItem[] = [
  {
    title: "Dashboard",
    path: "/patient/dashboard",
    icon: <IconDashboard width="24" height="24" />,
  },
  {
    title: "My Medical Records",
    path: "/patient/medical-records",
    icon: <IconClipboardText width="24" height="24" />,
  },
  {
    title: "Appointments",
    path: "/patient/appointments",
    icon: <IconCalendarEvent width="24" height="24" />,
  },
  {
    title: "Doctors",
    path: "/patient/doctors",
    icon: <IconStethoscope width="24" height="24" />,
  },
  {
    title: "Prescriptions",
    path: "/patient/prescriptions",
    icon: <IconPill width="24" height="24" />,
  },
  {
    title: "Request Access",
    path: "/patient/request-access",
    icon: <IconUserCheck width="24" height="24" />,
  },
  {
    title: "Settings",
    path: "/patient/settings",
    icon: <IconSettings width="24" height="24" />,
  },
  {
    title: "Support",
    path: "/patient/support",
    icon: <IconHelpCircle width="24" height="24" />,
  },
];
