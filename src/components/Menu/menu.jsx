import { useState } from "react";
import React from "react";

export function Menu({ isShow, changeShow }) {
  const [closeAnimateCss, setCloseAnimateCss] = useState(false);

  function closeMenu() {
    setCloseAnimateCss(true);
    setTimeout(() => {
      changeShow(false);
      setCloseAnimateCss(false);
    }, 1000);
  }

  return (
    <>
      {isShow && (
        <div
          className={`${
            closeAnimateCss ? "animate__slideOutLeft" : ""
          } animate__animated animate__slideInLeft h-full w-full fixed top-0 left-0 z-40`}
          onClick={closeMenu}
        >
          <div
            onClick={(e) => {
              e.stopPropagation();
            }}
            className="w-1/2 h-full shadow-lg py-6"
            style={{ background: "#d43c33" }}
          >
            <div className="flex flex-col items-center">
              <div>
                <img className="w-12 h-12" src="/src/assets/未登录.svg" />
              </div>
              <p className="text-white m-2">登录</p>
            </div>
            <div>
              <ul className="">
                {["已播歌曲", "收藏", "歌单"].map((item) => (
                  <li key={item} className="text-base text-center py-2 text-white">
                    {item}
                  </li>
                ))}
                {/* <li>音乐电台</li>
						<li>个性电台</li> */}
              </ul>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
