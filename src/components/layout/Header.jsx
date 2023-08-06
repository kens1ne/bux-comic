import Image from "next/image";
import Link from "next/link";
import { use, useEffect, useState } from "react";
import { AiFillHome, AiOutlineClose, AiOutlineTag } from "react-icons/ai";
import { BiCategory } from "react-icons/bi";
import { BsList, BsSearch } from "react-icons/bs";
import Genres from "@/utils/Genres";
import { debounce, set } from "lodash";
import axios from "axios";

export default function Header() {
  const [showSuggest, setShowSuggest] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);
  const [dataSuggest, setDataSuggest] = useState([]);
  const [showMenuGenres, setShowMenuGenres] = useState(false);

  const debouncedSearch = debounce(async (searchTerm) => {
    if (searchTerm === "") {
      setShowSuggest(false);
      return;
    } else {
      setShowSuggest(true);
    }
    const { data } = await axios.get(`api/search-suggest?q=${searchTerm}`);

    if (!data.status) {
      setShowSuggest(false);
      return;
    }

    setDataSuggest(data.comics);
  }, 200);

  const handleSubmitForm = (e) => {
    e.preventDefault();
  };

  const handleShowMenuGenres = () => {
    setShowMenuGenres(!showMenuGenres);
  };

  const openSidebar = () => {
    setShowSidebar(true);
  };
  const closeSidebar = () => {
    setShowSidebar(false);
  };

  const handleSearchSuggest = (e) => {
    debouncedSearch(e.target.value);
  };

  return (
    <header className="bg-white h-[50px] border-b-[1px]">
      <div className="max-w-7xl mx-auto px-2 py-2">
        <nav className="flex justify-between items-center">
          <div className="flex items-center">
            <Link href="/">
              <Image src="/logo.png" alt="ManhwaCo" width={150} height={100} />
            </Link>
            <ul className="hidden md:block md:flex">
              <li className="font-semibold ml-5 mr-2 cursor-pointer group">
                Genres
                <ul className="z-20 absolute bg-white shadow-lg rounded group-hover:grid grid-cols-4 p-2 hidden group-hover:block">
                  {Genres.map((genre) => (
                    <Link href={`/genres/${genre.id}`} key={genre.id}>
                      <li className="py-1 px-4 hover:bg-rose-500/10 hover:text-rose-600 rounded">
                        {genre.name}
                      </li>
                    </Link>
                  ))}
                </ul>
              </li>

              <li className="text-base font-semibold mx-2 hover:text-rose-700">
                <Link href="/genres/manhwa-hentai-002">Manhwa 18+</Link>
              </li>
              <li className="text-base font-semibold mx-2 hover:text-rose-700">
                <Link href="/genres/hentai">Hentai</Link>
              </li>
            </ul>
          </div>
          <div className="hidden md:block">
            <form
              className="flex items-center rounded-full border py-2 focus-within:border-red-500 duration-100 mx-4 relative"
              onSubmit={handleSubmitForm}
            >
              <input
                type="text"
                className="outline-none text-sm pl-3 rounded-full"
                placeholder="Search comics/authors"
                onChange={handleSearchSuggest}
              />
              <button type="submit" className="flex items-center px-3">
                <BsSearch />
              </button>
              {showSuggest && (
                <ul className="z-10 absolute top-11 left-1/2 -translate-x-1/2 w-72 h-max max-h-80 overflow-auto shadow rounded bg-white">
                  {dataSuggest.map((suggest, index) => (
                    <li
                      className="flex gap-2 p-2 border-b hover:bg-gray-200 duration-100 cursor-pointer"
                      key={index}
                    >
                      <Link href={`/comic/${suggest.name}`}>
                        <h6 className="font-bold text-sm">{suggest.name}</h6>
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </form>
          </div>
          <div className="md:hidden">
            <button onClick={openSidebar}>
              <BsList size={30} />
            </button>
            <div>
              <div
                className={`z-20 fixed inset-0 bg-[rgba(0,0,0,0.85)] ease-in duration-300 ${
                  showSidebar
                    ? "opacity-100 pointer-events-auto"
                    : "opacity-0 pointer-events-none"
                }`}
                onClick={closeSidebar}
              ></div>
              <div
                className={`overflow-auto z-30 fixed right-0 inset-y-0 bg-white p-5 pt-3 h-screen w-11/12 max-w-sm ease-in duration-300 ${
                  showSidebar ? "translate-x-0" : "translate-x-full"
                }`}
              >
                <button onClick={closeSidebar}>
                  <AiOutlineClose size={20} />
                </button>
                <form
                  className="flex items-center rounded-full border py-2 focus-within:border-red-500 duration-100 relative"
                  onSubmit={handleSubmitForm}
                >
                  <input
                    type="text"
                    className="outline-none text-sm pl-3 rounded-full w-full"
                    placeholder="Search comics/authors"
                    onChange={handleSearchSuggest}
                  />
                  <button type="submit" className="flex items-center px-3">
                    <BsSearch />
                  </button>
                  {showSuggest && (
                    <ul className="z-10 absolute top-11 left-1/2 -translate-x-1/2 w-72 h-max max-h-80 overflow-auto shadow rounded bg-white">
                      {dataSuggest.map((suggest, index) => (
                        <li
                          className="flex gap-2 p-2 border-b hover:bg-gray-200 duration-100 cursor-pointer"
                          key={index}
                        >
                          <Link href={`/comic/${suggest.name}`}>
                            <h6 className="font-bold text-sm">
                              {suggest.name}
                            </h6>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </form>
                <ul className="mt-5">
                  <li className="border-b-[1px]">
                    <Link
                      href="/"
                      className="flex items-center font-medium text-lg"
                    >
                      Home
                    </Link>
                  </li>
                  <li className="mt-2 border-b-[1px]">
                    <Link
                      href={`/genres/manhwa-hentai-002`}
                      className="flex items-center font-medium text-lg"
                    >
                      Manhwa
                    </Link>
                  </li>
                  <li className="mt-2 border-b-[1px]">
                    <Link
                      href={`/genres/manhua`}
                      className="flex items-center font-medium text-lg"
                    >
                      Manhua
                    </Link>
                  </li>
                  <li className="mt-2 border-b-[1px]">
                    <Link
                      href={`/genres/hentai`}
                      className="flex items-center font-medium text-lg"
                    >
                      Hentai
                    </Link>
                  </li>
                  <li className="mt-2 border-b-[1px]">
                    <Link
                      href={`/genres/adult`}
                      className="flex items-center font-medium text-lg"
                    >
                      Adult
                    </Link>
                  </li>
                  <li className="mt-2">
                    <div
                      className="flex items-center font-medium text-lg"
                      onClick={handleShowMenuGenres}
                    >
                      <BiCategory size={18} className="mr-1" /> Genres
                    </div>
                    {showMenuGenres && (
                      <ul className="grid grid-cols-2">
                        {Genres.map((genre) => (
                          <Link href={`/genres/${genre.id}`} key={genre.id}>
                            <li className="py-1 px-4 hover:bg-rose-500/10 hover:text-rose-600 rounded">
                              {genre.name}
                            </li>
                          </Link>
                        ))}
                      </ul>
                    )}
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
}
