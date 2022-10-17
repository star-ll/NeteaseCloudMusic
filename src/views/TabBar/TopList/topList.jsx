import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
	fetchAllTopList,
	fetchArtistTopList,
} from "../../../api/homepage/toplist";
import { utils } from "../../../utils";

const clientWidth = utils.getClientWidth();

function TopList() {
	const [topList, setTopList] = useState([]);
	const [artistTopList, setArtistTopList] = useState([]);

	useEffect(() => {
		fetchAllTopList().then((res) => {
			console.log(res);
			setTopList(res.list);
		});

		fetchArtistTopList().then((res) => {
			console.log(res);
			setArtistTopList(res.list?.artists || []);
		});
	}, []);

	return (
		<div>
			<div>
				<h3 className="text-lg">歌曲榜单</h3>
				<ul className="grid grid-cols-3">
					{topList.map((item) => (
						<li className="m-1" key={item.id}>
							<Link to={"/playlist/" + item.id}>
								<img
									className="rounded shadow"
									src={
										item.coverImgUrl +
										`?param=${parseInt(
											clientWidth / 3 - 10
										)}y${parseInt(clientWidth / 3 - 10)}`
									}
								></img>
							</Link>
						</li>
					))}
				</ul>
			</div>
			<div className="mt-5">
				<h3 className="text-lg">歌手榜单</h3>
				<ul className="grid grid-cols-3">
					{artistTopList.map((item) => (
						<li className="m-2" key={item.id}>
							<Link to={"/artists/" + item.id}>
								<img
									className="rounded shadow"
									src={
										item.img1v1Url +
										`?param=${parseInt(
											clientWidth / 3 - 10
										)}y${parseInt(clientWidth / 3 - 10)}`
									}
								></img>
								<p className="text-center">{item.name}</p>
							</Link>
						</li>
					))}
				</ul>
			</div>
		</div>
	);
}

export default TopList;
