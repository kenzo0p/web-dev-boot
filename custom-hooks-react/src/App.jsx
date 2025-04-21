import { useEffect, useState } from "react";
import "./App.css";
import { useFetch } from "./hooks/useFetch";
import { usePrev } from "./hooks/usePrev";
import { useDebounce } from "./hooks/useDebounce";

//custom hook
// function useCounter() {
//   const [count, setCount] = useState(0);
//   function increaseCount() {
//     setCount((ct) => ct + 1);
//   }

//   return {
//     count: count,
//     increaseCount,
//   };
// }

function App() {
  const [count, setCount] = useState(0);
  const [currPost, setCurrPost] = useState(1);
  const { finalData, loading } = useFetch(
    `https://jsonplaceholder.typicode.com/posts/${currPost}`
  );
  const prev = usePrev(count);

  function sendDataToBackend(){
    fetch("api.amazon/com.search");
  }
  const debouncedFn = useDebounce(sendDataToBackend)

  // if(loading){
  //   return <div>Loading..........</div>
  // }
  return (
    <>
      {loading ? "Loading........." : finalData.title}
      <button onClick={() => setCurrPost((c) => c + 1)}>
        Change the post {currPost}
      </button>

      {/* use prev */}
      <button onClick={() => setCount((c) => c + 1)}>{count}</button>
      <p>The prev value is {prev}</p>

      {/* useDebounce */}
      <input type="text" onChange={debouncedFn} />
    </>
  );
}

// function Counter() {
//   let { count, increaseCount } = useCounter();
//   return (
//     <>
//       <div>{count}</div>
//       <button onClick={increaseCount}>Increase</button>
//     </>
//   );
// }

export default App;
