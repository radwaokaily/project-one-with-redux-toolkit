import React from "react";
import Header from "./shared/header/Header";
import Footer from "./shared/footer/Footer";
import PostsList from "./features/posts/PostsList";
import PostDetails from "./features/PostDetails"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <div className="App">
       <Header />
       <Footer />
       <Router>
      <Routes>
        <Route path="/" element={<PostsList />} />
        <Route path="/post/:id" element={<PostDetails />} /> {/* Post Details Route */}
      </Routes>
    </Router>
    </div>
  );
}

export default App;
