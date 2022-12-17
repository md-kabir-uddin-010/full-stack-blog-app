import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useRef } from "react";
import checkLogin from "../../services/checkLogin";
import DashboardNavbar from "../dashboard/navbar/DashboardNavbar";
import Sidebar from "../dashboard/sidebar/Sidebar";
import Loding from "../loading/Loding";

export default function DashboardLayout({ children }) {
  const router = useRouter();
  const preview = router.isPreview;
  const [isLoading, setIsLoading] = useState(true);

  let loggedin = useRef(null);
  useEffect(() => {
    loggedin.current = checkLogin();
    if (!loggedin && preview) {
      router.push("/admin/dashboard/login");
      setIsLoading(true);
    } else {
      setIsLoading(false);
    }
  }, [preview, router]);

  if (isLoading) {
    return (
      <>
        <Loding />
      </>
    );
  }

  return (
    <div>
      {preview ? (
        <main className=" flex">
          <div className=" flex-none w-64 lg:w-14 min-h-screen bg-white">
            <Sidebar />
          </div>
          <div className=" w-[calc(100%-256px)] lg:w-[calc(100%-56px)] min-h-full p-9 lg:p-3 bg-[#F8FBFF]">
            <div className="">
              <DashboardNavbar />
            </div>
            {/* props children  */}
            <div className="">{children}</div>
          </div>
        </main>
      ) : (
        <div className="">{children}</div>
      )}
    </div>
  );
}
