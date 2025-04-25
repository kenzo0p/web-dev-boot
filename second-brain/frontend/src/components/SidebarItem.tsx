import { ReactElement } from "react";

interface Props {
  icon: ReactElement;
  text: string;
}

export const SidebarItem = ({ icon, text }: Props) => {
  return (
    <div className="flex items-center gap-2 pl-4 text-gray-700">
      {icon} {text}
    </div>
  );
};
