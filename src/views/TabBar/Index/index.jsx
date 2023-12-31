import { useEffect, useMemo, useRef, useState } from "react";
import classNames from "./home.module.css";
import { PlayWindow } from "../../../components/playWindow/playWindow";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import moreUrl from "@/assets/more.svg";
import noLoginUrl from "@/assets/notLogin.svg";
import React from "react";
import { Menu } from "../../../components/Menu/menu";

const navList = [
  {
    title: "发现",
    href: "/find",
  },
  {
    title: "排行",
    href: "/toplist",
  },
  {
    title: "搜索",
    href: "/search",
  },
];

export default function Home() {
  if (import.meta.hot) {
    console.log(import.meta.hot);
  }

  const location = useLocation();
  const navigate = useNavigate();
  const userStore = useSelector((store) => store.user);
  const [showMenu, setShowMenu] = useState(false);
  const navListIndex = navList.findIndex((i) => i.href === location.pathname);
  const [navIndex, setNavIndex] = useState(
    navListIndex === -1 ? 0 : navListIndex
  );

  useEffect(() => {
    console.log("user", userStore);
  }, []);

  function isLogin() {
    return userStore.token != null;
  }

  function onClickUserAvatar() {
    if (isLogin()) {
      // 登录了
    } else {
      // location.pus
      navigate("/user/login");
    }
  }

  return (
    <div>
      <div>
        <header className={classNames.homeHeader}>
          <ul className="flex justify-between">
            <li
              className={"flex justify-center items-center"}
              onClick={() => setShowMenu(true)}
            >
              <img className="w-6 h-6 mx-5" src={moreUrl} />
            </li>
            <li>
              <h2 className={classNames.logoName}>余烬的音乐乡</h2>
            </li>
            <li
              className={"flex justify-center items-center"}
              onClick={onClickUserAvatar}
            >
              <img className="w-6 h-6 mx-5" src={noLoginUrl} />
            </li>
          </ul>

          <nav className={classNames.homeNav}>
            <ul className="flex justify-evenly">
              {navList.map((item, index) => (
                <li
                  key={item.title}
                  className={[
                    navIndex === index
                      ? classNames.navButtonSelected
                      : classNames.navButton,
                  ]}
                  onClick={() => {
                    setNavIndex(index);
                  }}
                >
                  <Link to={item.href}>{item.title}</Link>
                </li>
              ))}
            </ul>
          </nav>
        </header>
        <Outlet></Outlet>
        <footer>
          <section className={classNames.footStatement}>
            本站仅作为学习之用，不可用于商业或其他用途
          </section>
        </footer>
        <Footer></Footer>
      </div>
      <Menu
        isShow={showMenu}
        changeShow={(isShow) => setShowMenu(isShow)}
      ></Menu>
    </div>
  );
}

const footerRouter = [
  {
    name: "发现",
    icon: "ri-netease-cloud-music-line",
    path: "/find",
  },
  {
    name: "播客",
    icon: "ri-voiceprint-line",
    path: "/voice",
  },
  {
    name: "我的",
    icon: "ri-music-2-line",
    path: "/my",
  },
  {
    name: "关注",
    icon: "ri-heart-2-line",
    path: "/interest",
  },
  {
    name: "社区",
    icon: "ri-chat-smile-2-line",
    path: "/community",
  },
];
function FooterIndex({}) {
  const location = useLocation();
  const activeIndex = useMemo(
    () => footerRouter.findIndex((i) => i.path === location.pathname),
    [location]
  );

  return (
    <ul className="flex justify-around w-screen bg-white">
      {footerRouter.map((i, index) => (
        <Link key={i.name} to={i.path}>
          <li className="flex flex-col items-center">
            <i
              className={`${i.icon} text-3xl text-gray-400 ${
                activeIndex === index ? "text-red-500" : ""
              }`}
            ></i>
            <span className="text-xs text-black">{i.name}</span>
          </li>
        </Link>
      ))}
    </ul>
  );
}

export function Footer() {
  return (
    <div className="h-28">
      <div className="z-30 fixed bottom-0">
        <PlayWindow></PlayWindow>
        <FooterIndex></FooterIndex>
      </div>
    </div>
  );
}
