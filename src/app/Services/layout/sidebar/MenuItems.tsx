import {
  IconBoxMultiple, IconCircleDot, IconHome, IconInfoCircle, IconLayout, IconLayoutGrid, IconPhoto, IconPoint, IconStar, IconTable, IconUser, IconTextScan2, IconUserScan, IconUserExclamation, IconProgressCheck, IconUsersPlus, IconReport, IconCloudSearch
} from "@tabler/icons-react";

import { uniqueId } from "lodash";

const Menuitems = [
  {
    navlabel: true,
    subheader: "HOME",
  },
  {
    id: uniqueId(),
    title: "Dashboard",
    icon: IconHome,
    href: "/Services",
  },
  {
    navlabel: true,
    subheader: "USER PORTAL",
  },
  {
    title: "Resume Anaylzer",
    icon: IconTextScan2,
    href: "/Services/user/ResumeAnalyzer",
  },
  {
    id: uniqueId(),
    title: "Job Recomendation",
    icon: IconCloudSearch,
    href: "/Services/user/Job_Recomendation",
  },


  {
    id: uniqueId(),
    title: "Sample",
    icon: IconInfoCircle,
    href: "/Services/user/Sample",
  },
  {
    id: uniqueId(),
    title: "Job Portal",
    icon: IconInfoCircle,
    href: "/Services/user/Job_Portal",
  },
  {
    navlabel: true,
    subheader: "HR PORTAL",
  },
  {
    id: uniqueId(),
    title: "Dashboard",
    icon: IconHome,
    href: "/Services/recruiter/dashboard",
  },
  {
    id: uniqueId(),
    title: "Employee Attrition",
    icon: IconUserExclamation,
    href: "/Services/recruiter/attrition",
  },
  {
    id: uniqueId(),
    title: "Start Application",
    icon: IconUserScan,
    href: "/Services/recruiter/application",
  },
  {
    id: uniqueId(),
    title: "Ongoing Hirring",
    icon: IconProgressCheck,
    href: "/Services/recruiter/hirring",
  },
  {
    id: uniqueId(),
    title: "AI Interview",
    icon: IconUsersPlus,
    href: "/Services/recruiter/ai_interview",
  },
  {
    id: uniqueId(),
    title: "Candidate Selection",
    icon: IconReport,
    href: "/Services/recruiter/selection",
  },
];

export default Menuitems;
