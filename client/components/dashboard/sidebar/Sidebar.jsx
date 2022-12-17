import {
  faArrowRightFromBracket,
  faBlog,
  faCommenting,
  faGear,
  faImages,
} from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import React from "react";
import DashbordLink from "./DashbordLink";
import LogoutButton from "./LogoutButton";
import SidebarLink from "./SidebarLink";

export default function Sidebar() {
  return (
    <div className=" px-8 lg:px-2">
      <div className=" flex items-center my-6 lg:flex-col">
        <div className="">
          {/* <Image
            width={48}
            height={48}
            className=" w-12 h-12 lg:w-full lg:h-auto bg-slate-400 rounded-full"
            src={userImg}
            alt={"logo"}
          /> */}
        </div>
        <div className=" ml-5 text-2xl lg:ml-0 lg:text-xs font-bold text-indigo-400">
          Blog.com
        </div>
      </div>
      <div className=" mt-12">
        <DashbordLink link={"/admin/dashboard"} text={"dashboard"} />
        <SidebarLink
          link={"/admin/dashboard/posts"}
          text={"blog posts"}
          icon={faBlog}
        />
        <SidebarLink
          link={"/admin/dashboard/comments"}
          text={"comments"}
          icon={faCommenting}
        />
        <SidebarLink
          link={"/admin/dashboard/gallery"}
          text={"gallery"}
          icon={faImages}
        />
        <div className=" my-4 mx-3 lg:hidden border-b"></div>
        <SidebarLink
          link={"/admin/dashboard/settings"}
          text={"settings"}
          icon={faGear}
        />
        <LogoutButton text={"logout"} icon={faArrowRightFromBracket} />
      </div>
    </div>
  );
}
