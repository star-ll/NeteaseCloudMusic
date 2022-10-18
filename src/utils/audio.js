import { fetchPlayDetail, fetchPlayUrl } from "../api/play/play";
import { store } from "../store";

function loadPlay() {
	this.audio.play();
	this.audio.removeEventListener("canplay", loadPlay);
}

// 单例模式
let hasCreated = false;
export class AudioControl {
	onerrorFns = [];
	onpauseFns = [];
	onplayingFns = [];
	oncanplayFns = [];
	ontimeupdate = [];
	playList = []; // 播放列表

	constructor() {
		if (hasCreated) {
			throw new Error("audio already exist");
		}

		this.audio = new window.Audio();
		this.store = store;

		// 播放完后尝试播放下一首
		this.addEventListener("ended", () => {
			const state = this.store.getState();
			const currentId = state.playControl.musicInfo.id;

			const index = state.playControl.playList.indexOf(currentId) + 1;
			if (index < state.playControl.playList.length) {
				this.play(state.playControl.playList[index + 1]);
			}
		});

		hasCreated = true;
	}

	addEventListener(type, callback) {
		this.audio.addEventListener(type, callback);
	}

	play(id) {
		if (id != null) {
			fetchPlayUrl({ id }).then((res) => {
				console.log(res);
				if (!Array.isArray(res.data) || res.data.length === 0) {
					throw new Error("歌曲不可播放");
				}
				this.audio.pause();
				this.audio.src = res.data[0].url;
				// 歌曲可播放后开始播放
				this.audio.addEventListener("canplay", loadPlay.bind(this));
				this.audio.load();
			});

			fetchPlayDetail({ ids: id }).then((res) => {
				console.log(999, res);
				this.store.dispatch({
					type: "playControl/changePlayStatus",
					payload: {
						musicInfo: {
							id: res.songs[0].id,
							name: res.songs[0].name,
							singer: res.songs[0].ar,
						},
					},
				});
			});

			// this.audio.src =
			// 	"https://music.163.com/song/media/outer/url?id=" + id + ".mp3";
		} else {
			this.audio.play();
		}

		this.store.dispatch({
			type: "playControl/changePlayStatus",
			payload: {
				playStatus: "playing",
			},
		});
	}

	playAll(list) {
		if (!Array.isArray(list)) {
			throw new Error("必须传递一个歌曲id数组");
		}

		this.store.dispatch({
			type: "playControl/playAll",
			payload: {
				playList: list,
			},
		});

		this.play(list, list[0].id);
	}

	pause() {
		this.audio.pause();
		this.store.dispatch({
			type: "playControl/changePlayStatus",
			payload: {
				playStatus: "paused",
			},
		});
	}

	changeProgress(percent) {
		const isEnded = this.audio.ended;
		this.audio.currentTime = (percent / 100) * this.audio.duration;
		this.store.dispatch({
			type: "playControl/changePlayTime",
			payload: {
				progress: percent,
			},
		});

		if (isEnded) {
			// 如果已经播放完了，调整进度后将会继续播放
			audioControl.play();
		}
	}
}

export const audioControl = new AudioControl();
