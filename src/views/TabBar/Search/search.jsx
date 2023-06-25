import { SearchBar, List, InfiniteScroll, Tag } from "antd-mobile";
import classNames from "./search.module.css";
import { fetchSearchResult } from "@/api/homepage/search";
import { useState } from "react";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { audioControl } from "../../../utils";
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
		console.log(item);
		audioControl.play(item.id);
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
			<List
				mode="card"
				className=""
				style={{
					"--border-inner": "transparent",
					margin: 0,
				}}
			>
				{playList.map((item, index) => (
					<List.Item
						key={item.id}
						disabled={!item.resourceState}
						onClick={() => play(item)}
					>
						<div className={"text-base"}> {item.name} </div>
						<div
							className={
								"text-ellipsis overflow-x-hidden whitespace-nowrap w-screen"
							}
						>
							{item.sq && (
								<Tag color="danger" className="mr-1">
									SQ
								</Tag>
							)}
							{item.originCoverType == 1 && (
								<Tag color="danger" className={" mr-1"}>
									原唱
								</Tag>
							)}
							{item.fee === 1 && (
								<Tag color="danger" className={" mr-1"}>
									试听
								</Tag>
							)}
							{item.ar.map((itemChild) => (
								<span
									key={`${item.id}+${itemChild.id}`}
									className="text-sm mr-1"
								>
									{itemChild?.name}
								</span>
							))}
							<span className="text-sm">
								{item.al && `《${item.al.name}》`}
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
