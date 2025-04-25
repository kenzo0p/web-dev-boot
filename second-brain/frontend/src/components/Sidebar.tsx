import { Logo } from "../icons/Logo";
import { TwitterIcon } from "../icons/TwitterIcons";
import { YoutubeIcon } from "../icons/YoutubeIcon";
import { SidebarItem } from "./SidebarItem";

const Sidebar = () => {
  return (
    <div className="h-screen bg-white border-r w-72 fixed top-0 left-0 pl-4">
      <div className="flex items-center gap-2 pt-3">
        <Logo /> <h1 className="text-2xl">Brainly</h1>
      </div>
      <div className="space-y-5 pt-4 pl-4">
        <SidebarItem text="Twitter" icon={<TwitterIcon />} />
        <SidebarItem text="Youtube" icon={<YoutubeIcon />} />
      </div>
    </div>
  );
};

export default Sidebar;
