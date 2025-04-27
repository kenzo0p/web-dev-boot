import { useEffect, useState } from "react";
import { BACKEND_URL } from "../config";
import axios from "axios";

export function useContent() {
  const [content, setContent] = useState([]);

  useEffect(() => {
    axios.get(`${BACKEND_URL}/content/` , {headers  : {"Authorization" : localStorage.getItem("token")}}).then((response) => {
      setContent(response.data.content);
    });
  }, []);

  return content;
}
