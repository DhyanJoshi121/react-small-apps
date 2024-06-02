import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./screens/HomeScreen";
import WatchListScreen from "./screens/WatchListScreen";
import AboutScreen from "./screens/AboutScreen";
import Navbar from "./components/Navbar";

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/watchList" element={<WatchListScreen />} />
          <Route path="/about" element={<AboutScreen />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
