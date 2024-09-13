"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { sidebarLinks } from "../constants/index";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
const Sidebar = ({ user }: SiderbarProps) => {
  const pathname = usePathname();
  return (
    <section className="sidebar">
      <nav className="flex flex-col gap-4">
        <Link href="/" className="mb-12 flex cursor-pointer items-center gap-2">
          <Image
            src="/icons/logo.svg"
            width={34}
            height={34}
            alt="ngu"
            className="size-[24px] max-xl:size-14"
          />
          <h1 className="sidebar-logo">Horizon</h1>
        </Link>
        {sidebarLinks.map((item) => {
          const isActive =
            pathname === item.route || pathname.startsWith(`${item.route}/`);
          return (
            <Link
              href={item.route}
              key={item.label}
              className={`sidebar-link ${isActive ? "bg-bank-gradient" : ""}`}
            >
              <div className="relative size-6">
                <Image
                  src={item.imgURL}
                  alt={item.label}
                  fill
                  className={isActive ? "brightness-[3] invert-0" : ""}
                />
              </div>
              {/* <p className={`sidebar-label ${isActive ? "!text-white" : ""}`}> */}
              <p className={cn("sidebar-label", {'!text-white':isActive})}>
                {item.label}
              </p>
            </Link>
          );
        })}
      </nav>
    </section>
  );
};

export default Sidebar;
