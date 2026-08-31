import { Outlet } from "react-router-dom";
import "@/styles/main.scss";

function App() {
  return (
    <div className="app">
      <Outlet />
    </div>
  );
}

export default App;
