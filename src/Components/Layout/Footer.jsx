import Image from "next/image";
import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <footer className="footer bg-white">
      <div className="max-w-7xl mx-auto px-2 py-3 ">
        <div className="flex justify-center">
          <Link href="/">
            <Image src="/logo.png" alt="Logo" width={150} height={100} />
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
