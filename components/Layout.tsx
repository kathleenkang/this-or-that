import Head from "next/head";
import React from "react";
import Header from "./Header";
// import ogimg from "../public/images/heroheader.png";

function Layout({ children }) {
  return (
    <>
      <Head>
        <title>/ t h i s o r t h a t /</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta charset="utf-8" />

        {/* Browser Tab Icon */}
        <link rel="icon" href="/favicon.png" />
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@300;400;500;700&family=Roboto:ital,wght@0,300;0,400;0,500;0,700;1,900&display=swap"
          rel="stylesheet"
        />

        {/* Website Description */}
        <meta
          name="description"
          content="This or That [디오댓]은 결정장애를 가진 사람들을 위한 ‘소셜 투표 플랫폼’입니다. 밸런스 게임부터 소개팅룩 조언까지⁠— 무엇이든 고민이 될 때, 익명으로 커뮤니티 유저들의 투표를 받아보세요! 다른 유저들의 포스트에 투표하는 재미도 쏠쏠해요 :) 이게 나아 저게 나아? 골라줘! 👍"
        />

        {/* Search Engine Keyword */}
        <meta
          name="keyword"
          content="소셜 투표, 결정장애, 밸런스게임, 대신 정해주는, poll, social voting, social polling"
        />

        {/* Social Media Open Graph Information */}
        {/* 1200x630 */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content="This or That? 골라줘!" />

        <meta
          property="og:description"
          // content="대신 정해주는 소셜 투표 플랫폼⁠— 디오댓👍"
          content="대신 정해주는 ‘소셜 투표 플랫폼’ 디오댓 👍"
        />
        <meta
          property="og:image"
          content={`${process.env.HOST}/images/heroheader.png`}
        />
        <meta property="og:url" content={process.env.HOST} />

        {/* Twitter */}
        <meta property="twitter:card" content="summary" />
        <meta property="twitter:title" content="this or that? 골라줘!" />
        <meta
          property="twitter:description"
          content="결정장애? 걱정마요! 소셜 투표 플랫폼 ‘디오댓’에서 대신 정해드립니다 👍"
        />
        <meta
          property="twitter:image"
          content={`${process.env.HOST}/images/heroheader.png`}
        />
      </Head>
      <Header />
      <div className="px-8 py-6 max-w-7xl mx-auto md:py-8">{children}</div>
    </>
  );
}

export default Layout;
