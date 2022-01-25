import logo from "./logo.svg";
import "./App.css";
import Home from "@/views/Home/home";
import Find from "@/views/Find/find";
import Search from "@/views/Search/search";
import React from "react";
import {
	BrowserRouter as Router,
	Routes,
	Route,
	Navigate,
} from "react-router-dom";
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
				</Route>
			</Routes>
		</Router>
	);
}

export default App;
