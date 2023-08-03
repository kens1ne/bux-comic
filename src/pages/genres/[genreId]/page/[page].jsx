import Header from "@/components/layout/Header";
import React from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import ComicCard from "@/components/ComicCard";
import axios from "axios";
import Pagination from "@/components/Pagination";
import Footer from "@/components/layout/Footer";
import Genres from "@/utils/Genres";

const getComicGenreByPage = async (genreId, page) => {
  return await fetch(
    "https://api.manhwaco.com/genres/" + genreId + "?page=" + page
  )
    .then((res) => res.json())
    .then((res) => res);
};

export const getStaticProps = async ({ params }) => {
  const genreId = params?.genreId;
  const page = params?.page;
  const { comics, total_pages: totalPages } = await getComicGenreByPage(
    genreId,
    page
  );

  const name = Genres.find((item) => item.id === genreId).name;
  const id = Genres.find((item) => item.id === genreId).id;

  return {
    props: {
      comics,
      totalPages,
      genreName: name,
      genreId: id,
    },
    revalidate: 60 * 1,
  };
};

const Genre = (props) => {
  const router = useRouter();
  const page = Number(router.query.page || 1);
  const genreId = props.genreId;
  const genreName = props.genreName;
  const comics = props.comics;
  const title =
    genreName +
    " - Page " +
    page +
    " | Read Manhwa, Adult Manhwa, Manhwaco.Com";
  const totalPages = props.totalPages;

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta property="og:locale" content="en_US" />
        <meta property="og:type" content="website" />
        <meta
          name="description"
          content={`${genreName} - Read Free Online Manhwa, Manhwa 18, Hentai Comics, Webtoon Hentai, Manhua Hentai, Manga Hentai, Adult Manhwa, Hentai Webtoon, Manhwaco. Along with brand new series! Updated Daily!`}
        />
        <meta
          property="og:title"
          content="Read Manhwa, Manhwa Hentai, Manhwa 18, Hentai Manga, Hentai Comics, E
          hentai, Porn Comics | ManhwaCo.Com"
        />
        <meta property="og:image" content="https://manhwaco.com/manhwaco.jpg" />
        <meta
          property="og:description"
          content={`${genreName} - Read Free Online Manhwa, Manhwa 18, Hentai Comics, Webtoon Hentai, Manhua Hentai, Manga Hentai, Adult Manhwa, Hentai Webtoon, Manhwaco. Along with brand new series! Updated Daily!`}
        />
        <meta property="og:url" content="https://manhwaco.com/" />
        <meta
          property="og:site_name"
          content="Read Manhwa, Manhwa hentai, Adult Manhwa, Manhwa 18, Hentai Webtoon, Hentai Manhwa, Hentai Manga, Hentai Comics"
        />
      </Head>
      <Header />
      <main>
        <div className="latest-update py-3 px-2 bg-white">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-xl my-2 font-bold">
              {genreName} - Page {page}
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-5">
              {comics?.map((item, index) => {
                return <ComicCard key={index} data={item} />;
              })}
            </div>
            <Pagination
              path={`genres/${genreId}/page`}
              currentPage={page}
              totalPages={totalPages}
            />
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

export default Genre;
