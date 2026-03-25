import { FaRegCircleUser } from "react-icons/fa6";
import { LuMessageCircleQuestion } from "react-icons/lu";
import { FaBorderStyle } from "react-icons/fa";
import { MdDownload } from "react-icons/md";
import { FiTrendingUp } from "react-icons/fi";

export const loginMenuItems = [
  { label: "My Profile", icon: <FaRegCircleUser />, link: "/profile" },
  { label: "Orders", icon: <FaBorderStyle />, link: "/orders" },
  // { label: "Rewards", icon: <BrickWallShield />, link: "#" },
  // { label: "Gift Cards", icon: <MdCardGiftcard />, link: "#" },
];

export const moreMenuItems = [
  {
    label: "24x7 Customer Care",
    icon: <LuMessageCircleQuestion />,
    link: "/page/customer-care",
  },
  { label: "Advertise", icon: <FiTrendingUp />, link: "/page/advertisement" },
  { label: "Download App", icon: <MdDownload />, link: "#" },
];

export const mobileSidebarItems = [
  { label: "My Profile", icon: <FaRegCircleUser />, link: "/profile" },
  { label: "Orders", icon: <FaBorderStyle />, link: "/orders" },
  {
    label: "24x7 Customer Care",
    icon: <LuMessageCircleQuestion />,
    link: "/page/customer-care",
  },
  { label: "Advertise", icon: <FiTrendingUp />, link: "/page/advertisement" },
  { label: "Download App", icon: <MdDownload />, link: "#" },
];
