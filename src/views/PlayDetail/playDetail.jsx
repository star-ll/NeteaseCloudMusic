import React, { memo, useMemo, useRef } from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { fetchPlayDetail, fetchSongLyric } from "../../api/play/play";
import { changePlayStatus, changePlayTime } from "../../store/playControlSlice";
import { Slider, Swiper } from "antd-mobile";
import { audioControl } from "../../utils";
import { CurrentPlayList } from "../../components/CurrentPlayList/currentPlayList";
import { share } from "../../utils/helper";

// 播放进度组件
export function SongProgress({}) {
  const dispatch = useDispatch();
  const { progress: progressRaw } = useSelector((state) => state.playControl);

  const [progress, setProgress] = useState(progressRaw || 0);
  const [isTouchProgressBar, setIsTouchProgressBar] = useState(false);

  // 更新音频进度
  function updateSongProgress() {
    setProgress((audioControl.audio.currentTime / audioControl.audio.duration) * 100);
  }

  function onProgressAfterChange(value) {
    // 更新audio
    audioControl.changeProgress(value);
  }

  useEffect(() => {
    audioControl.addEventListener("timeupdate", updateSongProgress);
    return () => {
      audioControl.removeEventListener("timeupdate", updateSongProgress);
    };
  }, []);

  return (
    <Slider
      onTouchStart={() => setIsTouchProgressBar(true)}
      onTouchEnd={() => setIsTouchProgressBar(false)}
      min={0}
      max={100}
      value={isTouchProgressBar ? undefined : progress}
      defaultValue={0}
      style={{
        "--fill-color": "#d43c33",
      }}
      onAfterChange={onProgressAfterChange}
    ></Slider>
  );
}

/**
 * 歌曲播放界面
 * @returns
 */
