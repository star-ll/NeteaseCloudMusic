import React from "react";
import { Ellipsis, InfiniteScroll, List, Tag, Toast } from "antd-mobile";
import { PlayWindow } from "../../components/PlayWindow/playWindow";
import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams, useLocation } from "react-router-dom";
import { fetchAllPlayList, fetchPlayListDetail } from "../../api/playList/playList";
import { changePlayStatus, addPlayList } from "../../store/playControlSlice";
import { AddSquareOutline, MessageOutline, SendOutline } from "antd-mobile-icons";
import { fetchArtistDetail, fetchArtistHotSong } from "../../api/playList/artists";
import { PreviewImage } from "../../components/PreviewImage/PreviewImage";
import { audioControl } from "../../utils";
import { Footer } from "../TabBar/Index";

export function PlayList() {
  const dispatch = useDispatch();
  const params = useParams();
  const location = useLocation();
  const type = location.pathname.match(/^\/([a-z]+)\//)?.[1];
  console.log(type);

  const [playList, setPlayList] = useState([]);
  const [playListDetail, setPlayListDetail] = useState({});

  const [hasMore, setHasMore] = useState(true);
  const currentOffset = useRef(0);

  useEffect(() => {
    if (type === "playlist") {
      fetchPlayListDetail({ id: params.id })
        .then((res) => {
          console.log(res);
          setPlayListDetail(res.playlist || {});
        })
        .catch((err) => {
          Toast.show(err);
        });
    }
  }, []);

  async function loadMore(limit = 10) {
    return type === "playlist"
      ? fetchAllPlayList({
          id: params.id,
          limit,
          offset: currentOffset.current,
        })
          .then((res) => {
            console.log(res);
            if (!res.songs || res.songs.length === 0) {
              setHasMore(false);
            }

            setPlayList([...playList, ...res.songs]);
            currentOffset.current = currentOffset.current + limit;
          })
          .catch((err) => {
            Toast.show({
              content: err,
            });
          })
      : fetchArtistHotSong({ id: params.id })
          .then((res) => {
            console.log(res);

            setPlayListDetail(res.artist || {});
            setPlayList(res.hotSongs);
            setHasMore(false);
            currentOffset.current = currentOffset.current + limit;
          })
          .catch((err) => {
            Toast.show(err);
          });
  }

  function play(item) {
    console.log(item);

    audioControl.play(item.id);
  }

  async function playAll() {
    audioControl.playAll(type, params.id);
  }

  return (
    <div>
      <div
        className="overflow-hidden w-full h-56 relative  "
        style={{
          borderRadius: "0 0 5% 5%",
          boxShadow: "inset rgb(221 221 221) 3px 3px 12px 4px",
        }}
      >
        <div
          className="h-full blur-3xl scale-150 flex "
          style={{
            backgroundImage: `url(${type === "playlist" ? playListDetail.coverImgUrl : playListDetail.img1v1Url})`,
          }}
        ></div>
        <div
          className={
            "absolute top-0 bottom-0 left-0 right-0 flex w-5/6 h-5/6 mx-auto justify-center items-center " +
            (type === "artists" && "flex-col ")
          }
        >
          <PreviewImage>
            <img
              className="w-28 h-28 max-w-none rounded shadow-md"
              src={type === "playlist" ? playListDetail.coverImgUrl : playListDetail.img1v1Url}
            ></img>
          </PreviewImage>

          <div className={"mx-4 " + (type === "playlist" && "h-28 ")}>
            <div className="text-base text-white">
              <Ellipsis content={playListDetail.name} rows={2}></Ellipsis>
            </div>
            {type === "playlist" && (
              <div className="text-sm flex items-center text-gray-100  opacity-90">
                <img className="w-6 h-6 rounded-full mr-2" src={playListDetail.creator?.avatarUrl}></img>
                <Ellipsis className="w-full" content={playListDetail.creator?.nickname}></Ellipsis>
              </div>
            )}
            <div className="text-sm text-ellipsis text-gray-100 opacity-90 ">
              <Ellipsis content={playListDetail.description} rows={2}></Ellipsis>
            </div>
          </div>
        </div>
        <aside className="absolute bottom-2 w-full ">
          <ul
            className="flex justify-evenly items-center w-fit px-4 mx-auto text-black text-opacity-90 shadow 
		  rounded-full h-10 bg-white whitespace-nowrap"
          >
            <li className="flex items-center" onClick={() => playAll()}>
              {type === "playlist" ? (
                <div className="flex">
                  <AddSquareOutline fontSize={20} />
                  <span className="ml-1 ">{playListDetail.subscribedCount}</span>
                </div>
              ) : (
                <span>播放</span>
              )}
            </li>
            <li className="h-4/6 w-px bg-gray-200 mx-2"></li>
            {type === "playlist" ? (
              <>
                <li className="flex items-center">
                  <MessageOutline fontSize={20} />
                  <span className="ml-1 ">{playListDetail.commentCount}</span>
                </li>
              </>
            ) : (
              <>关注</>
            )}
            <li className="h-4/6 w-px bg-gray-200 mx-2"></li>
            <li className="flex items-center">
              <SendOutline fontSize={20} />
              <span className="ml-1 ">{playListDetail.shareCount}</span>
            </li>
          </ul>
        </aside>
      </div>
      <List mode="card" style={{ "--border-inner": "transparent", margin: 0 }}>
        {playList.map((item) => (
          <List.Item key={item.id} onClick={() => play(item)}>
            <div className="text-base text-ellipsis overflow-x-hidden whitespace-nowrap w-screen"> {item.name} </div>
            <div className="text-ellipsis overflow-x-hidden whitespace-nowrap w-screen">
              {item.sq && (
                <Tag color="danger" className="mr-1">
                  SQ
                </Tag>
              )}
              {item.originCoverType == 1 && (
                <Tag color="danger" className={" mr-1"}>
                  原唱
                </Tag>
              )}
              {item.fee === 1 && (
                <Tag color="danger" className={" mr-1"}>
                  试听
                </Tag>
              )}
              {item.ar.map((itemChild) => (
                <span key={`${item.id}+${itemChild.id}`} className="text-sm">
                  {itemChild?.name}{" "}
                </span>
              ))}
              <span className="text-sm">{item.al && `《${item.al.name}》`} </span>
            </div>
          </List.Item>
        ))}
      </List>

      <InfiniteScroll loadMore={loadMore} hasMore={hasMore} />

      <Footer></Footer>
    </div>
  );
}
