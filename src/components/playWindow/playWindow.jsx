import classNames from "./play.module.css";
import musicLogo from "../../assets/光碟.svg";
import playMusic from "../../assets/play_music.svg";
import pauseMusic from "../../assets/pause_music.svg";
import songSheet from "../../assets/歌单.svg";
import { useEffect, useState } from "react";
import store from "@/store/playControl";
import { Toast } from "antd-mobile";

const state = store.getState();

let audio = new window.Audio();
export function PlayWindow() {
	// 播放/暂停功能
	function changePlayStatus() {
		if (audio.paused) {
			audio.play();
			store.dispatch({ type: "change/play" });
		} else {
			audio.pause();
			store.dispatch({ type: "change/pause" });
		}
	}
	// 播放错误监听
	useEffect(() => {
		audio.onerror = () => {
			Toast.show({
				content: "此音乐不可播放",
				position: "bottom",
			});
		};
	}, []);
	// 切换歌曲
	useEffect(() => {
		let unSubscribe = store.subscribe(() => {
			let state = store.getState();
			if (state.playDetail.id != null) {
				try {
					audio.src =
						"https://music.163.com/song/media/outer/url?id=" +
						state.playDetail.id +
						".mp3";
					audio.play();
					store.dispatch({ type: "change/play" });
				} catch (e) {
					console.log(e);
				}
			}
		});
		return () => {
			unSubscribe();
		};
	}, []);

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
						animationPlayState:
							state.playDetail.status === "played"
								? "running"
								: "paused",
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
					src={
						state.playDetail.status === "played"
							? pauseMusic
							: playMusic
					}
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
