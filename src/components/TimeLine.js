import React from 'react';
import Image from 'next/image';
import lock from '../../public/images/icons/locked.svg';
import eye from '../../public/images/icons/eye.svg';
import sound from '../../public/images/icons/sound-high.svg';

function TimeLine() {
  return (
    <>
      <div className="w-full h-[216px] mt-[24px] relative flex flex-wrap justify-between">
        <div className="w-[8%] bg-[#272727] h-[216px] fixed overflow-hidden z-50">
          <div className="flex flex-col py-[42px] items-center justify-around gap-[26px]">
            <div className="flex items-center justify-around gap-[10px] py-[2px] rounded bg-[#202023] mx-[12px] px-[9px]">
              <button
                type="button"
                className="p-[2px] rounded-full bg-[#353538]">
                <Image src={lock} alt="" />
              </button>
              <button
                type="button"
                className="p-[2px] rounded-full bg-[#353538]">
                <Image src={eye} alt="" />
              </button>
              <button
                type="button"
                className="p-[2px] rounded-full bg-[#353538]">
                <Image src={sound} alt="" />
              </button>
            </div>

            <div className="flex items-center justify-around gap-[10px] py-[2px] rounded bg-[#202023] mx-[12px] px-[9px]">
              <button
                type="button"
                className="p-[2px] rounded-full bg-[#353538]">
                <Image src={lock} alt="" />
              </button>
              <button
                type="button"
                className="p-[2px] rounded-full bg-[#353538]">
                <Image src={eye} alt="" />
              </button>
              <button
                type="button"
                className="p-[2px] rounded-full bg-[#353538]">
                <Image src={sound} alt="" />
              </button>
            </div>

            <div className="flex items-center justify-around gap-[10px] py-[2px] rounded bg-[#202023] mx-[12px] px-[9px]">
              <button
                type="button"
                className="p-[2px] rounded-full bg-[#353538]">
                <Image src={lock} alt="" />
              </button>
              <button
                type="button"
                className="p-[2px] rounded-full bg-[#353538]">
                <Image src={eye} alt="" />
              </button>
              <button
                type="button"
                className="p-[2px] rounded-full bg-[#353538]">
                <Image src={sound} alt="" />
              </button>
            </div>
          </div>
        </div>
        <div className="w-[92%] flex flex-col absolute right-0 h-full">
          <div className="w-full flex bg-[#1A1A1A]">
            {Array.from({ length: 16 }).map((_, index) => (
              <div
                key={index}
                className="flex-1 px-[10px] py-[5px] border-r border-[#272727]">
                {index % 2 === 0 ? (
                  <p>{String(index / 2).padStart(2, '0')}</p>
                ) : null}
              </div>
            ))}
          </div>

          {Array.from({ length: 3 }).map((_, index) => (
            <div
              key={index}
              className="w-full bg-[#222222] h-[44px] mb-[2px]"></div>
          ))}

            <div className="w-full flex bg-[#1A1A1A]">
                {Array.from({ length: 16 }).map((_, index) => (
                <div
                    key={index}
                    className="flex-1 px-[10px] py-[5px] border-r border-[#272727]">
                    {index % 2 === 0 ? (
                    <p className="opacity-0">
                        {String(index / 2).padStart(2, '0')}
                    </p>
                    ) : null}
                </div>
                ))}
            </div>

          <div className="w-full flex bg-[#222222] flex-1"></div>
        </div>
      </div>
    </>
  );
}

export default TimeLine;
