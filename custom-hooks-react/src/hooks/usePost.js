import { useEffect, useState } from "react";

export function usePost() {
  const [post, setPost] = useState({});
  async function getPosts() {
    const res = await fetch("https://jsonplaceholder.typicode.com/posts/1");

    const json = await res.json();
    setPost(json);
  }
  useEffect(() => {
    getPosts();
  }, []);

  return {
    title: post.title,
  };
}
