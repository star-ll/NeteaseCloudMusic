import logo from "./logo.svg";
import "./App.css";
import Home from "@/views/TabBar/Index/index";
import Find from "@/views/TabBar/Find/find";
import Search from "@/views/TabBar/Search/search";
import TopList from "@/views/TabBar/TopList/topList";
import React from "react";
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
				<Route
					path="/"
					element={<Navigate to="/find"></Navigate>}
				></Route>
				<Route path="/" element={<Home></Home>}>
					<Route path="find" element={<Find></Find>}></Route>
					<Route path="search" element={<Search></Search>}></Route>
					<Route path="toplist" element={<TopList></TopList>}></Route>
				</Route>
				<Route
					path="/playlist/:id"
					element={<PlayList></PlayList>}
				></Route>
				<Route
					path="/artists/:id"
					element={<PlayList></PlayList>}
				></Route>
			</Routes>
		</Router>
	);
}

export default App;
