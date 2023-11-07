import {
  IconBoxMultiple, IconCircleDot, IconHome, IconInfoCircle, IconLayout, IconLayoutGrid, IconPhoto, IconPoint, IconStar, IconTable, IconUser
} from "@tabler/icons-react";

import { uniqueId } from "lodash";

const Menuitems = [
  {
    id: uniqueId(),
    title: "Dashboard",
    icon: IconHome,
    href: "/",
  },
  {
    title: "Resume Anaylzer",
    icon: IconCircleDot,
    href: "/ui-components/ResumeAnalyzer",
  },
  {
    id: uniqueId(),
    title: "Job Recomendation",
    icon: IconTable,
    href: "/ui-components/Job_Recomendation",
  },
  {
    id: uniqueId(),
    title: "Sample",
    icon: IconInfoCircle,
    href: "/ui-components/Sample",
  },
  {
    id: uniqueId(),
    title: "Ratings",
    icon: IconStar,
    href: "/ui-components/wajahat",
  },
  {
    id: uniqueId(),
    title: "Images",
    icon: IconPhoto,
    href: "/ui-components/images",
  },
  {
    id: uniqueId(),
    title: "Pagination",
    icon: IconUser,
    href: "/ui-components/pagination",
  },
  {
    id: uniqueId(),
    title: "Tables",
    icon: IconLayoutGrid,
    href: "/ui-components/table",
  },
];

export default Menuitems;
