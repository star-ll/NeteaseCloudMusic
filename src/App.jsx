import React, { Suspense, lazy } from "react";
import { Outlet } from "react-router-dom";
import logo from "./logo.svg";

import "./App.css";
import "animate.css/animate.min.css";
import "remixicon/fonts/remixicon.css";

import Home from "@/views/TabBar/Index/index";
import Find from "@/views/TabBar/Find/find";
import Search from "@/views/TabBar/Search/search";
import TopList from "@/views/TabBar/TopList/topList";
import PlayDetail from "@/views/PlayDetail/playDetail";
// import { Login } from "./views/user/login/login";

function EmptyComponent() {
  return (
    <>
      <Outlet />
    </>
  );
}
const Login = lazy(() => import("./views/user/login/login"));

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { PlayList } from "./views/PlayList/playList";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/find"></Navigate>}></Route>
        <Route path="/" element={<Home></Home>}>
          <Route path="find" element={<Find></Find>}></Route>
          <Route path="search" element={<Search></Search>}></Route>
          <Route path="toplist" element={<TopList></TopList>}></Route>
        </Route>
        <Route path="/playlist/:id" element={<PlayList></PlayList>}></Route>
        <Route path="/artists/:id" element={<PlayList></PlayList>}></Route>
        <Route path="/playDetail/:id" element={<PlayDetail />}></Route>
        <Route path="/user" element={<EmptyComponent />}>
          <Route
            path="login"
            element={
              <Suspense fallback={<div>loading...</div>}>
                <Login />
              </Suspense>
            }
          ></Route>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
