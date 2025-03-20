"use client";

import { AddEmployeeModal } from "./AddEmployeeModal";
import { Button } from "../ui/button";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Dialog, DialogTrigger } from "../ui/dialog";

const Header = () => {
  const pathname = usePathname();
  const isHome = pathname === "/";

  return (
    <header className="w-full flex justify-between py-[31px] px-[2px]">
      {isHome ? (
        <div className="flex items-center gap-1 cursor-pointer">
          <span className="text-[31px] text-[#8338EC]">Momentum</span>
          <Image
            src="/assets/header-logo.png"
            alt="header logo"
            width={38}
            height={38}
          />
        </div>
      ) : (
        <Link
          href="/"
          className="flex items-center gap-1"
          onClick={() =>
            typeof window !== "undefined" &&
            sessionStorage.removeItem("formData")
          }
        >
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
        <Dialog>
          <DialogTrigger className="text-[#212529] px-5 bg-transparent hover:bg-transparent cursor-pointer border border-[#8338EC] h-[39px] rounded-[5px]">
            თანამშრომლის შექმნა
          </DialogTrigger>
          <AddEmployeeModal />
        </Dialog>
        <Link href="/create-task">
          <Button className="h-10 text-white px-5 py-[10px] bg-[#8338EC] hover:bg-[#8338EC] cursor-pointer  gap-1 flex items-center">
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
