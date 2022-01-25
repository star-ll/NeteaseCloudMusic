import { useState } from "react";
import classNames from "./home.module.css";
import { PlayWindow } from "../../components/playWindow/playWindow";
import { Link, Outlet } from "react-router-dom";
export default function Home() {
	let [navIndex, setNavIndex] = useState(0);
	return (
		<div>
			<header className={classNames.homeHeader}>
				<h2 className={classNames.logoName}>余烬的音乐乡</h2>
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
