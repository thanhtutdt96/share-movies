import { HomeIcon, ShareIcon } from "@heroicons/react/20/solid";

export const API_PATH = import.meta.env.VITE_API_PATH;
export const YOUTUBE_API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY;
export const YOUTUBE_API_PATH = "https://www.googleapis.com/youtube/v3";

export const VALIDATE_EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export const VALIDATE_YOUTUBE_URL_REGEX = /(?:\/|%3D|v=)([0-9A-Za-z_-]{11}).*/;
export const navbarItems = [
  {
    label: "Home",
    to: "/",
    icon: HomeIcon,
  },
  {
    label: "Share Movie",
    to: "/share",
    icon: ShareIcon,
  },
];
