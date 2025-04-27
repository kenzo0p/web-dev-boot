import { Button } from "../components/Button";
import { Card } from "../components/Card";
import { CreateContentModal } from "../components/CreateContentModal";
import Sidebar from "../components/Sidebar";
import { useContent } from "../hooks/use-content";
import { PlusIcon } from "../icons/PlusIcon";
import { ShareIcon } from "../icons/ShareIcon";
import { useState } from "react";
export const DashBoard = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const contents = useContent();

  return (
    <div>
      <Sidebar />
      <div className="p-4 ml-72 bg-gray-50 min-h-screen">
        <CreateContentModal
          open={modalOpen}
          onClose={() => {
            setModalOpen(false);
          }}
        />

        <div className="flex justify-end gap-4">
          <Button
            onClick={() => setModalOpen(true)}
            variant={"primary"}
            text="add"
            startIcon={<PlusIcon />}
          />
          <Button variant={"secondary"} text="add" startIcon={<ShareIcon />} />
        </div>
        <div className="flex hap-4">
          {contents.map(({ type, title, link }) => (
            <Card
              type={type}
              link={link}
              title={title}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
