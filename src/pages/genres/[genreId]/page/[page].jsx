import Header from "@/components/layout/Header";
import React from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import ComicCard from "@/components/ComicCard";
import axios from "axios";
import Pagination from "@/components/Pagination";
import Footer from "@/components/layout/Footer";
import Genres from "@/utils/genres";

export async function getServerSideProps(context) {
  const genreId = context.query.genreId || 1;
  const page = context.query.page || 1;
  try {
    const {
      data: { comics: comics, total_pages: totalPages },
    } = await axios.get(
      "https://api.manhwaco.com/genres/" + genreId + "?page=" + page
    );

    const name = Genres.find((item) => item.id === genreId).name;
    const id = Genres.find((item) => item.id === genreId).id;

    return { props: { comics, totalPages, genreName: name, genreId: id } };
  } catch (error) {
    console.error("Error fetching data:", error.message);
    return { data: [] };
  }
}

const Genre = (props) => {
  const router = useRouter();
  const page = Number(router.query.page || 1);
  const genreId = props.genreId;
  const genreName = props.genreName;
  const comics = props.comics;
  const title = genreName + " - Page " + page;
  const totalPages = props.totalPages;

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
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

export default Genre;
