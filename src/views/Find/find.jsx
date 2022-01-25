import { useState, useEffect } from "react";
import classNames from "./find.module.css";
import {
	findRecommendSongSheet,
	findNewSong,
	findTopPlayList,
} from "../../api/homepage/findNewSong";

const clientWidth = document.documentElement.clientWidth;

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
					<h3> 推荐歌单 </h3>
					<ul className={classNames.recommendSongSheet}>
						{recommendSongSheet.map((item) => (
							<li
								className={classNames.recommendSongSheetItem}
								key={item.id}
							>
								<img
									className={classNames.recommendSongSheetImg}
									src={
										item.picUrl +
										`?param=${parseInt(
											clientWidth / 3 - 10
										)}y${parseInt(clientWidth / 3 - 10)}`
									}
								></img>
								<h4 className={classNames.recommendSongName}>
									{item.name}
								</h4>
							</li>
						))}
					</ul>
				</div>
				<div>
					<h3 style={{ margin: "0.4em 0 0 0" }}>新歌速听</h3>
					<div className={classNames.miScroll}>
						<ul className={classNames.recommendSongList}>
							{recommendNewSong.map((item) => (
								<li
									className={
										classNames.recommendSongListItem +
										" " +
										classNames.recommendSongSheetItem
									}
									key={item.id}
								>
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
								</li>
							))}
						</ul>
					</div>
				</div>
				<div>
					<h3> 网友精选碟 </h3>
					<ul className={classNames.recommendSongSheet}>
						{recommendTopPlayList.map((item) => (
							<li
								className={classNames.recommendSongSheetItem}
								key={item.id}
							>
								<img
									className={classNames.recommendSongSheetImg}
									src={
										item.coverImgUrl +
										`?param=${parseInt(
											clientWidth / 3 - 10
										)}y${parseInt(clientWidth / 3 - 10)}`
									}
								></img>
								<h4 className={classNames.recommendSongName}>
									{item.name}
								</h4>
							</li>
						))}
					</ul>
				</div>
			</main>
		</div>
	);
}
