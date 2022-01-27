import { SearchBar, List, InfiniteScroll } from "antd-mobile";
import classNames from "./search.module.css";
import { fetchSearchResult } from "@/api/homepage/search";
import { useEffect, useState } from "react";
import store from "@/store/playControl";

let keywords = "";
let pageNumber = 0;
let maxNum;
export default function Search() {
	let [playList, setPlayList] = useState([]);
	const [hasMore, setHasMore] = useState(true);

	// 加载新的一页
	async function loadMore() {
		if (keywords == "" || hasMore == false) return;
		pageNumber++;
		let offset = pageNumber * 30;
		if (maxNum && pageNumber * 30 > maxNum) {
			offset = maxNum;
			setHasMore(false);
		}
		return search(keywords, offset);
	}

	function search(val, offset) {
		keywords = val;
		fetchSearchResult({
			keywords: val,
			offset,
		}).then((res) => {
			if (res.code !== 200) return;
			setPlayList([...playList, ...res.result.songs]);
			maxNum = res.result.songCount;
		});
	}
	function play(item) {
		store.dispatch({ type: "playMusic", id: item.id });
		store.dispatch({ type: "change/play" });
	}

	return (
		<>
			<section className={classNames.searchBox}>
				<SearchBar
					className="searchBar"
					placeholder="搜索"
					onSearch={search}
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
