import { React, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import Image from "next/image";
import errorImg from "../public/images/dino-run.gif";
import countdown from "../public/images/countdown.gif";

function ErrorPage() {
  const router = useRouter();

  useEffect(() => {
    setTimeout(() => {
      router.push("/");
    }, 6000);
  }, []);

  return (
    <div className="grid place-content-center">
      <div className="">
        <h1 className="text-green-600 font-black text-5xl mb-3 md:mt-7">
          Oops...!
        </h1>
        <h2 className="text-2xl font-semibold text-gray-700 mb-10">
          존재하지 않는 페이지입니다.
        </h2>
      </div>

      <div className="max-w-[600px]">
        <Image src={errorImg} />
      </div>

      <div
        className="text-gray-600 text-xl leading-8 mt-10"
        style={{ wordBreak: "keep-all" }}
      >
        <div className="mb-4">
          주소가 잘못 입력되었거나 삭제되어 요청하신 페이지를 찾을 수 없습니다.
        </div>
        <Link href="/">
          <a className="text-orange-500 font-medium underline underline-offset-2">
            홈페이지 피드
          </a>
        </Link>
        에서 더 많은 포스트를 구경하세요!
        <div className="mt-4">
          <div className="w-[30px] inline-block align-top">
            <Image src={countdown} />
          </div>{" "}
          초 후 자동으로 연결됩니다.
        </div>
      </div>
    </div>
  );
}

export default ErrorPage;
