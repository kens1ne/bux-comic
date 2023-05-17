import Image from 'next/image';
import Link from 'next/link';
import { GoLinkExternal } from 'react-icons/go';

const Comic = ({ data }) => {
    return (
        <div>
            <Link href="/about" className="relative overflow-hidden group">
                <div className="img-thumb h-[218px] sm:h-[268px] md:h-[268px] w-[100%] relative">
                    <Image
                        src={data.image}
                        alt={data.name}
                        className="group-hover:blur-[2px] transition duration-150 ease-in-out hover:drop-shadow-lg rounded"
                        layout="fill"
                    />
                </div>
                <div className="inline absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-red-700/70 opacity-0 rounded group-hover:opacity-100">
                    <div className="absolute bottom-2 left-1.5 text-sm font-medium text-white">{data.name}</div>
                </div>
                <div className="absolute left-2 top-2 text-xs p-1 bg-black/70 rounded text-white group-hover:bg-red-700/70">
                    Chapter: 49
                </div>
            </Link>
            <div className="information">
                <Link href="/about" className="comic-name font-semibold text-sm overflow-hidden hover:text-red-500">
                    {data.name}
                </Link>
                <div className="detail uppercase">
                    <span>
                        <b>C.103</b>
                    </span>
                    - <span>2 HOURS AGO</span>
                </div>
            </div>
        </div>
    );
};

export default Comic;
