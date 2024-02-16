import { ReactNode } from 'react';

export type FunctionCallback = (...args: any[]) => any;

export const SizesArray = ['xs', 'sm', 'md', 'lg', 'xl'] as const;
export type Sizes = (typeof SizesArray)[number];

export const DirectionsArray = ['top', 'bottom', 'right', 'left'] as const;
export type Directions = (typeof DirectionsArray)[number];

export const VariantsArray = ['drawer', 'fluid', 'default'] as const;
export type Variants = (typeof VariantsArray)[number];

export const LayoutsArray = [
  'rounded',
  'default',
  'no-radius',
  'floating',
] as const;
export type Layouts = (typeof LayoutsArray)[number];

export const PositionArray = ['before', 'after'] as const;
export type Position = (typeof PositionArray)[number];

export interface IDropdownProps {
  children: ReactNode;
  autoClose?: boolean;
  open?: boolean;
  fullwidth?: boolean;
  position?: Directions;
  layout?: Layouts;
  size?: Sizes;
  variant?: Variants;
  disabled?: boolean;
  value?: string;
  placeholder?: string;
  defaultValue?: string;
  menuClass?: string;
  menuStyle?: object;
  dropdownButtonStyle?: object;
  dropdownButtonClassName?: string;
}

export interface IMenuItemProps {
  onSelect?: FunctionCallback;
  closeHandler?: FunctionCallback;
  autoClose?: boolean;
  active?: boolean;
  children: ReactNode;
}

export interface IDropdownMenu {
  children: ReactNode;
  position?: Position;
  autoClose?: boolean;
  closeHandler?: FunctionCallback;
}
