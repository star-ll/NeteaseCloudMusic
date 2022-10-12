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
			this.audio.src =
				"https://music.163.com/song/media/outer/url?id=" + id + ".mp3";

			this.id = id;
		}

		this.audio.play();
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
