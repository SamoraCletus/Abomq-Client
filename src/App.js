import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import "semantic-ui-css/semantic.min.css";
import "./App.css";
import "./Main.css";

import Navbar from "./components/Navbar";
import Routing from "./components/Routing";

function App() {
  return (
    <Router>
      <Navbar />
      <Routing />
    </Router>
  );
}

export default App;
