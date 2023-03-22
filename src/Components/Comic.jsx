import Image from 'next/image';
import Link from 'next/link';

const Comic = ({ data }) => {
    return (
        <div>
            <Link href="/about">
                <div className="img-thumb h-[218px] sm:h-[268px] md:h-[268px] w-[100%] relative">
                    <Image
                        src={data.image}
                        alt={data.name}
                        className="transition duration-150 ease-in-out hover:drop-shadow-lg rounded"
                        layout="fill"
                    />
                </div>
            </Link>
            <div className="information">
                <Link href="/about" className="comic-name font-thin text-sm hover:text-red-500">
                    {data.name}
                </Link>
                <div className="detail font-sans uppercase">
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
