'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircle, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import upload from '../../public/images/icons/upload.svg';
import diamond from '../../public/images/icons/diamond.svg';
import durationIcon from '../../public/images/icons/duration.svg';
import lang from '../../public/images/icons/language.svg';
import cate from '../../public/images/icons/category-2.svg';
import aspectRatio916 from '../../public/images/icons/aspect-ratio-916.svg';
import aspectRatio169 from '../../public/images/icons/aspect-ratio-169.svg';
import aspectRatio23 from '../../public/images/icons/aspect-ratio-23.svg';
import aspectRatio32 from '../../public/images/icons/aspect-ratio-32.svg';
import aspectRatioAuto from '../../public/images/icons/aspect-ratio-916.svg';
import arrowTop from '../../public/images/icons/arrow-top.svg';

function ChatInput() {
  const aspectRatios = [
    { value: '9:16', icon: aspectRatio916 },
    { value: '16:9', icon: aspectRatio169 },
    { value: '2:3', icon: aspectRatio23 },
    { value: '3:2', icon: aspectRatio32 },
    { value: 'auto', icon: aspectRatioAuto },
  ];
  const resolutions = ['480p', '720p', '1080p', '1440p'];
  const durations = ['15', '30', '45', '60'];
  const languages = ['Russian', 'English', 'Kazakh'];
  const categories = ['Comedy', 'Music', 'Gaming', 'Sports', 'Education'];

  const [isAspectRatioOpen, setIsAspectRatioOpen] = useState(false);
  const [selectedAspectRatio, setSelectedAspectRatio] = useState('auto');
  const [isResolutionOpen, setIsResolutionOpen] = useState(false);
  const [selectedResolution, setSelectedResolution] = useState('1080p');
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('English');

  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('Auto');

  const [isDurationOpen, setIsDurationOpen] = useState(false);
  const [selectedDuration, setSelectedDuration] = useState('30');
  return (
    <>
      <div className="w-full bg-[#1E1E1E] rounded-[24px] px-[8px] pb-[8px] flex flex-col">
        <div className="flex items-center py-[16px] gap-[12px]">
          <Image src={upload} alt="" />
          <input
            className="text-[#A1A3A4] w-full bg-transparent outline-none"
            placeholder="Upload your footage to start editing..."
          />
        </div>

        <div className="flex items-center justify-between">
          <div className="flex gap-[8px]">
            <div className="relative">
              <div
                onClick={() => setIsAspectRatioOpen(!isAspectRatioOpen)}
                className="p-[10px] bg-[#33383A] rounded-[20px] text-white w-full cursor-pointer flex items-center justify-between">
                <div className="flex items-center">
                  <Image
                    src={
                      aspectRatios.find(
                        (ratio) => ratio.value === selectedAspectRatio
                      )?.icon
                    }
                    alt={selectedAspectRatio}
                    width={20}
                    height={20}
                    className="mr-2"
                  />
                  <span>{selectedAspectRatio}</span>
                </div>
              </div>
              {isAspectRatioOpen && (
                <div className="absolute w-32 bottom-full mb-2 bg-[#232529] rounded-lg overflow-hidden z-50">
                  {aspectRatios.map((ratio) => (
                    <div
                      key={ratio.value}
                      onClick={() => {
                        setSelectedAspectRatio(ratio.value);
                        setIsAspectRatioOpen(false);
                      }}
                      className={`flex items-center justify-between px-4 py-2 cursor-pointer hover:bg-[#2C2E33] ${
                        selectedAspectRatio === ratio.value
                          ? 'bg-[#2C2E33]'
                          : ''
                      }`}>
                      <div className="flex items-center gap-2">
                        <Image
                          src={ratio.icon}
                          alt={ratio.value}
                          width={20}
                          height={20}
                          className="mr-2"
                        />
                        <span className="text-white">{ratio.value}</span>
                      </div>

                      {selectedAspectRatio === ratio.value ? (
                        <FontAwesomeIcon
                          className="text-white text-[8px]"
                          icon={faCircle}
                        />
                      ) : (
                        <FontAwesomeIcon
                          className="text-white text-[12px]"
                          icon={faChevronRight}
                        />
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="relative">
              <div
                onClick={() => setIsResolutionOpen(!isResolutionOpen)}
                className="p-[10px] bg-[#33383A] rounded-[20px] text-white w-full cursor-pointer flex items-center justify-between">
                <div className="flex items-center">
                  <Image
                    src={diamond}
                    alt="resolution"
                    width={20}
                    height={20}
                    className="mr-2"
                  />
                  <span>{selectedResolution}</span>
                </div>
              </div>
              {isResolutionOpen && (
                <div className="absolute w-32 bottom-full mb-2 bg-[#232529] rounded-lg overflow-hidden z-50">
                  {resolutions.map((resolution) => (
                    <div
                      key={resolution}
                      onClick={() => {
                        setSelectedResolution(resolution);
                        setIsResolutionOpen(false);
                      }}
                      className={`flex items-center justify-between px-4 py-2 cursor-pointer hover:bg-[#2C2E33] ${
                        selectedResolution === resolution ? 'bg-[#2C2E33]' : ''
                      }`}>
                      <div className="flex items-center gap-2">
                        <Image
                          src={diamond}
                          alt={resolution}
                          width={20}
                          height={20}
                          className="mr-2"
                        />
                        <span className="text-white">{resolution}</span>
                      </div>

                      {selectedResolution === resolution ? (
                        <FontAwesomeIcon
                          className="text-white text-[8px]"
                          icon={faCircle}
                        />
                      ) : (
                        <FontAwesomeIcon
                          className="text-white text-[12px]"
                          icon={faChevronRight}
                        />
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="relative">
              <div
                onClick={() => setIsLanguageOpen(!isLanguageOpen)}
                className="p-[10px] bg-[#33383A] rounded-[20px] text-white w-full cursor-pointer flex items-center justify-between">
                <div className="flex items-center">
                  <Image
                    src={lang}
                    alt="resolution"
                    width={20}
                    height={20}
                    className="mr-2"
                  />
                  <span>{selectedLanguage}</span>
                </div>
              </div>
              {isLanguageOpen && (
                <div className="absolute w-40 bottom-full mb-2 bg-[#232529] rounded-lg overflow-hidden z-50">
                  {languages.map((language) => (
                    <div
                      key={language}
                      onClick={() => {
                        setSelectedLanguage(language);
                        setIsLanguageOpen(false);
                      }}
                      className={`flex items-center justify-between px-4 py-2 cursor-pointer hover:bg-[#2C2E33] ${
                        selectedLanguage === language ? 'bg-[#2C2E33]' : ''
                      }`}>
                      <div className="flex items-center gap-2">
                        <Image
                          src={lang}
                          alt={language}
                          width={20}
                          height={20}
                          className="mr-2"
                        />
                        <span className="text-white">{language}</span>
                      </div>

                      {selectedLanguage === language ? (
                        <FontAwesomeIcon
                          className="text-white text-[8px]"
                          icon={faCircle}
                        />
                      ) : (
                        <FontAwesomeIcon
                          className="text-white text-[12px]"
                          icon={faChevronRight}
                        />
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="relative">
              <div
                onClick={() => setIsCategoryOpen(!isCategoryOpen)}
                className="p-[10px] bg-[#33383A] rounded-[20px] text-white w-full cursor-pointer flex items-center justify-between">
                <div className="flex items-center">
                  <Image
                    src={cate}
                    alt="resolution"
                    width={20}
                    height={20}
                    className="mr-2"
                  />
                  <span>{selectedCategory}</span>
                </div>
              </div>
              {isCategoryOpen && (
                <div className="absolute w-40 bottom-full mb-2 bg-[#232529] rounded-lg overflow-hidden z-50">
                  {categories.map((category) => (
                    <div
                      key={category}
                      onClick={() => {
                        setSelectedCategory(category);
                        setIsCategoryOpen(false);
                      }}
                      className={`flex items-center justify-between px-4 py-2 cursor-pointer hover:bg-[#2C2E33] ${
                        selectedCategory === category ? 'bg-[#2C2E33]' : ''
                      }`}>
                      <div className="flex items-center gap-2">
                        <Image
                          src={cate}
                          alt={cate}
                          width={20}
                          height={20}
                          className="mr-2"
                        />
                        <span className="text-white">{category}</span>
                      </div>

                      {selectedCategory === category ? (
                        <FontAwesomeIcon
                          className="text-white text-[8px]"
                          icon={faCircle}
                        />
                      ) : (
                        <FontAwesomeIcon
                          className="text-white text-[12px]"
                          icon={faChevronRight}
                        />
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="relative">
              <div
                onClick={() => setIsDurationOpen(!isDurationOpen)}
                className="p-[10px] bg-[#33383A] rounded-[20px] text-white w-full cursor-pointer flex items-center justify-between">
                <div className="flex items-center">
                  <Image
                    src={durationIcon}
                    alt="duration"
                    width={20}
                    height={20}
                    className="mr-2"
                  />
                  <span>{selectedDuration} minutes</span>
                </div>
              </div>
              {isDurationOpen && (
                <div className="absolute w-64 bottom-full mb-2 bg-[#232529] rounded-lg overflow-hidden z-50">
                  {durations.map((duration) => (
                    <div
                      key={duration}
                      onClick={() => {
                        setSelectedDuration(duration);
                        setIsDurationOpen(false);
                      }}
                      className={`flex items-center justify-between px-4 py-2 cursor-pointer hover:bg-[#2C2E33] ${
                        selectedDuration === duration ? 'bg-[#2C2E33]' : ''
                      }`}>
                      <div className="flex items-center gap-2">
                        <Image
                          src={durationIcon}
                          alt={duration}
                          width={20}
                          height={20}
                          className="mr-2"
                        />
                        <span className="text-white">{duration} minutes</span>
                      </div>

                      {selectedDuration === duration ? (
                        <FontAwesomeIcon
                          className="text-white text-[8px]"
                          icon={faCircle}
                        />
                      ) : (
                        <FontAwesomeIcon
                          className="text-white text-[12px]"
                          icon={faChevronRight}
                        />
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <button
            type="submit"
            className="cursor-pointer rounded-full p-[10px] bg-[#2B2B2B]">
            <Image src={arrowTop} alt="" />
          </button>
        </div>
      </div>
    </>
  );
}

export default ChatInput;
