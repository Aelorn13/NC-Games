import "./App.css";
import Header from "./components/Header";
import ReviewList from "./components/ReviewList";
import ReviewElement from "./components/ReviewElement";
import NotFound from "./components/NotFound";
import Users from "./components/Users";
import { Route, Routes } from "react-router-dom";
function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<ReviewList />} />
        <Route path="/reviews/:review_id" element={<ReviewElement />} />
        <Route path="/users" element={<Users />} />
        <Route path="/category/:category" element={<ReviewList />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
