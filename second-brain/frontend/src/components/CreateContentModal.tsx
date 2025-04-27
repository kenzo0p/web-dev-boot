import { useRef, useState } from "react";
import { CrosIcon } from "../icons/CrossIcon";
import { Button } from "./Button";
import axios from "axios";
import { BACKEND_URL } from "../config";

//controlled component

enum contentType {
  Youtube = "youtube",
  Twiiter = "twiiter",
}
export const CreateContentModal = ({ open, onClose }) => {
  const titleRef = useRef<HTMLInputElement>();
  const linkRef = useRef<HTMLInputElement>();
  const [type, setType] = useState(contentType.Youtube);

  async function addContent() {
    const title = titleRef.current?.value;
    const link = linkRef.current?.value;
    await axios.post(
      `${BACKEND_URL}/content/`,
      { link, type, title },
      {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      }
    );
    alert("content added");
  }
  return (
    <div>
      {open && (
        <div className="w-screen h-screen  fixed bg-slate-200 top-0 left-0 opacity-60 flex justify-center items-center">
          <div className="flex flex-col justify-center rounded-md bg-white">
            <span className="bg-whte opacity-100 p-4 rounded">
              <div className="flex justify-end">
                <div onClick={onClose} className="cursor-pointer">
                  <CrosIcon />
                </div>
              </div>
              <div>
                <Input ref={titleRef} placeholder="Add somthing" />
                <Input ref={linkRef} placeholder="Add somthing" />
                <div className="flex items-center justify-center p-2 gap-2">
                  <Button
                    text="Youtube"
                    variant={
                      type === contentType.Youtube ? "primary" : "secondary"
                    }
                    onClick={() => setType(contentType.Youtube)}
                  />
                  <Button
                    text="Twiiter"
                    variant={
                      type === contentType.Youtube ? "secondary" : "primary"
                    }
                    onClick={() => setType(contentType.Twiiter)}
                  />
                </div>
              </div>
              <div className="flex justify-center">
                <Button onClick={addContent} variant="primary" text="Submit" />
              </div>
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export function Input({
  onChange,
  placeholder,
  ref,
}: {
  placeholder: string;
  onChange: () => void;
  ref?: any;
}) {
  return (
    <div>
      <input
        ref={ref}
        placeholder={placeholder}
        type="text"
        className="px-4 py-2 border border-amber-200 rounded m-2"
        onChange={onChange}
      />
    </div>
  );
}
