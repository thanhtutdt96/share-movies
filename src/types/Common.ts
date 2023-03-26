import { ComponentType, ForwardRefExoticComponent, SVGProps } from "react";

export interface NavbarItem {
  label: string;
  to: string;
  icon: ForwardRefExoticComponent<SVGProps<SVGSVGElement>>;
}
