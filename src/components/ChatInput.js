'use client';

import { useChat } from '@/app/context/ChatContext';
import api from '@/lib/axios';
import { faChevronRight, faCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Cookies from 'js-cookie';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useRef, useState } from 'react';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import arrowTop from '../../public/images/icons/arrow-top.svg';
import aspectRatio169 from '../../public/images/icons/aspect-ratio-169.svg';
import aspectRatio23 from '../../public/images/icons/aspect-ratio-23.svg';
import aspectRatio32 from '../../public/images/icons/aspect-ratio-32.svg';
import {
  default as aspectRatio916,
  default as aspectRatioAuto,
} from '../../public/images/icons/aspect-ratio-916.svg';
import cate from '../../public/images/icons/category-2.svg';
import chat from '../../public/images/icons/chat-left-text.svg';
import card from '../../public/images/icons/credit-card-2-front.svg';
import diamond from '../../public/images/icons/diamond.svg';
import durationIcon from '../../public/images/icons/duration.svg';
import lang from '../../public/images/icons/language.svg';
import loader from '../../public/images/icons/loader.svg';
import stop from '../../public/images/icons/stop-circle.svg';
import upload from '../../public/images/icons/upload.svg';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

function ChatInput() {
  const { setServerResponse, addMessage } = useChat();
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

  const fileInputRef = useRef(null);
  const [files, setFiles] = useState({ videos: [], audios: [] });

  const [previews, setPreviews] = useState([]);
  const pathname = usePathname();
  const [projectId, setProjectId] = useState(null);

  const [videoUrl, setVideoUrl] = useState('');

  const [isLoading, setIsLoading] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const MySwal = withReactContent(Swal);

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    const newVideos = selectedFiles.filter((file) =>
      file.type.startsWith('video/')
    );
    const newAudios = selectedFiles.filter((file) =>
      file.type.startsWith('audio/')
    );

    // Обновим стейт с видео и аудио
    setFiles({
      videos: [...files.videos, ...newVideos],
      audios: [...files.audios, ...newAudios],
    });

    // Превью для видео
    const newPreviews = newVideos.map((file) => URL.createObjectURL(file));
    setPreviews((prevPreviews) => [...prevPreviews, ...newPreviews]);
  };

  const handleSubmit = async () => {
    const accessToken = Cookies.get('access_token');
    setIsLoading(true);

    if (files.videos.length === 0) {
      MySwal.fire({
        position: 'top-end',
        title: 'Please, select at least one video.',
        icon: 'error',
        showConfirmButton: false,
      });
      setIsLoading(false);
      return;
    }

    try {
      // Step 1: Create project
      const projectRes = await api.post('projects/', { name: 'newchat' });
      const projectId = projectRes.data.id;
      setProjectId(projectId);
      console.log('Создан проект:', projectId);

      // Step 2: Upload files and get IDs
      setIsUploading(true);
      const formData = new FormData();
      formData.append('project_id', projectId);

      // Добавляем видео и аудио в форму
      files.videos.forEach((file) => formData.append('videos', file));
      files.audios.forEach((file) => formData.append('audios', file));

      const uploadRes = await api.post('upload/', formData);
      console.log('Загрузка завершена:', uploadRes.data);
      setIsUploading(false);

      // Step 3: Send video IDs for analysis
      setIsAnalyzing(true);
      const describeRes = await api.post('upload/describe/', {
        videos: uploadRes.data.videos,
      });
      console.log('Анализ запрошен:', describeRes.data);

      // Step 4: Poll for completion status
      let projectDetails = null;

      await new Promise((resolve, reject) => {
        const pollProject = async () => {
          try {
            const response = await api.get(`projects/${projectId}/`);
            projectDetails = response.data;
            console.log('Текущее состояние проекта:', projectDetails);

            if (
              projectDetails.uploads.length > 0 &&
              projectDetails.uploads[0].status === 'completed'
            ) {
              console.log('Проект готов:', projectDetails);
              resolve();
            } else {
              setTimeout(pollProject, 3000);
            }
          } catch (err) {
            console.error('Ошибка при опросе проекта:', err);
            setTimeout(pollProject, 5000);
          }
        };

        pollProject();
      });

      setIsAnalyzing(false);
      setFiles({ videos: [], audios: [] });
      setPreviews([]);
      setServerResponse(projectDetails);

      addMessage({
        type: 'response',
        data: projectDetails,
        timestamp: new Date().toISOString(),
      });
    } catch (error) {
      console.error('Ошибка при обработке:', error);
      setIsUploading(false);
      setIsAnalyzing(false);
    } finally {
      setIsLoading(false);
    }
  };

  const pollResult = async (projectId) => {
    setIsLoading(true);

    const poll = async (resolve) => {
      try {
        const response = await api.get(`projects/${projectId}/results/status/`);
        const results = response.data;
        console.log('Ответ на статус запроса:', results);

        const lastResult = results.find((item) => item.is_last);

        if (lastResult && lastResult.status === 'completed') {
          const downloadUrl = lastResult.result?.output_file;
          console.log('Результат готов:', lastResult);

          if (downloadUrl) {
            setVideoUrl(downloadUrl);
          }

          addMessage({
            type: 'response',
            data: lastResult,
            timestamp: new Date().toISOString(),
          });

          setIsLoading(false);
          resolve();
        } else {
          setTimeout(() => poll(resolve), 3000);
        }
      } catch (err) {
        console.error('Ошибка при опросе результата:', err);
        setTimeout(() => poll(resolve), 5000);
      }
    };

    return new Promise(poll);
  };

  const [prompt, setPrompt] = useState('');

  const handlePromptSubmit = async () => {
    setIsLoading(true);
    if (!projectId) {
      MySwal.fire({
        title: 'Upload the video first',
        icon: 'warning',
        confirmButtonText: 'Ок',
      });
      return;
    }

    if (!prompt) return;

    try {
      addMessage({
        type: 'user',
        prompt,
        timestamp: new Date().toISOString(),
      });

      await api.post(`projects/${projectId}/results/request/`, { prompt });
      setIsLoading(false);
      setPrompt('');
      console.log('Запрос на генерацию результата отправлен');

      await pollResult(projectId);
    } catch (err) {
      console.error('Ошибка при отправке prompt:', err);
    }
  };

  const handleUnifiedSubmit = () => {
    setIsLoading(true);

    if (files.videos.length > 0 || files.audios.length > 0) {
      handleSubmit();
    } else if (prompt.trim() !== '') {
      if (!projectId) {
        MySwal.fire({
          title: 'Сначала загрузите видео',
          icon: 'warning',
          confirmButtonText: 'Ок',
        });
        setIsLoading(false);
        return;
      }

      handlePromptSubmit();
    } else {
      MySwal.fire({
        title: 'Пожалуйста, загрузите видео или введите запрос',
        icon: 'warning',
        confirmButtonText: 'Ок',
      });
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="w-full bg-[#1E1E1E] rounded-[24px] px-[8px] pb-[8px] flex flex-col">
        <div className="flex items-center py-[16px] gap-[12px]">
          <div
            className="cursor-pointer"
            onClick={() => fileInputRef.current.click()}>
            <Image src={upload} alt="Upload video" />
          </div>

          <input
            type="text"
            value={prompt}
            placeholder="Upload your footage to start editing..."
            className="text-[#A1A3A4] w-full bg-transparent outline-none py-2"
            disabled={isLoading}
            onChange={(e) => setPrompt(e.target.value)}
          />

          <input
            ref={fileInputRef}
            type="file"
            accept="video/*,audio/*"
            className="hidden"
            multiple
            onChange={handleFileChange}
          />
        </div>

        <div className="flex gap-2 w-full overflow-x-auto">
          {previews.map((preview, index) => (
            <div
              key={index}
              className="relative mb-4 w-[200px] h-[112px] rounded overflow-hidden">
              {isLoading && (
                <div className="absolute inset-0 bg-transparent bg-opacity-50 flex items-center justify-center z-10">
                  <Image
                    src={loader}
                    alt=""
                    className="animate-spin w-8 h-8 bg-black rounded-full"
                  />
                </div>
              )}
              <video
                src={preview}
                controls={false}
                width={200}
                className="rounded pointer-events-none"
              />
              <p className="mt-1 text-sm text-gray-600">{files[index]?.name}</p>
            </div>
          ))}
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

            <div className="relative bg-[#33383A] rounded-xl flex items-center justify-between">
              <Link
                className={`px-3 gap-2 w-full h-full flex items-center justify-center rounded-xl ${
                  pathname === '/main'
                    ? 'border border-[#31535B] bg-[#136CFF]'
                    : ''
                }`}
                href="/main">
                <Image src={chat} alt="" />
                Chat
              </Link>

              <Link
                className={`px-3 gap-2 w-full h-full flex items-center justify-center rounded-xl ${
                  pathname === '/main/editor'
                    ? 'border border-[#31535B] bg-[#136CFF]'
                    : ''
                }`}
                href="/main/editor">
                <Image src={card} alt="" />
                Editor
              </Link>
            </div>
          </div>

          <button
            type="submit"
            onClick={handleUnifiedSubmit}
            disabled={isLoading}
            className="cursor-pointer rounded-full p-[10px] bg-[#2B2B2B]">
            {!isLoading ? (
              <Image src={arrowTop} alt="Submit" />
            ) : (
              <Image className="animate-spin" src={loader} alt="Loading..." />
            )}
          </button>
        </div>
      </div>
    </>
  );
}

export default ChatInput;
