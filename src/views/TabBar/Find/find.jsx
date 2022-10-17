import { useState, useEffect } from "react";
import classNames from "./find.module.css";
import {
	findRecommendSongSheet,
	findNewSong,
	findTopPlayList,
} from "../../../api/homepage/findNewSong";
import { utils } from "../../../utils";
import { Link } from "react-router-dom";

const clientWidth = utils.getClientWidth();

export default function Find() {
	let [recommendSongSheet, setRecommendSongSheet] = useState([]);
	let [recommendNewSong, setRecommendNewSong] = useState([]);
	let [recommendTopPlayList, setRecommendTopPlayList] = useState([]);

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
			setRecommendNewSong(res.result || []);
		});
		findTopPlayList({ limit: 9 }).then((res) => {
			setRecommendTopPlayList(res.playlists);
			console.log(res);
		});
	}, []);

	return (
		<div>
			<main>
				<div>
					<h3 className="text-lg py-2"> 推荐歌单 </h3>
					<ul className={classNames.recommendSongSheet}>
						{recommendSongSheet.map((item) => (
							<li
								className={classNames.recommendSongSheetItem}
								key={item.id}
							>
								<Link to={"/playlist/" + item.id}>
									<img
										className={
											classNames.recommendSongSheetImg
										}
										src={
											item.picUrl +
											`?param=${parseInt(
												clientWidth / 3 - 10
											)}y${parseInt(
												clientWidth / 3 - 10
											)}`
										}
									></img>
									<h4
										className={classNames.recommendSongName}
									>
										{item.name}
									</h4>
								</Link>
							</li>
						))}
					</ul>
				</div>
				<div>
					<h3 className="text-lg py-2">新歌速听</h3>
					<div className={classNames.miScroll}>
						<ul className={classNames.recommendSongList + " flex"}>
							{recommendNewSong.map((item) => (
								<li className="w-32 m-1" key={item.id}>
									<img
										className="max-w-lg"
										src={
											item.picUrl +
											`?param=${parseInt(
												clientWidth / 3 - 10
											)}y${parseInt(
												clientWidth / 3 - 10
											)}`
										}
									></img>
									<p
										className={
											"overflow-ellipsis whitespace-nowrap w-full overflow-x-hidden"
										}
									>
										{item.name}
									</p>
								</li>
							))}
						</ul>
					</div>
				</div>
				<div>
					<h3 className="text-lg py-2"> 网友精选碟 </h3>
					<ul className={classNames.recommendSongSheet}>
						{recommendTopPlayList.map((item) => (
							<li
								className={classNames.recommendSongSheetItem}
								key={item.id}
							>
								<Link to={"/playlist/" + item.id}>
									<img
										className={
											classNames.recommendSongSheetImg
										}
										src={
											item.coverImgUrl +
											`?param=${parseInt(
												clientWidth / 3 - 10
											)}y${parseInt(
												clientWidth / 3 - 10
											)}`
										}
									></img>
									<h4
										className={classNames.recommendSongName}
									>
										{item.name}
									</h4>
								</Link>
							</li>
						))}
					</ul>
				</div>
			</main>
		</div>
	);
}
