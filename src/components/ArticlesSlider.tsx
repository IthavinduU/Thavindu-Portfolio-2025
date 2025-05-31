import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import parse from "html-react-parser";
import dompurify from "dompurify";

interface MediumArticle {
  title: string;
  pubDate: string;
  description: string;
  link: string;
  thumbnail?: string;
  categories?: string[];
}

const getAbstract = (text: string): string => {
  const words = text.split(/\s+/).slice(0, 50).join(" ");
  return words + (words.length < text.length ? "…" : "");
};

const cleanHTML = (html: string): string => {
  return dompurify.sanitize(html, {
    ALLOWED_TAGS: ["p", "a", "strong", "em", "ul", "li"],
    ALLOWED_ATTR: ["href"],
  });
};

const fallbackImage = "https://via.placeholder.com/600x300?text=No+Image";

export default function ArticlesSlider() {
  const [articles, setArticles] = useState<MediumArticle[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const res = await fetch(
          "https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@thavinduwrites"
        );
        const data = await res.json();
        setArticles(data.items || []);
      } catch (e) {
        console.error("Error fetching articles", e);
      } finally {
        setLoading(false);
      }
    };
    fetchArticles();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-96">
        <div className="w-72 h-96 bg-gray-300 animate-pulse rounded-xl"></div>
      </div>
    );
  }

  return (
    <div className="px-4 md:px-8 lg:px-16 py-6" style={{ height: "650px" }}>
      <Swiper
        direction="horizontal" // Explicitly set horizontal (default)
        slidesPerView={1}
        spaceBetween={30}
        loop={true}
        pagination={{ clickable: true }}
        autoplay={{ delay: 7000, disableOnInteraction: false }}
        speed={800}
        modules={[Pagination, Autoplay]}
        style={{ height: "100%" }}
      >
        {articles.map((article, idx) => (
          <SwiperSlide key={idx}>
            <div className="max-w-xl mx-auto rounded-xl border-4 border-gradient-to-tr from-purple-500 via-pink-500 to-red-500 p-1 shadow-lg bg-white dark:bg-gray-800 h-full flex flex-col">
              <div className="rounded-lg overflow-hidden flex-shrink-0 h-48 md:h-56 w-full relative">
                <img
                  src={article.thumbnail || fallbackImage}
                  alt={article.title}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent p-4">
                  <h3 className="text-white font-bold text-lg md:text-xl truncate">
                    {article.title}
                  </h3>
                  <p className="text-gray-300 text-xs mt-1 uppercase tracking-wide">
                    {new Date(article.pubDate).toLocaleDateString(undefined, {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mt-4 mb-3">
                {(article.categories || []).slice(0, 3).map((tag, idx2) => (
                  <span
                    key={idx2}
                    className="bg-purple-100 text-purple-800 dark:bg-purple-700 dark:text-purple-100 text-xs font-semibold px-2 py-1 rounded-full"
                    title={`Category: ${tag}`}
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="text-gray-700 dark:text-gray-300 text-sm md:text-base flex-grow leading-relaxed mb-4 overflow-hidden">
                {parse(cleanHTML(getAbstract(article.description)))}
              </div>

              <a
                href={article.link}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-auto inline-block text-center bg-gradient-to-r from-purple-600 to-pink-600 hover:from-pink-600 hover:to-purple-600 text-white font-semibold py-2 rounded-lg transition-shadow shadow-md hover:shadow-xl"
              >
                Read More
              </a>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
