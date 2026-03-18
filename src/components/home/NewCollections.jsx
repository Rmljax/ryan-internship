import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/bundle";

import { A11y, Navigation, Pagination, Scrollbar } from "swiper/modules";
import Skeleton from "../ui/Skeleton";

export default function NewCollections() {
  const [collections, setCollections] = useState([]);

  async function fetchData() {
    const { data } = await axios.get(
      "https://remote-internship-api-production.up.railway.app/newCollections",
    );

    setCollections(data.data);
  }

  useState(() => {
    fetchData();
  }, []);

  return (
    <section id="new-collections">
      <div className="container">
        <div className="row">
          <h2 className="new-collections__title">New Collections</h2>
          <div className="new-collections__body">
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
              {null
                ? collections.map((collection, index) => (
                    <SwiperSlide key={index} className="collection-column">
                      <Link
                        to={`/collection/${collection.collectionId}`}
                        key={index}
                        className="collection"
                      >
                        <img
                          src={collection.imageLink}
                          alt=""
                          className="collection__img"
                        />
                        <div className="collection__info">
                          <h3 className="collection__name">
                            {collection.title}
                          </h3>
                          <div className="collection__stats">
                            <div className="collection__stat">
                              <span className="collection__stat__label">
                                Floor
                              </span>
                              <span className="collection__stat__data">
                                {Number(collection.floor).toFixed(2)} ETH
                              </span>
                            </div>
                            <div className="collection__stat">
                              <span className="collection__stat__label">
                                Total Volume
                              </span>
                              <span className="collection__stat__data">
                                {collection.totalVolume} ETH
                              </span>
                            </div>
                          </div>
                        </div>
                      </Link>
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
