import Image from 'next/image';
import React from 'react';
import plus from '../../public/images/icons/plus.svg';
import column from '../../public/images/icons/report-columns.svg';
import chat from '../../public/images/icons/chat-alt.svg';
import settings from '../../public/images/icons/cog-sharp.svg';
import image from '../../public/images/chunk.png';

function SideBar() {
  return (
    <>
      <div className="w-[40%] rounded-[24px] bg-[#222222] px-[10px] flex gap-[10px] h-full">
        <div className="flex flex-col items-center py-[10px]">
          <button
            type="button"
            className="bg-[#171717] rounded-[12px] p-[14px] flex items-center justify-center">
            <Image src={plus} alt="" />
          </button>

          <div className="h-[3px] w-[18px] bg-[#171717] mt-[10px] rounded-lg"></div>

          <button
            type="button"
            className="mt-[10px] bg-[#171717] rounded-[12px] p-[14px] flex items-center justify-center shadow-[0_0_4px_0_rgba(255,255,255,0.25)]">
            <Image src={column} alt="" />
          </button>

          <button
            type="button"
            className="mt-[10px] bg-[#171717] rounded-[12px] p-[14px] flex items-center justify-center shadow-[0_0_4px_0_rgba(255,255,255,0.25)]">
            <Image src={chat} alt="" />
          </button>
        </div>

        <div className="h-[300px] w-[0.5px] mt-5 bg-[#979797]"></div>

        <div className="flex flex-col w-full">
          <div className="w-full flex items-center justify-center py-[8px] bg-[#171717] border border-[#979797] rounded-lg mt-[10px] gap-2">
            <Image src={settings} alt="" />
            <p>Analytics is completed</p>
          </div>

          <div className="flex flex-wrap justify-between mt-5 overflow-y-scroll ">
            {[...Array(25)].map((_, index) => (
              <Image
                className="mb-2"
                key={index}
                src={image}
                alt={`Image ${index + 1}`}
                width={100}
                height={100}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default SideBar;
