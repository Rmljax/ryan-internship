import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/bundle";

import { Navigation } from "swiper/modules";
import Skeleton from "../ui/Skeleton";
import Collection from "../ui/Collection";

export default function PopularCollections() {
  const [collections, setCollections] = useState([]);

  async function fetchData() {
    const { data } = await axios.get(
      "https://remote-internship-api-production.up.railway.app/popularCollections",
    );

    setCollections(data.data);
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <section id="popular-collections">
      <div className="container">
        <div className="row">
          <h2 className="popular-collections__title">Popular Collections</h2>
          <div className="popular-collections__body">
            <Swiper
              modules={[Navigation]}
              spaceBetween={16}
              slidesPerView={1}
              navigation
              loop={true}
              breakpoints={{
                1600: { slidesPerView: 6 },
                1200: { slidesPerView: 5 },
                1024: { slidesPerView: 4 },
                768: { slidesPerView: 3 },
                480: { slidesPerView: 2 },
              }}
            >
              {collections.length > 0
                ? collections.map((collection, index) => (
                    <SwiperSlide key={index} className="collection-column">
                      <Collection key={index} collection={collection} />
                    </SwiperSlide>
                  ))
                : new Array(7).fill().map((_, index) => (
                    <SwiperSlide key={index} className="collection-column">
                      <div className="collection">
                        <Skeleton
                          key={index}
                          width="100%"
                          height="180px"
                          borderRadius="0"
                        />
                        <div className="collection__info">
                          <div
                            className="collection__stats"
                            style={{ marginTop: "16px" }}
                          >
                            <div
                              className="collection__stat"
                              style={{ gap: "8px" }}
                            >
                              <Skeleton
                                key={index}
                                width="40%"
                                height="14px"
                                borderRadius="4px"
                              />
                              <Skeleton
                                key={index}
                                width="80%"
                                height="14px"
                                borderRadius="4px"
                              />
                            </div>
                            <div
                              className="collection__stat"
                              style={{ gap: "8px" }}
                            >
                              <Skeleton
                                key={index}
                                width="40%"
                                height="14px"
                                borderRadius="4px"
                              />
                              <Skeleton
                                key={index}
                                width="80%"
                                height="14px"
                                borderRadius="4px"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </SwiperSlide>
                  ))}
            </Swiper>
          </div>
        </div>
      </div>
    </section>
  );
}
