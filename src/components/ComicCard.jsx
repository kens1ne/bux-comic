import Image from "next/image";
import Link from "next/link";
import { GoLinkExternal } from "react-icons/go";

const Comic = ({ data }) => {
  return (
    <div className="relative">
      <Link href={`/comic/${data.id}`} className="overflow-hidden group">
        <div className="img-thumb relative">
          <img
            src={data.thumbnail}
            alt={data.title}
            className="w-full group-hover:blur-[2px] transition duration-150 ease-in-out hover:drop-shadow-lg rounded"
          />
          <div className="inline absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-red-700/70 opacity-0 rounded group-hover:opacity-100">
            <div className="absolute bottom-2 left-1.5 text-sm font-medium text-white">
              {data.title}
            </div>
          </div>
        </div>

        <div className="comic-name absolute left-2 top-2 text-xs p-1 bg-black/70 rounded text-white group-hover:bg-red-700/70">
          {data.time_ago}
        </div>
      </Link>
      <div className="information">
        <Link
          href={`/comic/${data.id}`}
          className="comic-name font-semibold text-sm overflow-hidden hover:text-red-500"
        >
          {data.title}
        </Link>
        <div className="detail uppercase hover:text-red-500">
          <span className="comic-name">
            <Link href={`/comic/${data.id}/${data.last_chapter?.id}`}>
              {data.last_chapter?.name}
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Comic;
