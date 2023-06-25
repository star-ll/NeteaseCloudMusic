import { fetchPlayDetail, fetchPlayUrl } from "../api/play/play";
import { fetchArtistHotSong } from "../api/playList/artists";
import { fetchAllPlayList } from "../api/playList/playList";
import { store } from "../store";

// 自动播放音频
function loadPlay() {
  this.audio.play();
  this.audio.removeEventListener("canplay", loadPlay);
}

async function loadAllSongs(type, id) {
  switch (type) {
    case "playlist":
      const { songs } = await fetchAllPlayList({
        id: id,
        limit: 0,
        offset: 0,
      });
      return songs;
    case "fetchArtistHotSong":
      const { hotSongs } = await fetchArtistHotSong({ id: id });
      return hotSongs;
  }
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
  songId = null; // 当前播放歌曲ID

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
    // 根据音频自动切换播放状态
    this.addEventListener("pause", () => {
      this.store.dispatch({
        type: "playControl/changePlayStatus",
        payload: {
          playStatus: "paused",
        },
      });
    });
    this.addEventListener("playing", () => {
      this.store.dispatch({
        type: "playControl/changePlayStatus",
        payload: {
          playStatus: "playing",
        },
      });
    });

    hasCreated = true;
  }

  addEventListener(type, callback) {
    this.audio.addEventListener(type, callback);
  }
  removeEventListener(type, callback) {
    this.audio.removeEventListener(type, callback);
  }

  play(id) {
    if (id != null) {
      // 如果播放id与this.songId相同，则继续播放
      if (id == this.songId) {
        // this.audio.currentTime = state.playControl.progress * state.playControl.duration;
        this.audio.play();
        return;
      }

      // 否则获取歌曲信息，重新播放
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
              singer: res.songs[0].ar[0],
              cover: res.songs[0].al.picUrl,
              rawInfo: res.songs[0],
            },
          },
        });
      });

      this.songId = id;

      // this.audio.src =
      // 	"https://music.163.com/song/media/outer/url?id=" + id + ".mp3";
    } else {
      // 点击播放但是没有歌曲，尝试是否有播放歌单
      if (!this.audio.src) {
        const state = this.store.getState();
        if (!state.playList.currentPlayList || state.playList.currentPlayList.length === 0) {
          return;
        }
        this.play(state.playList.currentPlayList[0].id);
        return;
      }

      this.audio.play();
    }
  }

  pause() {
    this.audio.pause();
  }

  async playAll(type, id) {
    const list = await loadAllSongs(type, id);

    this.store.dispatch({
      type: "playList/resetCurrentPlayList",
      payload: list,
    });
    window.localStorage.setItem("currentPlayList", JSON.stringify(list));

    this.play(list[0].id);
  }

  async next() {
    const state = this.store.getState();
    const index = state.playList.currentPlayList.findIndex((item) => item.id == this.songId);
    if (index == null) {
      // 没有找到，继续播放当前歌曲
      this.play(this.songId);
      return;
    }
    if (index === state.playList.currentPlayList.length - 1) {
      // 没有下一首
      return Promise.reject(false);
    }

    this.play(state.playList.currentPlayList[index + 1].id);
  }

  previous() {
    const state = this.store.getState();
    const index = state.playList.currentPlayList.findIndex((item) => item.id == this.songId);
    if (index == null) {
      // 没有找到，继续播放当前歌曲
      this.play(this.songId);
      return;
    }
    if (index === 0) {
      // 没有上一首
      return Promise.reject(false);
    }

    this.play(state.playList.currentPlayList[index - 1].id);
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

/**
 * 音频媒体控制器
 */
export const audioControl = new AudioControl();
