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
                <div className="inline absolute inset-0 flex justify-center bg-red-700/40 opacity-0 rounded group-hover:opacity-100 ">
                    <div className="absolute top-10 text-white">Chapter: 49</div>
                    <button className="read-now absolute bottom-10 flex items-center p-2 bg-red-500 text-white">
                        Read now <GoLinkExternal className="text-base" />
                    </button>
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
