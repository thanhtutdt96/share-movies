import { HomeIcon, ListBulletIcon, ShareIcon } from "@heroicons/react/20/solid";

export const navbarItems = [
  {
    label: "Home",
    to: "/",
    icon: HomeIcon,
  },
  {
    label: "Share Movie",
    to: "/share-movie",
    icon: ShareIcon,
  },
  {
    label: "List Movie",
    to: "/list-movies",
    icon: ListBulletIcon,
  },
];
