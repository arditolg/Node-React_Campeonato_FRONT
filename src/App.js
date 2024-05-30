// App.js
import React, { useState } from "react";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [page, setPage] = useState("");

  return (
    <div className="app">
      {!isLoggedIn ? (
        <Login setIsLoggedIn={setIsLoggedIn} />
      ) : (
        <Dashboard setPage={setPage} currentPage={page} />
      )}
    </div>
  );
};

export default App;
