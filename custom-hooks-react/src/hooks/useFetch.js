//will take an url as an input and return data that backend will give you

import { useEffect, useState } from "react";

export function useFetch(url) {
  const [finalData, setFinalData] = useState({});
  const [loading , setLoading] = useState(true);
  //console.log(url);
  async function getDetails() {
    const res = await fetch(url);
    const data = await res.json();
    setFinalData(data);
    setLoading(false);
  }
  useEffect(() => {
    getDetails();
  }, [url]);

  return {
    finalData,
    loading
  };
}
