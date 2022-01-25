import classNames from "./play.module.css";
import musicLogo from "../../assets/光碟.svg";
import playMusic from "../../assets/play_music.svg";
import pauseMusic from "../../assets/pause_music.svg";
import songSheet from "../../assets/歌单.svg";
import { useEffect, useState } from "react";

let audio = new window.Audio(
	"https://music.163.com/song/media/outer/url?id=1384145901.mp3"
);
export function PlayWindow() {
	let [playStatus, setPlayStatus] = useState(false);
	function changePlayStatus() {
		if (audio.paused) {
			audio.play();
		} else {
			audio.pause();
		}
		setPlayStatus(!playStatus);
	}

	const songDetail = {
		songName: "火力少年王",
		singer: {
			name: "张三",
		},
	};

	return (
		<section className={classNames.playWindow}>
			<section className={classNames.musicLogo}>
				<img
					src={musicLogo}
					style={{
						animationPlayState: playStatus ? "running" : "paused",
					}}
				/>
			</section>
			<section className={classNames.songDetail}>
				<h4 className={classNames.songName}> {songDetail.songName} </h4>
				&nbsp; - &nbsp;
				<span className={classNames.singerName}>
					{songDetail.singer.name}
				</span>
			</section>
			<section className={classNames.playControl}>
				<input
					className={classNames.playButton}
					type="image"
					src={playStatus ? pauseMusic : playMusic}
					onClick={changePlayStatus}
				></input>
				<input
					className={classNames.playButton}
					type="image"
					src={songSheet}
				></input>
			</section>
		</section>
	);
}
