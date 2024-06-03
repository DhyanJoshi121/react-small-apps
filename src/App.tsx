import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./screens/HomeScreen";
import WatchListScreen from "./screens/WatchListScreen";
import Navbar from "./components/Navbar";
import PlannerScreen from "./screens/PlannerScreen";

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/watchList" element={<WatchListScreen />} />
          <Route path="/planner" element={<PlannerScreen />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
