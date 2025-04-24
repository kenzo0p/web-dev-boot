import "./App.css";
import { Button } from "./components/Button";
import { PlusIcon } from "./icons/PlusIcon";

function App() {
  return (
    <div>
      <div>
        <Button size="sm" variant="primary" text="Share Link" startIcon={<PlusIcon size="lg"/>} />
        <Button size="md" variant="secondary" text="Share Link" />
        <Button size="lg" variant="primary" text="Share Link"/>
      </div>
    </div>
  );
}

export default App;
