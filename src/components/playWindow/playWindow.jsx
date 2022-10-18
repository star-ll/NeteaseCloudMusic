import classNames from "./play.module.css";
import musicLogo from "../../assets/光碟.svg";
import playMusic from "../../assets/play_music.svg";
import pauseMusic from "../../assets/pause_music.svg";
import songSheet from "../../assets/歌单.svg";
import { useEffect, useMemo, useState } from "react";
import { ProgressBar, Slider, Toast } from "antd-mobile";
import { useDispatch, useSelector } from "react-redux";
import { changePlayStatus, changePlayTime } from "../../store/playControlSlice";
import { audioControl } from "../../utils/audio";

export function PlayWindow(props) {
	const dispatch = useDispatch();
	const playControlSlice = useSelector((state) => state.playControl);

	let [isTouchProgressBar, setIsTouchProgressBar] = useState(false);

	// 播放/暂停功能
	function changeStatus() {
		if (playControlSlice.playStatus === "paused") {
			audioControl.play();
		} else {
			audioControl.pause();
		}
	}

	function onProgressAfterChange(value) {
		// 更新audio
		audioControl.changeProgress(value);
	}

	useEffect(() => {
		audioControl.addEventListener("error", () => {
			Toast.show({
				content: "此音乐不可播放",
				position: "bottom",
			});
		});
		audioControl.addEventListener("canplay", () => {
			dispatch(
				changePlayTime({
					duration: audioControl.audio.duration,
				})
			);
		});
		audioControl.addEventListener("timeupdate", () => {
			// 更新进度条
			dispatch(
				changePlayTime({
					progress:
						(audioControl.audio.currentTime /
							audioControl.audio.duration) *
						100,
				})
			);
		});
	}, []);

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
					value={
						isTouchProgressBar
							? undefined
							: playControlSlice.progress
					}
					defaultValue={0}
					style={{
						"--fill-color": "#d43c33",
					}}
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
						{playControlSlice.musicInfo.name}
					</h4>
					&nbsp; - &nbsp;
					{Array.isArray(playControlSlice.musicInfo.singer) &&
						playControlSlice.musicInfo.singer.map((singer) => (
							<span
								key={singer.id}
								className={classNames.singerName + " mr-1 "}
							>
								{singer.name}
							</span>
						))}
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
