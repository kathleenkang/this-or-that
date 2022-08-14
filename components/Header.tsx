import React from "react";
import Link from "next/link";
import Image from "next/image";
import logoImg from "../public/images/tt_logo.png";
import titleImg from "../public/images/tt_title.png";

import { useRouter } from "next/router";

function Header() {
  const router = useRouter();

  return (
    <header className="sticky -top-6 shadow-md shadow-slate-100 z-50">
      <div className="flex justify-between items-center bg-white h-20 px-8 max-w-7xl m-auto">
        <div
          className="flex justify-between h-14 sticky top-0 items-center w-full"
          id="inner-header"
        >
          <div>
            <div className="w-10 md:hidden">
              <Link href="/">
                <a>
                  <Image src={logoImg} alt="Logo Mobile" />
                </a>
              </Link>
            </div>

            <div className="hidden md:block w-72">
              <Link href="/">
                <a>
                  <Image src={titleImg} width={230} height={37.72} alt="Logo" />
                </a>
              </Link>
            </div>
          </div>

          <nav className="space-x-8 text-xl font-medium">
            <Link href="/about">
              <a
                className={`md:hover:text-orange-500
                ${router.pathname == "/about" ? "text-green-600" : ""}
              `}
              >
                About
              </a>
            </Link>

            <Link href="/mypage">
              <a
                className={`md:hover:text-orange-500
                ${router.pathname == "/mypage" ? "text-green-600" : ""}
              `}
              >
                MyPage
              </a>
            </Link>

            <Link href="/postupload">
              <a
                className={`md:hover:text-orange-500
                  ${router.pathname == "/postupload" ? "text-green-600" : ""}
                `}
              >
                +Post
              </a>
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}

export default Header;
