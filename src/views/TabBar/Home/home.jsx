import { useRef, useState } from "react";
import classNames from "./home.module.css";
import { PlayWindow } from "@/components/PlayWindow/playWindow";
import { Link, Outlet } from "react-router-dom";
import moreUrl from "@/assets/更多.svg";
import noLoginUrl from "@/assets/未登录.svg";
import React from "react";

export default function Home() {
	if (import.meta.hot) {
		console.log(import.meta.hot);
		console.log(import.meta.hot);
	}

	let [navIndex, setNavIndex] = useState(0);

	return (
		<div>
			<header className={classNames.homeHeader}>
				<ul className={classNames.headerUl}>
					<li className={classNames.moreIcon}>
						<img src={moreUrl} />
					</li>
					<li>
						<h2 className={classNames.logoName}>余烬的音乐乡</h2>
					</li>
					<li className={classNames.loginIcon}>
						<img src={noLoginUrl} />
					</li>
				</ul>

				<nav className={classNames.homeNav}>
					<ul className={classNames.nav}>
						<li
							className={[
								navIndex === 0
									? classNames.navButtonSelected
									: classNames.navButton,
							]}
							onClick={() => {
								setNavIndex(0);
							}}
						>
							<Link to="/find"> 发现</Link>
						</li>
						<li
							className={[
								navIndex === 1
									? classNames.navButtonSelected
									: classNames.navButton,
							]}
							onClick={() => {
								setNavIndex(1);
							}}
						>
							<Link to="/"> 排行</Link>
						</li>
						<li
							className={[
								navIndex === 2
									? classNames.navButtonSelected
									: classNames.navButton,
							]}
							onClick={() => {
								setNavIndex(2);
							}}
						>
							<Link to="/search"> 搜索</Link>
						</li>
					</ul>
				</nav>
			</header>
			<Outlet></Outlet>
			<PlayWindow></PlayWindow>
			<footer>
				<section className={classNames.footStatement}>
					本站仅作为学习之用，不可用于商业或其他用途
				</section>
			</footer>
			<div style={{ height: "60px" }}></div>
		</div>
	);
}
