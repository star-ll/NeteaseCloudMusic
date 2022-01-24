import { useState, useEffect } from "react";
import "./home.css";
// import {Modal } from "antd-mobile"
import {
	findRecommendSongSheet,
	findNewSong,
} from "../../api/homepage/findNewSong";

const clientWidth = document.documentElement.clientWidth;

export default function Home() {
	let navClassName = "nav ul";
	let [navIndex, setNavIndex] = useState(0);
	let [recommendSongSheet, setRecommendSongSheet] = useState([]);
	let [recommendNewSong, setRecommendNewSong] = useState([]);

	// loginByPhone("/api/login/cellphone", {
	// 	phone: "13620848124",
	// 	password: "yujin8088",
	// }).then((res) => {
	// 	console.log(res);
	// });
	useEffect(() => {
		findRecommendSongSheet({ limit: 6 })
			.then((res) => {
				// console.log(res.result);
				setRecommendSongSheet(res.result || []);
			})
			.catch((err) => {
				console.error(err);
			});
		findNewSong().then((res) => {
			console.log(res);
			setRecommendNewSong(res.result || []);
		});
	}, []);

	return (
		<div>
			<header className="homeHeader">
				<h2 className="logoName">余烬的音乐乡</h2>
				<nav className="homeNav">
					<ul className={navClassName}>
						<li
							className={[
								navIndex === 0
									? "navButtonSelected"
									: "navButton",
							]}
							onClick={() => {
								setNavIndex(0);
							}}
						>
							发现
						</li>
						<li
							className={[
								navIndex === 1
									? "navButtonSelected"
									: "navButton",
							]}
							onClick={() => {
								setNavIndex(1);
							}}
						>
							排行
						</li>
						<li
							className={[
								navIndex === 2
									? "navButtonSelected"
									: "navButton",
							]}
							onClick={() => {
								setNavIndex(2);
							}}
						>
							搜索
						</li>
					</ul>
				</nav>{" "}
			</header>

			<main>
				<div>
					<h3> 推荐歌单 </h3>
					<ul className="recommendSongSheet">
						{recommendSongSheet.map((item) => (
							<li
								className="recommendSongSheetItem"
								key={item.id}
							>
								<img
									className="recommendSongSheetImg"
									src={
										item.picUrl +
										`?param=${clientWidth / 3 - 10}y${
											clientWidth / 3 - 10
										}`
									}
								></img>
								<h4 className="recommendSongName">
									{item.name}
								</h4>
							</li>
						))}
					</ul>
				</div>
				<div>
					<h3>新歌速听</h3>
					<div className="miScroll">
						<ul className="recommendSongList">
							{recommendNewSong.map((item) => (
								<li
									className="recommendSongListItem recommendSongSheetItem"
									key={item.id}
								>
									<img
										className="recommendSongSheetImg"
										src={
											item.picUrl +
											`?param=${clientWidth / 3 - 10}y${
												clientWidth / 3 - 10
											}`
										}
									></img>
									<h4 className="recommendSongName">
										{item.name}
									</h4>
								</li>
							))}
						</ul>
					</div>
				</div>
			</main>
		</div>
	);
}
