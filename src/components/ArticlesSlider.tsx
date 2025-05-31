import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { FaQuoteLeft } from "react-icons/fa";
import parse from "html-react-parser";
import dompurify from "dompurify";

// 👇 Define type for Medium article
interface MediumArticle {
  title: string;
  pubDate: string;
  description: string;
  link: string;
  thumbnail?: string;
}

// 👇 Extract first 5 sentences from description
const getAbstract = (text: string): string => {
  const sentences = text.split(".").slice(0, 5).join(".") + ".";
  return sentences;
};

// 👇 Sanitize HTML to prevent XSS
const cleanHTML = (html: string): string => {
  return dompurify.sanitize(html, {
    ALLOWED_TAGS: ["p", "a", "strong", "em", "ul", "li"],
    ALLOWED_ATTR: ["href"],
  });
};

export default function ArticlesSlider() {
  const [articles, setArticles] = useState<MediumArticle[]>([]);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await fetch(
          "https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@thavinduwrites"
        );
        const data = await response.json();
        setArticles(data.items || []);
      } catch (error) {
        console.error("Error fetching Medium articles:", error);
      }
    };

    fetchArticles();
  }, []);

  return (
    <div className="px-4 md:px-8 lg:px-16 py-4">
      <Swiper
        navigation={true}
        pagination={{ clickable: true }}
        autoplay={{ delay: 7000, disableOnInteraction: false }}
        speed={3000}
        loop={true}
        modules={[Navigation, Pagination, Autoplay]}
        className="h-[300px] md:h-[400px]"
      >
        {articles.map((article, index) => (
          <SwiperSlide key={index}>
            <div className="flex flex-col items-center md:flex-row gap-4 md:gap-x-8 h-full px-4 md:px-8 lg:px-16 py-4">
              {/* Left - Title & Date */}
              <div className="w-full max-w-[300px] flex flex-col xl:justify-center items-center relative mx-auto md:mx-0">
                <div className="flex flex-col justify-center text-center">
                  <div className="mb-2 mx-auto">
                    {/* Optional: <img src={article.thumbnail} alt={article.title} /> */}
                  </div>
                  <div className="text-base md:text-lg px-1 font-semibold text-gray-900 dark:text-white">
                    {article.title}
                  </div>
                  <div className="text-[10px] md:text-[15px] uppercase font-extralight tracking-widest py-3 text-gray-500 dark:text-gray-300">
                    {new Date(article.pubDate).toDateString()}
                  </div>
                </div>
              </div>

              {/* Right - Description */}
              <div className="flex-1 flex flex-col justify-center relative md:pl-8">
                <div className="mb-4">
                  <FaQuoteLeft className="text-2xl md:text-4xl xl:text-6xl text-gray-300 dark:text-gray-600 mx-auto md:mx-0" />
                </div>
                <div className="text-sm md:text-base xl:text-lg text-center md:text-left mb-4 text-gray-700 dark:text-gray-300">
                  {parse(cleanHTML(getAbstract(article.description)))}
                </div>
                <a
                  href={article.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline mt-4 inline-block"
                >
                  Read More
                </a>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
