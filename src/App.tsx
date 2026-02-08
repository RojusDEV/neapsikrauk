import { Outlet } from "react-router";
import "@/styles/main.scss";
// import { Map, MapControls } from "@/components/ui/map";

function App() {
  return (
    <div className="app">
      <Outlet />
    </div>
  );
}

export default App;
