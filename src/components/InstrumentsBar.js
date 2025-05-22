import Image from 'next/image';
import React from 'react';
import stars from '../../public/images/icons/stars.svg';
import voice from '../../public/images/icons/voice.svg';
import text from '../../public/images/icons/text.svg';
import transition from '../../public/images/icons/transition-right.svg';
import music from '../../public/images/icons/music-add.svg';
import pencil from '../../public/images/icons/pencil.svg';

function InstrumentsBar() {
  return (
    <>
      <div className="bg-[#232322] rounded-xl flex flex-col items-center justify-start gap-2 p-[10px]">
        <button type="button" className="cursor-pointer">
          <Image src={stars} alt="" />
        </button>

        <button type="button" className="cursor-pointer">
          <Image src={text} alt="" />
        </button>

        <button type="button" className="cursor-pointer">
          <Image src={pencil} alt="" />
        </button>

        <button type="button" className="cursor-pointer">
          <Image src={transition} alt="" />
        </button>

        <button type="button" className="cursor-pointer">
          <Image src={voice} alt="" />
        </button>

        <button type="button" className="cursor-pointer">
          <Image src={music} alt="" />
        </button>

        <button type="button" className="cursor-pointer">
          <Image src={voice} alt="" />
        </button>
      </div>
    </>
  );
}

export default InstrumentsBar;
