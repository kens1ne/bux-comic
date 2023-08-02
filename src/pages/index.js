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
