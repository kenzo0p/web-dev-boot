import { createContext, useContext, useState } from "react";
import "./App.css";

const BulbContext = createContext();

function BulbProvider({ children }) {
  const [bulbOn, setBulbOn] = useState(true);
  return (
    <BulbContext.Provider value={{ bulbOn: bulbOn, setBulbOn: setBulbOn }}>
      {children}
    </BulbContext.Provider>
  );
}

function App() {
  return (
    <>
      <BulbProvider>
        <LightBulb />
      </BulbProvider>
    </>
  );
}

function LightBulb() {
  return (
    <div>
      <BulbState />
      <ToggleBulbState />
    </div>
  );
}

function BulbState() {
  const { bulbOn } = useContext(BulbContext);
  return <div>{bulbOn ? "Bulb on" : "Bulb off"}</div>;
}
function ToggleBulbState() {
  const { setBulbOn } = useContext(BulbContext);
  function on() {
    setBulbOn((curState) => !curState);
  }
  return (
    <div>
      <button onClick={on}>Toggle bulb state</button>
    </div>
  );
}

export default App;
