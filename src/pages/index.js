import Head from "next/head";
import Image from "next/image";
import Header from "@/components/layout/Header";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper";
import "swiper/css";
import Features from "@/components/Features";
import axios from "axios";
import Comic from "@/components/ComicCard";
import Link from "next/link";
import { AiOutlineArrowRight } from "react-icons/ai";
import { useState } from "react";
import { virtualArray } from "@/utils/VirtualArray";
import Pagination from "@/components/Pagination";
import Footer from "@/components/layout/Footer";

const getAllPosts = async () => {
  return await fetch(`https://api.manhwaco.com/latest`)
    .then((res) => res.json())
    .then((res) => res);
};

export const getStaticProps = async () => {
  const { comics: comics, total_pages: totalPages } = await getAllPosts();

  const featurePosts = comics.slice(0, 5);

  return {
    props: {
      comics,
      featurePosts,
      totalPages,
    },
    revalidate: 60 * 5,
  };
};

export default function Home(props) {
  const featurePosts = props.featurePosts;
  const comics = props.comics;
  const totalPages = props.totalPages;

  return (
    <>
      <Head>
        <link rel="canonical" href="https://manhwaco.com/" />
        <meta property="og:locale" content="en_US" />
        <meta property="og:type" content="website" />
        <meta
          property="og:title"
          content="Read Manhwa, Manhwa Hentai, Manhwa 18, Hentai Manga, Hentai Comics, E
          hentai, Porn Comics | ManhwaCo.Com"
        />
        <meta property="og:image" content="https://manhwaco.com/manhwaco.jpg" />
        <meta
          property="og:description"
          content="Read Free Online Manhwa, Manhwa 18, Hentai Comics, Webtoon Hentai, Manhua Hentai, Manga Hentai, Adult Manhwa, Hentai Webtoon, Manhwaco. Along with brand new series! Updated Daily!"
        />
        <meta property="og:url" content="https://manhwaco.com/" />
        <meta
          property="og:site_name"
          content="Read Manhwa, Manhwa hentai, Adult Manhwa, Manhwa 18, Hentai Webtoon, Hentai Manhwa, Hentai Manga, Hentai Comics"
        />
      </Head>
      <Header />
      <main>
        <div className="featured pb-3 px-2">
          <h2 className="max-w-7xl mx-auto text-xl my-2 font-bold">Featured</h2>
          <Swiper
            loop={true}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
            modules={[Autoplay]}
            className="mySwiper"
          >
            {featurePosts?.map((item, index) => {
              return (
                <SwiperSlide key={index}>
                  <Features data={item} />
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
        <div className="latest-update py-3 px-2 bg-white">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-xl my-2 font-bold">Latest update</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-5">
              {false
                ? virtualArray.map((item, index) => {
                    return (
                      <div
                        key={index}
                        className="aspect-[2/3] rounded bg-gray-100 animation-pulse"
                      ></div>
                    );
                  })
                : comics?.map((item, index) => {
                    return <Comic key={item.id} data={item} />;
                  })}
            </div>
            <Pagination path="page" currentPage={1} totalPages={totalPages} />
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
