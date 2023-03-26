import { ForwardRefExoticComponent, SVGProps } from "react";

export interface NavbarItem {
  label: string;
  to: string;
  icon: ForwardRefExoticComponent<SVGProps<SVGSVGElement>>;
}

export enum ApiTagType {
  AUTH = "auth",
  CORE = "core",
}

export enum ToastType {
  SUCCESS = "success",
  ERROR = "error",
}

export interface MovieItem {
  id: number;
  title: string;
  embedId: string;
  email: string;
  description?: string;
  userId: number;
}
