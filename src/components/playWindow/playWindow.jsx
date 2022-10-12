import classNames from "./play.module.css";
import musicLogo from "../../assets/光碟.svg";
import playMusic from "../../assets/play_music.svg";
import pauseMusic from "../../assets/pause_music.svg";
import songSheet from "../../assets/歌单.svg";
import { useEffect, useState } from "react";
import { ProgressBar, Slider, Toast } from "antd-mobile";
import { useDispatch, useSelector } from "react-redux";
import { changePlayStatus, changePlayTime } from "../../store/playControlSlice";
import { audioControl } from "../../utils/audio";

export function PlayWindow(props) {
	const dispatch = useDispatch();
	const playControlSlice = useSelector((state) => state.playControl);

	const [progress, setProgress] = useState(0);
	let [isTouchProgressBar, setIsTouchProgressBar] = useState(false);

	// 播放/暂停功能
	function changeStatus() {
		// if (playControlSlice.playStatus === "paused") {
		// 	dispatch(
		// 		changePlayStatus({
		// 			playStatus: "playing",
		// 		})
		// 	);
		// } else {
		// 	dispatch(
		// 		changePlayStatus({
		// 			playStatus: "paused",
		// 		})
		// 	);
		// }
	}

	function onProgressAfterChange(value) {
		audioControl.changeProgress(value);
	}

	useEffect(() => {
		// audio.onerror = () => {
		// 	Toast.show({
		// 		content: "此音乐不可播放",
		// 		position: "bottom",
		// 	});
		// };
		// audio.onpause = function () {
		// 	dispatch(
		// 		changePlayStatus({
		// 			playStatus: "paused",
		// 		})
		// 	);
		// };
		// audio.onplaying = function () {
		// 	dispatch(
		// 		changePlayStatus({
		// 			playStatus: "playing",
		// 		})
		// 	);
		// };
		// audio.oncanplay = function () {
		// 	dispatch(
		// 		changePlayTime({
		// 			duration: audio.duration,
		// 		})
		// 	);
		// };
		audioControl.audio.ontimeupdate = function () {
			dispatch(
				changePlayTime({
					currentTime: audioControl.audio.currentTime,
				})
			);
			setProgress(
				(audioControl.audio.currentTime / audioControl.audio.duration) *
					100
			);
		};
	}, []);

	// useEffect(() => {
	// 	if (playControlSlice.playStatus === "playing") {
	// 		audioControl.play();
	// 	} else {
	// 		audioControl.pause();
	// 	}
	// }, [playControlSlice.playStatus]);

	// useEffect(() => {
	// 	if (playControlSlice.musicInfo.id) {
	// 		audioControl.play(playControlSlice.musicInfo.id);
	// 	}
	// }, [playControlSlice.musicInfo.id]);

	return (
		<div className={classNames.playWindow}>
			<div
				onTouchStart={() => setIsTouchProgressBar(true)}
				onTouchEnd={() => setIsTouchProgressBar(false)}
			>
				<Slider
					className={classNames.progressSlider}
					min={0}
					max={100}
					value={isTouchProgressBar ? undefined : progress}
					defaultValue={0}
					style={{ "--fill-color": "#d43c33" }}
					onAfterChange={onProgressAfterChange}
				></Slider>
			</div>
			<section style={{ display: "flex", margin: "auto" }}>
				<section className={classNames.musicLogo}>
					<img
						src={musicLogo}
						style={{
							animationPlayState:
								playControlSlice.playStatus === "playing"
									? "running"
									: "paused",
						}}
					/>
				</section>
				<section className={classNames.songDetail}>
					<h4 className={classNames.songName}>
						{" "}
						{playControlSlice.musicInfo.name}{" "}
					</h4>
					&nbsp; - &nbsp;
					<span className={classNames.singerName}>
						{playControlSlice.musicInfo.singer}
					</span>
				</section>
				<section className={classNames.playControl}>
					<input
						className={classNames.playButton}
						type="image"
						src={
							playControlSlice.playStatus === "playing"
								? pauseMusic
								: playMusic
						}
						onClick={changeStatus}
					></input>
					<input
						className={classNames.playButton}
						type="image"
						src={songSheet}
					></input>
				</section>
			</section>
		</div>
	);
}
