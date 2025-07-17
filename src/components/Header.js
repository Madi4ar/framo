import React from 'react';
import { usePathname } from 'next/navigation';
import logo from '../../public/images/logo.svg';
import diamond from '../../public/images/icons/diamond.svg';
import tv from '../../public/images/icons/tv.svg';
import notification from '../../public/images/icons/notifications.svg';
import arrow from '../../public/images/icons/arrow-return-left.svg';
import save from '../../public/images/icons/save.svg';
import avatar from '../../public/images/icons/avatar.svg';
import Image from 'next/image';
import Link from 'next/link';

function Header() {
  const path = usePathname();
  return (
    <>
      <div className="w-full flex items-center justify-between py-[14px] px-[12px]">
        <div className="flex items-center gap-x-[24px]">
          <Image src={logo} alt="" />

          <Link
            href=""
            target="_blank"
            className="flex items-center gap-x-[12px] p-[6px] bg-[#136CFF] rounded-lg "
            style={{ boxShadow: '0px 0px 4px 1px #136CFF' }}>
            <Image src={diamond} alt="" />
            <p className="text-white">Upgrade NOW</p>
          </Link>
        </div>

        <div className="flex gap-[10px]">
          {path === '/main' && (
            <>
              <Link
                href="/main/profile"
                className="flex items-center gap-x-[12px] p-[6px] bg-[#212121] rounded-[6px]">
                <Image src={tv} alt="Watch Framo tv" />
                Watch Framo TV
              </Link>
            </>
          )}

          {path === '/main/editor' && (
            <div className="arrows flex gap-x-[10px]">
              <button
                type="button"
                className="cursor-pointer flex items-center justify-center p-[2px] bg-[#212121] rounded-[6px]">
                <Image src={arrow} alt="" />
              </button>

              <button
                type="button"
                className="cursor-pointer flex items-center justify-center p-[2px] bg-[#212121] rounded-[6px]">
                <Image className="scale-x-[-1]" src={arrow} alt="" />
              </button>

              <button
                type="button"
                className="cursor-pointer gap-[12px] p-[6px] bg-[#212121] rounded-[6px] flex items-center">
                <Image src={save} alt="" />
                <p>Export Project</p>
              </button>
            </div>
          )}

          <Link
            href="/main/settings"
            className="flex items-center gap-x-[12px] p-[6px] bg-[#212121] rounded-[6px]">
            <Image src={notification} alt="notification" />
          </Link>
          <Link
            href=""
            target="_blank"
            className="flex items-center gap-x-[12px] p-[6px] bg-[#212121] rounded-[6px]">
            <Image src={diamond} alt="" />
            <p className="text-white">0% Daily Credits</p>
          </Link>

          <div className="cursor-pointer p-[6px] bg-[#212121] rounded-[6px] flex items-center justify-center">
            <Image className="w-full" src={avatar} alt="" />
          </div>
        </div>
      </div>
    </>
  );
}

export default Header;
