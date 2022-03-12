// React Imports
import React, { Component } from "react";
import { Routes, Route } from "react-router-dom";
import { routes } from "./utils/Routes";

// Component Imports
import NavBar from "./components/UI/NavBar/NavBar";
import MainPage from "./containers/MainPage/MainPage";
import AboutPage from "./containers/AboutPage/AboutPage";

// CSS Imports
import "./App.scss";

class App extends Component {
  getRoutes = () => {
    return routes.map((route) => {
      let routeElement = route.address === "" ? (
        <MainPage />
      ) : (
        <AboutPage pageName={route.displayName} />
      );
      return (
        <Route path={"/" + route.address} key={route.address} element={routeElement} exact />
      )
    }
    );
  };

  render() {
    return (
      <div className="App">
        <NavBar routes={routes} />
        <div className="Background"></div>
        <Routes>{this.getRoutes()}</Routes>
      </div>
    );
  }
}

export default App;
