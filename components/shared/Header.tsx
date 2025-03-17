"use client";

import React, { useState } from "react";
import { AddEmployeeModal } from "./AddEmployeeModal";
import { Button } from "../ui/button";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Header = () => {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/";

  return (
    <header className="w-full flex justify-between py-[31px] px-[2px]">
      {isHome ? (
        <div className="flex items-center gap-1">
          <span className="text-[31px] text-[#8338EC]">Momentum</span>
          <Image
            src="/assets/header-logo.png"
            alt="header logo"
            width={38}
            height={38}
          />
        </div>
      ) : (
        <Link href="/" className="flex items-center gap-1">
          <span className="text-[31px] text-[#8338EC]">Momentum</span>
          <Image
            src="/assets/header-logo.png"
            alt="header logo"
            width={38}
            height={38}
          />
        </Link>
      )}

      <div className="flex items-center gap-10">
        <AddEmployeeModal open={open} setOpen={setOpen} from="/" />
        <Link href="/create-assignment">
          <Button className="text-white px-5 py-2 bg-[#8338EC] hover:bg-[#8338EC] cursor-pointer border border-[#8338EC] gap-1 flex items-center">
            <Image
              src="/assets/add-icon.png"
              alt="add"
              width={20}
              height={20}
            />
            შექმენი ახალი დავალება
          </Button>
        </Link>
      </div>
    </header>
  );
};

export default Header;
