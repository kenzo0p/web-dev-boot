import { useRef } from "react";
import { Button } from "../components/Button";
import { Input } from "../components/CreateContentModal";
import { BACKEND_URL } from "../config";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const Signup = () => {
  const usernameRef = useRef<HTMLInputElement>();
  const passwordRef = useRef<HTMLInputElement>();
  const navigate = useNavigate();

  const signup = async () => {
    const username = usernameRef.current?.value;
    const password = passwordRef.current?.value;

    await axios.post(`${BACKEND_URL}/users/signup`, 
     { username, password }
    );
    navigate("/login")
    alert("Signup successfull");
    
  };

  return (
    <div className="h-screen w-screen bg-gray-200 flex justify-center items-center">
      <div className="bg-white rounded min-w-48 p-8 rounded">
        <Input ref={usernameRef} placeholder="Enter the Username" />
        <Input ref={passwordRef} placeholder="Enter the Password" />
        <div className="flex justify-center pt-4">
          <Button onClick={signup} text="Signup" variant="primary" />
        </div>
      </div>
    </div>
  );
};