export default function playDetail() {
  const params = useParams();
  const dispatch = useDispatch();
  // const musicInfo = useSelector((state) => state.playControl.musicInfo);
  const playControl = useSelector((state) => state.playControl);
  const { playStatus, playType, musicInfo } = playControl;

  const [showCurrentPlayList, setShowCurrentPlayList] = useState(null);

  // 界面索引
  const viewIndex = useRef(0);

  const songLyricEl = useRef();
  const [songLyric, setSongLyric] = useState({});
  const [currentLyric, setCurrentLyric] = useState(-1);

  console.log(params);

  if (params.id == null) {
    return <div>Error</div>;
  }

  useEffect(async () => {
    try {
      audioControl.play(params.id);

      dispatch(changePlayTime({ duration: musicInfo.rawInfo.dt }));
    } catch (err) {
      console.error(err);
    }
  }, [params.id]);

  useEffect(() => {
    getLyric();
  }, [musicInfo.id]);

  async function getLyric() {
    // debugger;
    console.log("===============获取歌词=================");
    const { lrc } = await fetchSongLyric(musicInfo.id);
    const lyricRaw = lrc.lyric.split("\n");
    console.log(lyricRaw);
    const lyric = lyricRaw.reduce((prev, cur) => {
      let timer = cur.match(/^\[([0-9.:]+)\]/)?.[1];
      const value = cur.match(/^\[[0-9.:]+\](.+)/)?.[1].trim() || "";

      if (!timer) {
        return prev;
      }

      // 处理时间戳
      const [raw, minute, second, millisecond] = timer.match(/(\d+)\:(\d+)\.(\d+)/) || [];
      timer = `${parseInt(minute) * 60 + Number(second)}.${Number(millisecond)}`;

      prev[timer] = { value, id: timer + value };
      return prev;
    }, {});

    setSongLyric(lyric);
    const songLyricMap = Object.keys(lyric);

    audioControl.addEventListener("timeupdate", () => {
      const currentTime = parseFloat(audioControl.audio.currentTime);
      for (let i = 0; i < songLyricMap.length; i++) {
        const cur = parseFloat(songLyricMap[i]);
        const next = parseFloat(songLyricMap[i + 1] ?? Number.MAX_SAFE_INTEGER);

        if (currentTime >= cur && currentTime < next) {
          if (viewIndex.current === 1) {
            songLyricEl.current.children[i].scrollIntoView({
              behavior: "smooth",
              block: "center",
            });
          }
          setCurrentLyric(i);
          return;
        }
      }
    });
  }

  function switchPlayStatus() {
    playStatus === "paused" ? audioControl.play() : audioControl.pause();
  }

  function nextSong() {
    audioControl.next();
  }

  function prevSong() {
    audioControl.previous();
  }

  const toShare = share("一起听", "一起听——" + musicInfo.name, location.href);

  return (
    <div className="w-screen h-screen overflow-y-hidden overflow-x-auto">
      {/* 背景 */}
      <div
        className="bg h-screen w-screen fixed -z-10 bottom-0 top-0 left-0 right-0 blur-3xl brightness-75 scale-150"
        style={{
          backgroundImage: `url('${musicInfo.cover}')`,
          backgroundSize: "100% 100%",
        }}
      ></div>
      {/* 界面 */}
      <Swiper
        className="flex "
        indicator={() => <></>}
        onIndexChange={(index) => (viewIndex.current = index)}
        style={{ "--height": "100vh" }}
      >
        {/* 歌曲播放 */}
        <Swiper.Item className={"flex flex-col  justify-between w-screen h-screen overflow-hidden"}>
          {/* 主体 */}
          <header className="h-12">
            <ul className="flex justify-between mx-4">
              <li>
                <Link to={-1}>
                  <i className="ri-arrow-down-s-line text-4xl text-white"></i>
                </Link>
              </li>
              <li className="text-white">
                <div className="text-lg">{musicInfo.name}</div>
                <div className="text-sm text-center ">{musicInfo.singer?.name}</div>
              </li>
              <li>
                <i className="ri-share-line text-3xl text-white" onClick={toShare}></i>
              </li>
            </ul>
          </header>
          <main className="flex flex-col justify-center items-center h-3/5">
            {/* 歌曲封面 */}
            <div>
              <div
                className={
                  "w-72 h-72 rounded-full shadow-inner shadow-black animate-ripple animate-rotate" +
                  ` ${playStatus === "playing" ? "animate-play" : "animate-pause animate-ripple-pause"}`
                }
                style={{ background: `url(${musicInfo.cover}) center/ 100% 100%` }}
                alt={musicInfo.name}
              ></div>
            </div>
          </main>
          <div className="mt-4  flex flex-col justify-evenly">
            <div className="">
              <SongProgress></SongProgress>
            </div>
            <div className="flex justify-around text-3xl text-white">
              <span>
                {playType === "order" && <i className="ri-repeat-line"></i>}
                {playType === "loop" && <i className="ri-repeat-one-line"></i>}
                {playType === "random" && <i className="ri-shuffle-line"></i>}
              </span>
              <i className="ri-skip-back-fill" onClick={prevSong}></i>
              <i
                className={playStatus === "paused" ? "ri-play-circle-fill" : "ri-pause-circle-fill"}
                onClick={switchPlayStatus}
              ></i>
              <i className="ri-skip-forward-fill" onClick={nextSong}></i>
              <i className="ri-play-list-2-fill" onClick={() => setShowCurrentPlayList(true)}></i>
            </div>
          </div>

          {
            <CurrentPlayList
              showCurrentPlayList={showCurrentPlayList}
              setShowCurrentPlayList={setShowCurrentPlayList}
            ></CurrentPlayList>
          }
        </Swiper.Item>

        {/* 歌词 */}
        <Swiper.Item className="h-screen w-screen ">
          <ul
            className="overflow-x-hidden overflow-y-auto text-white text-base p-4 fixed top-0 
            bottom-0 right-0 w-screen h-screen"
            style={{ left: "100vw" }}
            ref={songLyricEl}
          >
            {Object.values(songLyric).map((i, index) => (
              <li key={i.id}>
                <span className={"my-2 transition-all " + (currentLyric == index ? "text-red-500 text-2xl " : "")}>
                  {i.value}
                </span>
              </li>
            ))}
          </ul>
        </Swiper.Item>
      </Swiper>
    </div>
  );
}
