import "./App.css";
import Header from "./components/Header";
import ReviewList from "./components/ReviewList";
import ReviewElement from "./components/ReviewElement";
import Users from "./components/Users";
import { Route, Routes } from "react-router-dom";
function App() {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<ReviewList />} />
        <Route path="/reviews/:review_id" element={<ReviewElement />} />
        <Route path="/users" element={<Users />} />
      </Routes>
    </div>
  );
}

export default App;
