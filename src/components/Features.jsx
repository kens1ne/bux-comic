import Image from "next/image";
import Link from "next/link";
import { BsFillArrowRightSquareFill } from "react-icons/bs";

const Features = ({ data }) => {
  return (
    <div
      className="max-w-7xl mx-auto shadow rounded-lg"
      style={{
        backgroundImage: `url(${data.thumbnail})`,
      }}
    >
      <div className="overlay rounded">
        <div className="relative backdrop-blur-xl px-2 py-3 rounded-lg z-50">
          <div className="flex justify-between items-end">
            <div className="flex">
              <div className="h-[167px] sm:h-[268px] md:h-[268px] w-[187px] relative">
                <Image
                  src={data.thumbnail}
                  alt={data.title}
                  className="drop-shadow-lg rounded"
                  layout="fill" // required
                  objectFit="cover"
                />
              </div>
              <div className="information mx-2">
                <h2 className="text-white font-bold text-xl line-clamp-3 sm:line-clamp-2 lg:text-4xl overflow-hidden">
                  {data.title}
                </h2>
                {/* <div className="categories hidden md:block">
                  <Link
                    href="/"
                    className="tag px-1 mr-1 bg-red-400 text-white uppercase rounded"
                  >
                    Action
                  </Link>
                  <Link
                    href="/"
                    className="tag px-1 mr-1 bg-red-400 text-white uppercase rounded"
                  >
                    Adventure
                  </Link>
                  <Link
                    href="/"
                    className="tag px-1 mr-1 bg-red-400 text-white uppercase rounded"
                  >
                    Romance
                  </Link>
                  <Link
                    href="/"
                    className="tag px-1 mr-1 bg-red-400 text-white uppercase rounded"
                  >
                    Sport
                  </Link>
                </div> */}
                {/* <p className="my-2 font-medium hidden md:block">
                  {data.description}
                </p> */}
              </div>
            </div>
          </div>
          <Link
            href="/"
            className="absolute flex items-center right-5 bottom-3 text-white font-medium transition duration-150 ease-in-out hover:drop-shadow-lg"
          >
            Start Reading
            <BsFillArrowRightSquareFill className="ml-1 text-xl" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Features;
