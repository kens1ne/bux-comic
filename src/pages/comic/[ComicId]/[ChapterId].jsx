import { virtualArray } from "@/utils/VirtualArray";
import axios from "axios";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import {
  AiFillHome,
  AiFillInfoCircle,
  AiOutlineLeft,
  AiOutlineRight,
} from "react-icons/ai";

const Chapter = () => {
  const router = useRouter();
  const { ComicId, ChapterId } = router.query;
  const [title, setTitle] = useState("Chapters");
  const [isFetching, setIsFetching] = useState();
  const [data, setData] = useState();
  const [showToolbars, setShowToolbars] = useState(false);
  const [showChapters, setShowChapters] = useState(false);
  const chaptersListRef = useRef(null);

  const currentChapterIndex = data?.chapters?.findIndex(
    (chapter) => chapter.id === ChapterId
  );
  useEffect(() => {
    setIsFetching(true);
    setShowToolbars(false);
    const getData = async () => {
      try {
        const { data } = await axios.get(
          `${process.env.NEXT_PUBLIC_API_COMICS}/comics/${ComicId}/chapters/${ChapterId}`
        );
        setData(data);
        setTitle(
          data.comic_name +
            " - " +
            data.chapter_name +
            " - " +
            "Read Manhwa 18+, ManhwaCo.Com"
        );
        setShowToolbars(true);
        data.images.unshift({ src: "/start.jpg" });
        data.images.push({ src: "/end.jpg" });
      } catch (error) {
        setData({});
      }
      setIsFetching(false);
    };
    if (ComicId && ChapterId) {
      getData();
    }
  }, [ComicId, ChapterId]);

  const handleShowToolBars = () => {
    setShowToolbars(!showToolbars);
  };

  const handleElementClick = (e) => {
    e.stopPropagation();
  };

  const handleShowChapters = () => {
    setShowChapters(!showChapters);
    if (!showChapters && chaptersListRef.current) {
      // Check if the chapters list container exists and it's being shown
      // Scroll to the currently selected chapter
      const selectedChapterElement =
        chaptersListRef.current.querySelector(".font-bold");
      if (selectedChapterElement) {
        selectedChapterElement.scrollIntoView({
          behavior: "smooth",
          block: "nearest",
        });
      }
    }
  };
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta
          name="description"
          content="Read Free Online Manhwa, Manhwa 18, Hentai Comics, Webtoon Hentai, Manhua Hentai, Manga Hentai, Adult Manhwa, Hentai Webtoon, Manhwaco. Along with brand new series! Updated Daily!"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main className="bg-zinc-900 min-h-screen">
        <div className="flex flex-col max-w-2xl mx-auto">
          {isFetching
            ? virtualArray(10).map((item, index) => {
                return (
                  <div
                    className="w-full animate-pulse flex-row items-center justify-center space-x-1 rounded-xl"
                    key={index}
                  >
                    <div
                      data-placeholder
                      className="h-52 w-full overflow-hidden relative bg-gray-200"
                    ></div>
                  </div>
                );
              })
            : data?.images?.map((item, index) => {
                return (
                  <div key={item.page}>
                    <img
                      src={item.src}
                      alt={data.chapter_name}
                      className="image-source w-full"
                    />
                  </div>
                );
              })}
        </div>
        <div className="fixed inset-0" onClick={handleShowToolBars}>
          <div
            className={`select-none top-0 inset-x-0 bg-[rgba(0,0,0,0.9)] py-3 px-2 text-gray-300 font-semibold duration-200 ${
              showToolbars
                ? "translate-y-0 opacity-1"
                : "-translate-y-full opacity-0"
            }`}
            onClick={handleElementClick}
          >
            <div className="flex items-center justify-center">
              <Link href="/">
                <AiFillHome />
              </Link>
              <AiOutlineRight />
              <Link href={`/comic/${ComicId}/`} className="comic-name">
                {data?.comic_name}
              </Link>
              <AiOutlineRight />
              <Link className="comic-name" href={`#`}>
                {data?.chapter_name}
              </Link>
            </div>
          </div>
          {showToolbars && (
            <div
              className={`select-none absolute py-2 px-2 bottom-0 inset-x-0 bg-[rgba(0,0,0,0.75)] text-gray-400 text-sm font-semibold duration-300 ${
                showToolbars
                  ? "translate-y-0 opacity-1"
                  : "translate-y-full opacity-0"
              }`}
              onClick={handleElementClick}
            >
              <div className="max-w-2xl mx-auto">
                <div className="flex items-center justify-between gap-3">
                  {data.chapters?.length - currentChapterIndex === 1 ? (
                    <div></div>
                  ) : (
                    <button
                      className="p-2 bg-red-500 text-white rounded"
                      title="Previous"
                    >
                      <Link
                        href={`/comic/${ComicId}/${
                          data?.chapters?.[currentChapterIndex + 1]?.id
                        }`}
                      >
                        <AiOutlineLeft />
                      </Link>
                    </button>
                  )}

                  <div className="flex items-center">
                    <Link href={`/comic/${ComicId}/`}>
                      <button className="p-2 bg-cyan-500 text-white rounded mr-1">
                        <AiFillInfoCircle size={18} />
                      </button>
                    </Link>
                    <button
                      className="p-2 bg-red-500 text-white rounded"
                      onClick={handleShowChapters}
                    >
                      <div
                        className={`z-10 absolute bg-zinc-900 w-60 py-3 rounded bottom-[53px] text-white text-left duration-200 origin-bottom scale-100 left-1/2 transform -translate-x-1/2 ${
                          showChapters ? "scale-100" : "scale-[0.001]"
                        }`}
                      >
                        <h5 className="text-lg px-4 pb-1">All Chapters</h5>
                        <ul
                          className="overflow-auto text-sm h-max max-h-72 font-normal"
                          ref={chaptersListRef}
                        >
                          {data?.chapters?.map((chapter, index) => {
                            return (
                              <li key={chapter.id}>
                                <Link
                                  href={`/comic/${ComicId}/${chapter.id}`}
                                  className={`py-2 block truncate px-5 duration-100 hover:text-red-500 ${
                                    chapter.id == ChapterId
                                      ? "text-red-500 font-bold"
                                      : ""
                                  }`}
                                  onClick={() => setShowToolbars(false)}
                                >
                                  {chapter.name}
                                </Link>
                              </li>
                            );
                          })}
                        </ul>
                      </div>

                      {data?.chapter_name}
                    </button>
                  </div>
                  {currentChapterIndex === 0 ? (
                    <div></div>
                  ) : (
                    <Link
                      href={`/comic/${ComicId}/${
                        data?.chapters?.[currentChapterIndex - 1]?.id
                      }`}
                    >
                      <button
                        className="p-2 bg-red-500 text-white rounded"
                        title="Next"
                      >
                        <AiOutlineRight />
                      </button>
                    </Link>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </>
  );
};

export default Chapter;
