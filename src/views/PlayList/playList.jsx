import { Ellipsis, InfiniteScroll, List, Tag, Toast } from "antd-mobile";
import { PlayWindow } from "../../components/PlayWindow/playWindow";
import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams, useLocation } from "react-router-dom";
import {
	fetchAllPlayList,
	fetchPlayListDetail,
} from "../../api/playList/playList";
import { changePlayStatus } from "../../store/playControlSlice";
import {
	AddSquareOutline,
	MessageOutline,
	SendOutline,
} from "antd-mobile-icons";
import { fetchArtistDetail } from "../../api/playList/artists";

export function PlayList() {
	const dispatch = useDispatch();
	const params = useParams();
	const location = useLocation();
	const type = location.pathname.match(/^\/([a-z]+)\//)?.[1];
	console.log(type);

	const [playList, setPlayList] = useState([]);
	const [playListDetail, setPlayListDetail] = useState({});

	const [hasMore, setHasMore] = useState(true);
	const currentOffset = useRef(0);
	const limit = 10;

	useEffect(() => {
		if (type === "playlist") {
			fetchPlayListDetail({ id: params.id })
				.then((res) => {
					console.log(res);
					setPlayListDetail(res.playlist || {});
				})
				.catch((err) => {
					Toast.show(err);
				});
		}
	}, []);

	async function loadMore() {
		return type === "playlist"
			? fetch({
					id: params.id,
					limit,
					offset: currentOffset.current,
			  })
					.then((res) => {
						console.log(res);
						if (!res.songs || res.songs.length === 0) {
							setHasMore(false);
						}

						setPlayList([...playList, ...res.songs]);
						currentOffset.current = currentOffset.current + limit;
					})
					.catch((err) => {
						Toast.show({
							content: err,
						});
					})
			: fetchArtistDetail({ id: params.id })
					.then((res) => {
						console.log(res);
						if (!res.hotSongs || res.hotSongs.length === 0) {
							setHasMore(false);
						}

						setPlayListDetail(res.artist || {});
						setPlayList([...playList, ...res.hotSongs]);
						currentOffset.current = currentOffset.current + limit;
					})
					.catch((err) => {
						Toast.show(err);
					});
	}

	function play(item) {
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
	}

	return (
		<div>
			<div
				className="overflow-hidden w-full h-56 relative  "
				style={{
					borderRadius: "0 0 5% 5%",
					boxShadow: "inset rgb(221 221 221) 3px 3px 12px 4px",
				}}
			>
				<div
					className="h-full blur-3xl scale-150 pb-32 flex "
					style={{
						backgroundImage: `url(${
							type === "playlist"
								? playListDetail.coverImgUrl
								: playListDetail.img1v1Url
						})`,
					}}
				></div>
				<div className="absolute top-0 bottom-0 left-0 right-0 flex w-5/6 h-5/6 mx-auto justify-center items-center">
					<img
						className="w-28 h-28 rounded shadow-md"
						src={
							type === "playlist"
								? playListDetail.coverImgUrl
								: playListDetail.img1v1Url
						}
					></img>

					<div className="h-28 mx-4 ">
						<div className="text-base text-white">
							<Ellipsis
								content={playListDetail.name}
								rows={2}
							></Ellipsis>
						</div>
						<div className="text-sm flex items-center text-gray-100  opacity-90">
							<img
								className="w-6 h-6 rounded-full mr-2"
								src={playListDetail.creator?.avatarUrl}
							></img>
							<Ellipsis
								className="w-full"
								content={playListDetail.creator?.nickname}
							></Ellipsis>
						</div>
						<div className="text-sm text-ellipsis text-gray-100 opacity-90">
							<Ellipsis
								content={playListDetail.description}
								rows={2}
							></Ellipsis>
						</div>
					</div>
				</div>
				<aside className="absolute bottom-2 w-full ">
					<ul className="flex justify-evenly items-center w-fit px-4 mx-auto text-black text-opacity-90 shadow rounded-full h-10 bg-white">
						<li className="flex items-center">
							<AddSquareOutline fontSize={20} />
							<span className="ml-1 ">
								{playListDetail.subscribedCount}
							</span>
						</li>
						<li className="h-4/6 w-px bg-gray-200 mx-;"></li>
						<li className="flex items-center">
							<MessageOutline fontSize={20} />
							<span className="ml-1 ">
								{playListDetail.commentCount}
							</span>
						</li>
						<li className="h-4/6 w-px bg-gray-200 mx-;"></li>
						<li className="flex items-center">
							<SendOutline fontSize={20} />
							<span className="ml-1 ">
								{playListDetail.shareCount}
							</span>
						</li>
					</ul>
				</aside>
			</div>
			<List
				mode="card"
				style={{ "--border-inner": "transparent", margin: 0 }}
			>
				{playList.map((item) => (
					<List.Item key={item.id} onClick={() => play(item)}>
						<div className="text-base"> {item.name} </div>
						<div>
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
							<span className="text-sm">
								{item.ar[0] && item.ar[0].name}{" "}
							</span>
							<span className="text-sm">
								{item.al && `《${item.al.name}》`}{" "}
							</span>
						</div>
					</List.Item>
				))}
			</List>
			<InfiniteScroll loadMore={loadMore} hasMore={hasMore} />
			<div className="h-16"></div>
			<PlayWindow></PlayWindow>
		</div>
	);
}
