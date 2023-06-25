import { Card, List } from "antd-mobile";
import { useDispatch, useSelector } from "react-redux";
import React, { useMemo, useState } from "react";
import { audioControl } from "../../utils";

/* 当前播放列表窗口 */
export function CurrentPlayList({ showCurrentPlayList, setShowCurrentPlayList }) {
  const { currentPlayList } = useSelector((store) => store.playList);
  const dispatch = useDispatch();

  const boxAnimationClassName = useMemo(() => {
    if (showCurrentPlayList === null) {
      return "hidden";
    }
    return showCurrentPlayList ? "animate__slideInUp" : "animate__slideOutDown";
  }, [showCurrentPlayList]);

  function playSong(id) {
    audioControl.play(id);
  }

  function removeOneFromCurrentPlayList() {}

  return (
    <div
      className={"z-40 fixed bottom-0 left-0 right-0 top-0 flex animate__animated " + boxAnimationClassName}
      onClick={(e) => (setShowCurrentPlayList(false), e.stopPropagation())}
    >
      <Card
        className={"mt-auto w-screen "}
        bodyClassName={""}
        bodyStyle={{ height: "50vh", width: "100%", overflow: "auto" }}
        headerStyle={{
          color: "#1677ff",
        }}
        title={"当前播放"}
        onClick={(e) => e.stopPropagation()}
      >
        <List mode="default">
          {currentPlayList.map((item) => (
            <List.Item
              key={item.id}
              onClick={() => playSong(item.id)}
              arrow={<i className="ri-close-line text-slate-400" onClick={removeOneFromCurrentPlayList}></i>}
            >
              <span className="text-base text-slate-800">{item.name}</span>
              {" · "}
              <span className="text-sm text-gray-400">{item.ar.map((i) => i.name).join("，")}</span>
            </List.Item>
          ))}
        </List>
      </Card>
    </div>
  );
}
