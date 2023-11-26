"use client";
import React from "react";
import SideNav from "@/app/ui/dashboard/sidenav";
import ProgressLoader from "../ui/dashboard/progressloader";

export default function Layout({ children }: { children: React.ReactNode }) {
  const [isProgressActive, setProgressActive] = React.useState<boolean>(false);

  React.useEffect(() => {
    const handleScroll = () => {
      const offset = 50;
      setProgressActive(window.scrollY > offset);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
        <div className="w-full flex-none md:w-64">
          <SideNav />
        </div>
        <div className="flex-grow p-6 md:overflow-y-auto md:p-12">
          {children}
        </div>

        <ProgressLoader isProgressActive={isProgressActive} />
      </div>
    </>
  );
}
