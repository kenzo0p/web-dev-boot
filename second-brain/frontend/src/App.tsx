import { useState } from "react";
import { Button } from "./components/Button";
import { Card } from "./components/Card";
import { CreateContentModal } from "./components/CreateContentModal";
import { PlusIcon } from "./icons/PlusIcon";
import { ShareIcon } from "./icons/ShareIcon";
import Sidebar from "./components/Sidebar";

function App() {
  const [modalOpen, setModalOpen] = useState(false);
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
          <Card
            type="Youtube"
            link="https://www.youtube.com/embed/rig373ft2ko?si=dwRab2W7cfGsnEaQ"
            title="Harkirat"
          />
        </div>
      </div>
    </div>
  );
}

export default App;
