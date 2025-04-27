import { useRef } from "react";
import { Button } from "../components/Button";
import { Input } from "../components/CreateContentModal";
import { BACKEND_URL } from "../config";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const Login = () => {
  const usernameRef = useRef<HTMLInputElement>();
  const passwordRef = useRef<HTMLInputElement>();
  const navigate = useNavigate();
  
  const signin = async () => {
    const username = usernameRef.current?.value;
    const password = passwordRef.current?.value;

    const response = await axios.post(`${BACKEND_URL}/users/signin`, 
     { username, password }
    );
    const jwt = response.data.token;
    localStorage.setItem("token" , jwt);
    navigate("/dashboard");
    alert("Login successfull");
    
  };

  return (
    <div className="h-screen w-screen bg-gray-200 flex justify-center items-center">
      <div className="bg-white rounded min-w-48 p-8 rounded">
        <Input ref={usernameRef} placeholder="Enter the Username" />
        <Input ref={passwordRef} placeholder="Enter the Password" />
        <div className="flex justify-center pt-4">
          <Button onClick={signin} text="Login" variant="primary" />
        </div>
      </div>
    </div>
  );
};

