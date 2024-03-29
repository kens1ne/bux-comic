import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import axios from "axios";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { AiFillInfoCircle, AiOutlineUnorderedList } from "react-icons/ai";

const getComicDetail = async (ComicId) => {
  const { data } = await axios.get(
    `${process.env.API_COMICS}/comics/${ComicId}`
  );
  return data;
};

export const getStaticProps = async ({ params }) => {
  const ComicId = params?.ComicId;
  const data = await getComicDetail(ComicId);

  return {
    props: {
      data,
    },
    revalidate: 60 * 1,
  };
};

const Index = (props) => {
  const title = props?.data.title;
  const thumbnail = props?.data.thumbnail;
  const description = props?.data.description;
  const categories = props?.data.genres;
  const authors = props?.data.authors;

  const [isDescriptionVisible, setDescriptionVisible] = useState(false);
  const maxShortDescriptionLength = 100;
  const shortDescription =
    description.slice(0, maxShortDescriptionLength) + "...";

  const toggleDescription = () => {
    setDescriptionVisible(!isDescriptionVisible);
  };

  const [chapters, setChapters] = useState();

  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await axios.get(
          `${process.env.NEXT_PUBLIC_API_COMICS}/comics/${props?.data.id}/chapters`
        );

        setChapters(data);
      } catch (error) {
        console.error("Error fetching data:", error.message);
        setChapters([]);
      }
    };
    if (title) {
      getData();
    }
  }, [title]);

  const finalTitle = title + " - Read Manhwa, Adult Manhwa, Manhwaco.Com";
  return (
    <>
      <Head>
        <title>{finalTitle}</title>
        <meta
          name="description"
          content={shortDescription.replace(/(<([^>]+)>)/gi, "")}
        />
        <meta property="og:title" content={finalTitle} />
        <meta
          property="og:description"
          content={shortDescription.replace(/(<([^>]+)>)/gi, "")}
        />
        <meta
          property="og:url"
          content={`https://manhwaco.com/comic/${props?.data?.id}`}
        />
        <meta property="og:image" content={props.data.thumbnail} />
      </Head>
      <Header />
      <main className="bg-gray-200 pb-10">
        <div
          style={{
            backgroundImage: `url(${props.data.thumbnail})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
          }}
          className="overlay"
        >
          <div className="relative backdrop-blur-xl px-2 py-3 rounded-lg z-10">
            <div className="max-w-7xl mx-auto px-2 py-3 rounded-md">
              <div className="sm:grid sm:grid-cols-6 gap-6 md:p-4 md:border-white">
                <div className="aspect-[2/3] mx-auto w-[50%] sm:w-full rounded overflow-hidden relative sm:col-span-1">
                  <img
                    src={thumbnail}
                    alt={title}
                    className="hover:drop-shadow-lg rounded"
                  />
                </div>
                <div className="sm:col-span-4 mt-2">
                  <h2 className="text-white font-bold text-xl line-clamp-3 sm:line-clamp-2 lg:text-4xl overflow-hidden text-center sm:text-left">
                    {title}
                  </h2>
                  <h3>
                    <span className="font-medium text-white">
                      Author: {authors}
                    </span>
                  </h3>
                  <div className="categories">
                    {categories.map((category) => {
                      return (
                        <Link
                          href={`/genres/${category.id}`}
                          key={category.id}
                          className="tag px-2 py-1 mr-1 bg-rose-700 text-white uppercase rounded inline-block"
                        >
                          {category.name}
                        </Link>
                      );
                    })}
                  </div>
                  <div className="flex items-center gap-3 mt-5 font-bold">
                    <Link
                      href={`/comic/${props.data.id}/${
                        chapters ? chapters?.[chapters.length - 1]?.id : ""
                      }`}
                      className="flex items-center gap-1 bg-red-500 shadow-lg shadow-red-500/50 hover:bg-red-500/70 rounded text-white text-lg px-6 py-2"
                    >
                      Read First
                    </Link>
                    <Link
                      href={`/comic/${props.data.id}/${
                        chapters ? chapters?.[0]?.id : ""
                      }`}
                      className="flex items-center gap-1 rounded border-red-500 border-[1px] text-lg px-6 py-2 text-red-500 hover:text-white"
                    >
                      Read Last
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4">
          <div className="summary px-4 pb-5 pt-2 bg-white rounded-lg my-5">
            <h2 className="flex items-center text-lg font-medium hover:text-red-500 cursor-pointer">
              <AiFillInfoCircle className="mr-1" /> Summary
            </h2>
            <div>
              <p className="my-2">
                {isDescriptionVisible ? description : shortDescription}
              </p>
              {description.length > maxShortDescriptionLength && (
                <span
                  className="text-sm underline cursor-pointer"
                  onClick={toggleDescription}
                >
                  {isDescriptionVisible ? "Hide" : "View more"}
                </span>
              )}
            </div>
          </div>
          <div className="chapters px-4 pb-5 pt-2 bg-white rounded-lg">
            <h2 className="flex items-center text-lg my-2 font-medium hover:text-red-500 cursor-pointer">
              <AiOutlineUnorderedList className="mr-1" /> Latest manga releases:
            </h2>
            <div className="max-h-[450px] overflow-y-scroll">
              <ul className="divide-y divide-gray-200">
                {chapters?.map((chapter) => (
                  <li key={chapter.id}>
                    <Link
                      href={`/comic/${props.data.id}/${chapter.id}`}
                      className="block py-2 bg-white px-2 hover:border-l-2 border-red-500 hover:bg-rose-500/10 hover:text-rose-700"
                    >
                      {chapter.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: "blocking",
  };
}

export default Index;
