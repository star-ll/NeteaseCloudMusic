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

	constructor(config) {
		if (hasCreated) {
			throw new Error("audio already exist");
		}

		const { autoplay, playType } = config || {};

		this.audio = new window.Audio();

		// 播放完后尝试播放下一首
		this.addEventListener("onpause", () => {
			if (this.audio.ended) {
				const index = this.playList.indexOf(this.id) + 1;
				if (index < this.playList.length) {
					this.play(index + 1);
				}
			}
		});
	}

	addEventListener(type, callback) {
		this.audio.addEventListener(type, callback);
	}

	play(id) {
		if (id != null) {
			this.audio.src =
				"https://music.163.com/song/media/outer/url?id=" +
				playControlSlice.musicInfo.id +
				".mp3";
		}

		this.play();
	}

	pause() {
		this.audio.pause();
	}
}
