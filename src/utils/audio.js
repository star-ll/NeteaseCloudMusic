import { fetchPlayUrl } from "../api/play/play";

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
	id = null; // 音乐id
	playList = []; // 播放列表

	constructor() {
		if (hasCreated) {
			throw new Error("audio already exist");
		}

		this.audio = new window.Audio();

		// 播放完后尝试播放下一首
		this.addEventListener("pause", () => {
			if (this.audio.ended) {
				const index = this.playList.indexOf(this.id) + 1;
				if (index < this.playList.length) {
					this.play(this.playList[index + 1]);
				}
			}
		});

		hasCreated = true;
	}

	addEventListener(type, callback) {
		this.audio.addEventListener(type, callback);
	}

	play(id) {
		if (id != null) {
			fetchPlayUrl({ id })
				.then((res) => {
					console.log(res);
					if (!Array.isArray(res.data) || res.data.length === 0) {
						throw new Error("歌曲不可播放");
					}
					this.audio.pause();
					this.audio.src = res.data[0].url;
					// 歌曲可播放后开始播放
					this.audio.addEventListener("canplay", loadPlay.bind(this));
					this.audio.load();
				})
				.catch((err) => {
					console.error(err);
					Toast.show({
						content: err,
					});
				});
			// this.audio.src =
			// 	"https://music.163.com/song/media/outer/url?id=" + id + ".mp3";

			this.id = id;
		} else {
			this.audio.play();
		}
	}

	pause() {
		this.audio.pause();
	}

	changeProgress(percent) {
		const isEnded = this.audio.ended;
		this.audio.currentTime = (percent / 100) * this.audio.duration;

		if (isEnded) {
			// 如果已经播放完了，调整进度后将会继续播放
			audioControl.play();
		}
	}
}

export const audioControl = new AudioControl();
