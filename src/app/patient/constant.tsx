import { SideNavItem } from "@/types/types";
import {
  IconDashboard,
  IconClipboardText,
  IconCalendarEvent,
  IconHelpCircle,
  IconCarCrash,
  IconBrain,
  IconHospital,
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
    title: "Hospitals",
    path: "/patient/hospitals",
    icon: <IconHospital width="24" height="24" />,
  },
  {
    title: "Claim Insurance",
    path: "/patient/claim-insurance",
    icon: <IconCarCrash width="24" height="24" />,
  },
  {
    title: "Dontate Organs",
    path: "/patient/donate-organs",
    icon: <IconBrain width="24" height="24" />,
  },
];
