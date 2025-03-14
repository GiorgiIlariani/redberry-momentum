import {
  Menubar,
  MenubarCheckboxItem,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarTrigger,
} from "@/components/ui/menubar";
import Image from "next/image";
import { IoIosArrowDown } from "react-icons/io";

export function FilterMenubar() {
  return (
    <Menubar className="max-w-[688px] flex">
      {/* 1 */}
      <MenubarMenu>
        <MenubarTrigger className="flex flex-1 items-center gap-2 justify-center">
          დეპარტამენტი
          <IoIosArrowDown />
        </MenubarTrigger>
        <MenubarContent className="rounded-[10px] border border-[#8338EC] w-[688px] bg-[#FFFFFF] h-[274px] px-[30px] pt-10 pb-5"></MenubarContent>
      </MenubarMenu>
      {/* 2 */}
      <MenubarMenu>
        <MenubarTrigger className="flex flex-1 items-center gap-2 justify-center">
          პრიორიტეტი
          <IoIosArrowDown />
        </MenubarTrigger>
        <MenubarContent className="rounded-[10px] border border-[#8338EC] w-[688px] bg-[#FFFFFF] h-[274px]"></MenubarContent>
      </MenubarMenu>
      {/* 3 */}
      <MenubarMenu>
        <MenubarTrigger className="flex flex-1 items-center gap-2 justify-center">
          თანამშრომელი
          <IoIosArrowDown />
        </MenubarTrigger>
        <MenubarContent className="rounded-[10px] border border-[#8338EC] w-[688px] bg-[#FFFFFF] h-[274px]">
          <MenubarCheckboxItem>Always Show Bookmarks Bar</MenubarCheckboxItem>
          <MenubarCheckboxItem checked>
            Always Show Full URLs
          </MenubarCheckboxItem>
          <MenubarSeparator />
          <MenubarItem inset>
            Reload <MenubarShortcut>⌘R</MenubarShortcut>
          </MenubarItem>
          <MenubarItem disabled inset>
            Force Reload <MenubarShortcut>⇧⌘R</MenubarShortcut>
          </MenubarItem>
          <MenubarSeparator />
          <MenubarItem inset>Toggle Fullscreen</MenubarItem>
          <MenubarSeparator />
          <MenubarItem inset>Hide Sidebar</MenubarItem>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  );
}
