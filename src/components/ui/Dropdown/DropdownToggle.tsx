import { FunctionCallback } from './Dropdown.type';
export const DropdownToggle = ({
  children,
  onClick,
}: {
  children: React.ReactNode;
  onClick?: FunctionCallback;
}) => {
  return <div onClick={onClick}>{children}</div>;
};
DropdownToggle.displayName = 'DropdownToggle';
export default DropdownToggle;
