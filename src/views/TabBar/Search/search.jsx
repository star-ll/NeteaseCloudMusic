import { SearchBar, List, InfiniteScroll } from "antd-mobile";
import classNames from "./search.module.css";
import { fetchSearchResult } from "@/api/homepage/search";
import { useState } from "react";
import { changePlayStatus } from "../../../store/playControlSlice";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
let pageNumber = -1;
let maxNum;
export default function Search() {
	let [playList, setPlayList] = useState([]);
	const [hasMore, setHasMore] = useState(true);
	const [keywords, setKeywords] = useState("");

	const dispatch = useDispatch();
	const playControlSlice = useSelector((state) => state.playControl);

	// 加载新的一页
	async function loadMore() {
		if (keywords == "" || hasMore == false) return;
		pageNumber++;
		let offset = pageNumber * 30;
		if (maxNum && pageNumber * 30 > maxNum) {
			offset = maxNum;
			setHasMore(false);
		}
		await search(keywords, offset);
	}

	function search(val, offset) {
		setKeywords(val);
		return new Promise((resolve, reject) => {
			fetchSearchResult({
				keywords: val,
				offset,
			})
				.then((res) => {
					if (res.code !== 200) return;
					setPlayList([...playList, ...res.result.songs]);
					maxNum = res.result.songCount;
					resolve();
				})
				.catch(() => {
					reject();
				});
		});
	}
	function play(item) {
		// store.dispatch({ type: "playMusic", id: item.id });
		// store.dispatch({ type: "change/play" });
		console.log(item);
		dispatch(
			changePlayStatus({
				playStatus: "playing",
				musicInfo: {
					singer: item.ar?.[0].name || "",
					name: item.name,
					id: item.id,
				},
			})
		);

		console.log(1, playControlSlice);
	}

	return (
		<>
			<section className={classNames.searchBox}>
				<SearchBar
					className="searchBar"
					placeholder="搜索"
					onSearch={(val) => {
						setKeywords(val);
						if (keywords) {
							setPlayList([]);
							pageNumber = -1;
						}
					}}
					style={{
						"--background": "#ffffff",
						"--border-radius": "20px",
						"--height": "1.5rem",
					}}
				/>
			</section>
			<List mode="card" style={{ "--border-inner": "transparent" }}>
				{playList.map((item, index) => (
					<List.Item key={item.id} onClick={() => play(item)}>
						<div className={classNames.playName}> {item.name} </div>
						<div className={classNames.playDetail}>
							<span className={classNames.playSinger}>
								{" "}
								{item.ar[0] && item.ar[0].name}{" "}
							</span>
							<span className={classNames.playAlbum}>
								{" "}
								{item.al && `《${item.al.name}》`}{" "}
							</span>
						</div>
					</List.Item>
				))}
			</List>
			{keywords && (
				<InfiniteScroll loadMore={loadMore} hasMore={hasMore} />
			)}
		</>
	);
}
