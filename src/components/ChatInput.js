'use client';

import { useChatStore } from '@/app/store/chatStore';
import api from '@/lib/axios';
import { typeMessage } from '@/utils/typeMessage';
import axios from 'axios';
import { faChevronRight, faCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Cookies from 'js-cookie';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useRef, useState, useEffect } from 'react';
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
import music from '../../public/images/music.png';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

function ChatInput() {
  //   const { setServerResponse, addMessage } = useChat();
  const addMessage = useChatStore((state) => state.addMessage);
  const setServerResponse = useChatStore((state) => state.setServerResponse);
  const setWaitingForResponse = useChatStore((state) => state.setWaitingForResponse);
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
  const videoUrlRef = useRef(null);

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);

    const newVideos = selectedFiles.filter((file) =>
      file.type.startsWith('video/')
    );
    const newAudios = selectedFiles.filter((file) =>
      file.type.startsWith('audio/')
    );

    setFiles((prev) => ({
      videos: [...prev.videos, ...newVideos],
      audios: [...prev.audios, ...newAudios],
    }));

    const videoPreviews = newVideos.map((file) => ({
      type: 'video',
      src: URL.createObjectURL(file),
      name: file.name,
    }));

    const audioPreviews = newAudios.map((file) => ({
      type: 'audio',
      src: URL.createObjectURL(file),
      name: file.name,
      preview: music,
    }));

    setPreviews((prev) => {
      const updated = [...prev, ...videoPreviews, ...audioPreviews];
      console.log('Updated previews:', updated);
      return updated;
    });
  };

  const handleSubmit = async () => {
    const accessToken = Cookies.get('access_token');
    setIsUploading(true);

    try {
      // Шаг 1: Создаём проект
      const projectRes = await api.post('projects/', { name: 'newchat' });
      const projectId = projectRes.data.id;
      setProjectId(projectId);
      console.log('✅ Проект создан:', projectId);

      // Шаг 2: Загружаем файлы
      const formData = new FormData();
      formData.append('project_id', projectId);

      files.videos.forEach((file) => formData.append('videos', file));
      files.audios.forEach((file) => formData.append('audios', file));

      const uploadRes = await api.post('upload/', formData);
      console.log('✅ Загрузка завершена:', uploadRes.data);

      // Шаг 3: Получаем ссылку на видео
      const videoUrl = uploadRes.data.videos?.[0];
      if (videoUrl) {
        videoUrlRef.current = videoUrl;
        setVideoUrl(videoUrl);
        console.log('🎥 Ссылка на видео:', videoUrl);
      }
    } catch (error) {
      console.error('❌ Ошибка при отправке:', error);
    } finally {
      setIsUploading(false);
    }
  };

  // ЭТО ДЛЯ ОПИСАНИЕ ВИДЕО

  //   const handleSubmit = async () => {
  //     const accessToken = Cookies.get('access_token');
  //     setIsLoading(true);

  //     try {
  //       // Step 1: Create project
  //       const projectRes = await api.post('projects/', { name: 'newchat' });
  //       const projectId = projectRes.data.id;
  //       setProjectId(projectId);
  //       console.log('Создан проект:', projectId);

  //       // Step 2: Upload files and get IDs
  //       setIsUploading(true);
  //       const formData = new FormData();
  //       formData.append('project_id', projectId);

  //       // Добавляем видео и аудио в форму
  //       files.videos.forEach((file) => formData.append('videos', file));
  //       files.audios.forEach((file) => formData.append('audios', file));

  //       const uploadRes = await api.post('upload/', formData);
  //       console.log('Загрузка завершена:', uploadRes.data);
  //       const videoUrl = uploadRes.data.videos?.[0];
  //       if (videoUrl) {
  //         videoUrlRef.current = videoUrl; // Сохраняем временно
  //         console.log('🎥 Видео URL сохранён:', videoUrl);
  //       }
  //       setIsUploading(false);

  //       // Step 3: Send video IDs for analysis
  //       setIsAnalyzing(true);
  //       const describeRes = await api.post('upload/describe/', {
  //         videos: uploadRes.data.videos,
  //       });
  //       console.log('Анализ запрошен:', describeRes.data);

  //       // Step 4: Poll for completion status
  //       let projectDetails = null;

  //       await new Promise((resolve, reject) => {
  //         const pollProject = async () => {
  //           try {
  //             const response = await api.get(`projects/${projectId}/`);
  //             projectDetails = response.data;
  //             console.log('Текущее состояние проекта:', projectDetails);

  //             if (
  //               projectDetails.uploads.length > 0 &&
  //               projectDetails.uploads[0].status === 'completed'
  //             ) {
  //               console.log('Проект готов:', projectDetails);
  //               resolve();
  //             } else {
  //               setTimeout(pollProject, 3000);
  //             }
  //           } catch (err) {
  //             console.error('Ошибка при опросе проекта:', err);
  //             setTimeout(pollProject, 5000);
  //           }
  //         };

  //         pollProject();
  //       });

  //       setIsAnalyzing(false);
  //       setFiles({ videos: [], audios: [] });
  //       setPreviews([]);
  //       setServerResponse(projectDetails);

  //       addMessage({
  //         type: 'response',
  //         data: projectDetails,
  //         timestamp: new Date().toISOString(),
  //       });
  //     } catch (error) {
  //       console.error('Ошибка при обработке:', error);
  //       setIsUploading(false);
  //       setIsAnalyzing(false);
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   };

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
  const [messages, setMessages] = useState([]);
  const [sessionId, setSessionId] = useState(null);
  const [ws, setWs] = useState(null);
  const projectIdRef = useRef(null);
  const socketRef = useRef(null);

  const connectWebSocket = (session_id) => {
    const accessToken = Cookies.get('access_token');
    const ws = new WebSocket(
      `ws://91.147.104.166:8931/ws/${session_id}?authorization=${accessToken}`
    );
    socketRef.current = ws;

    ws.onopen = () => {
      console.log('✅ WebSocket подключен');
    };

    ws.onmessage = async (event) => {
      const messageData = JSON.parse(event.data);
      console.log('📩 Получено сообщение:', messageData);

      if (messageData.messages && Array.isArray(messageData.messages)) {
        for (const msg of messageData.messages) {
          const isAI = msg.type === 'message';

          if (isAI && msg.content) {
            await typeMessage(
              msg.content.replace(/@https?:\/\/[^@]+@/g, '').trim()
            );
          } else {
            addMessage({
              type: 'user',
              data: msg,
              timestamp: new Date().toISOString(),
            });
          }
        }
      } else if (messageData.type === 'message' && messageData.data?.content) {
        await typeMessage(
          messageData.data.content.replace(/@https?:\/\/[^@]+@/g, '').trim()
        );
      }
    };

    ws.onclose = () => {
      console.log('🔌 WebSocket закрыт');
    };

    ws.onerror = (err) => {
      console.error('❗ WebSocket ошибка:', err);
    };
  };

  const handlePromptSubmit = async (promptText = prompt) => {
    if (!promptText.trim()) return;

    setIsLoading(true);

    try {
      const accessToken = Cookies.get('access_token');

      // 🔥 Создание проекта при первом сообщении
      if (!projectIdRef.current) {
        const projectRes = await api.post('projects/', { name: 'newchat' });
        const createdId = projectRes.data.id;

        if (!createdId)
          throw new Error('Ошибка: не удалось получить project_id');

        const projectIdStr = String(createdId);
        projectIdRef.current = projectIdStr;
        setProjectId(projectIdStr);
      }

      const projectId = projectIdRef.current;

      if (files.videos.length > 0 || files.audios.length > 0) {
        const formData = new FormData();
        formData.append('project_id', projectId);
        files.videos.forEach((file) => formData.append('videos', file));
        files.audios.forEach((file) => formData.append('audios', file));

        const uploadRes = await api.post('upload/', formData);
        const videoUrl = uploadRes.data.videos?.[0];
        if (videoUrl) {
          videoUrlRef.current = videoUrl;
          setVideoUrl(videoUrl);
        }
      }

      const videoUrl = videoUrlRef.current;
      const fullPrompt = videoUrl ? `${promptText} @${videoUrl}@` : promptText;
      videoUrlRef.current = null;

      // Добавляем пользовательское сообщение
      addMessage({
        type: 'user',
        data: {
          content: fullPrompt.replace(/@https?:\/\/[^@]+@/g, '').trim(),
        },
        timestamp: new Date().toISOString(),
      });

      if (
        socketRef.current &&
        socketRef.current.readyState === WebSocket.OPEN
      ) {
        const wsPayload = {
          type: 'message',
          data: {
            content: fullPrompt,
          },
          session_id: sessionId,
        };
        socketRef.current.send(JSON.stringify(wsPayload));
        console.log('📨 Отправлено через WebSocket:', wsPayload);
      } else {
        const payload = {
          project_id: projectId,
          data: {
            content: fullPrompt,
          },
          ...(sessionId && { session_id: sessionId }),
        };

        const res = await axios.post(
          'http://91.147.104.166:8931/chat/message',
          payload,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        console.log('Ответ от /chat/message:', res.data);

        if (res.data.messages && Array.isArray(res.data.messages)) {
          for (const msg of res.data.messages) {
            const cleanedContent = msg.content
              ?.replace(/@https?:\/\/[^@]+@/g, '')
              .trim();

            if (msg.type === 'ai') {
              setWaitingForResponse(false);
              await typeMessage(cleanedContent);
            } else {
              addMessage({
                type: 'user',
                data: { ...msg, content: cleanedContent },
                timestamp: new Date().toISOString(),
              });
            }
          }
        }

        if (res.data.session_id && !sessionId) {
          setSessionId(res.data.session_id);
          connectWebSocket(res.data.session_id);
        }
      }

    } catch (err) {
      console.error('Ошибка при отправке prompt:', err);
      MySwal.fire({
        title: 'Ошибка при отправке сообщения',
        text: err.response?.data?.detail || 'Попробуйте ещё раз',
        icon: 'error',
      });
      setWaitingForResponse(false);
    } finally {
      setIsLoading(false);
    }
  };

  const handleUnifiedSubmit = async () => {
    console.log('handleUnifiedSubmit called');
    setIsLoading(true);
    setWaitingForResponse(true);
    console.log('setWaitingForResponse(true) called');

    // Сохраняем текст для отправки
    const currentPrompt = prompt;
    
    // Очищаем инпут сразу
    setPrompt('');

    try {
      // Сначала загрузка файлов, если они есть
      if (files.videos.length > 0 || files.audios.length > 0) {
        await handleSubmit();
      }

      // Затем отправка prompt, если он введён
      if (currentPrompt.trim() !== '') {
        await handlePromptSubmit(currentPrompt);
      }

      // Если ничего не ввели и не загрузили — предупреждение
      if (
        files.videos.length === 0 &&
        files.audios.length === 0 &&
        currentPrompt.trim() === ''
      ) {
        MySwal.fire({
          title: 'Пожалуйста, загрузите видео или введите запрос',
          icon: 'warning',
          confirmButtonText: 'Ок',
        });
      }

      // Очищаем файлы после отправки
      setFiles({ videos: [], audios: [] });
      setPreviews([]);
    } finally {
      setIsLoading(false);
    }
  };

  // Закрытие сокета при размонтировании компонента
  useEffect(() => {
    return () => {
      if (socketRef.current) {
        socketRef.current.close();
      }
    };
  }, []);

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
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleUnifiedSubmit();
              }
            }}
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

        {previews.length > 0 && (
          <div className="flex gap-3 w-full overflow-x-auto pb-3">
            {previews.map((item, index) => (
              <div
                key={index}
                className="relative group flex-shrink-0">
                {/* Основной контейнер */}
                <div className="relative w-[180px] h-[100px] rounded-xl overflow-hidden bg-gray-900 border border-gray-700 shadow-lg">
                  {/* Overlay с информацией */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <div className="absolute bottom-2 left-2 right-2">
                      <p className="text-white text-xs font-medium truncate">
                        {item.name}
                      </p>
                      <p className="text-gray-300 text-xs">
                        {item.type === 'video' ? '🎥 Video' : '🎵 Audio'}
                      </p>
                    </div>
                  </div>

                  {/* Кнопка удаления */}
                  <button
                    onClick={() => {
                      const newPreviews = previews.filter((_, i) => i !== index);
                      setPreviews(newPreviews);
                      
                      if (item.type === 'video') {
                        const newVideos = files.videos.filter((_, i) => i !== index);
                        setFiles(prev => ({ ...prev, videos: newVideos }));
                      } else {
                        const newAudios = files.audios.filter((_, i) => i !== index);
                        setFiles(prev => ({ ...prev, audios: newAudios }));
                      }
                    }}
                    className="absolute top-2 right-2 w-6 h-6 bg-red-500 hover:bg-red-600 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-200 z-10">
                    <span className="text-white text-xs">×</span>
                  </button>

                  {/* Индикатор загрузки */}
                  {isLoading && (
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-10">
                      <div className="bg-black/80 rounded-full p-2">
                        <Image
                          src={loader}
                          alt=""
                          className="animate-spin w-6 h-6"
                        />
                      </div>
                    </div>
                  )}

                  {/* Контент */}
                  {item.type === 'video' ? (
                    <video
                      src={item.src}
                      controls={false}
                      className="w-full h-full object-cover"
                      onMouseEnter={(e) => e.target.play()}
                      onMouseLeave={(e) => {
                        e.target.pause();
                        e.target.currentTime = 0;
                      }}
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-purple-900 to-blue-900">
                      <div className="text-center">
                        <Image
                          src={item.preview}
                          alt="Audio preview"
                          className="w-10 h-10 mx-auto mb-1"
                        />
                        <p className="text-white text-xs font-medium truncate px-2">
                          {item.name}
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Иконка типа файла */}
                  <div className="absolute top-2 left-2 bg-black/50 rounded-lg px-2 py-1">
                    <span className="text-white text-xs">
                      {item.type === 'video' ? '🎥' : '🎵'}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

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
