import { faShoppingBag, faTableCells } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/bundle";
import { Navigation } from "swiper/modules";
import { Link } from "react-router-dom";
import Skeleton from "../ui/Skeleton";

export default function RecommendedItems({
  items,
  collectionId,
  setFilteredItems,
  currentId,
}) {
  
  return (
    <section id="recommended-items">
      <div className="container">
        <div className="row recommended-items__row">
          {items.length > 0 ? (
            <div className="recommended-items__wrapper">
              <div className="recommended-items__header">
                <FontAwesomeIcon icon={faTableCells} />
                <h3 className="recommended-items__header__title">
                  More from this collection
                </h3>
              </div>
              <div className="recommended-items__body">
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
                  {items.filter((item) => item.itemId !== currentId).slice(0, 10).map((item, index) => (
                    <SwiperSlide key={index} className="item-column">
                      <Link
                        to={`/item/${item.itemId}`}
                        key={index}
                        className="item"
                      >
                        <figure className="item__img__wrapper">
                          <img
                            src={item.imageLink}
                            alt=""
                            className="item__img"
                          />
                        </figure>
                        <div className="item__details">
                          <span className="item__details__name">
                            {item.title}
                          </span>
                          <span className="item__details__price">
                            {item.price} ETH
                          </span>
                          <span className="item__details__last-sale">
                            Last sale: {item.lastSale} ETH
                          </span>
                        </div>
                        <div className="item__see-more">
                          <button className="item__see-more__button">
                            See More
                          </button>
                          <div className="item__see-more__icon">
                            <FontAwesomeIcon icon={faShoppingBag} />
                          </div>
                        </div>
                      </Link>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
              <div className="recommended-items__footer">
                <Link
                  to={`/collection/${collectionId}`}
                  className="recommended-items__footer__button"
                >
                  View Collection
                </Link>
              </div>
            </div>
          ) : (
            <div className="recommended-items__wrapper">
              <div className="recommended-items__header">
                <Skeleton width="240px" height="16px" borderRadius="4px" />
              </div>
              <div className="recommended-items__body">
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
                  {new Array(10).fill().map((_, index) => (
                    <SwiperSlide key={index} className="item-column">
                      <a className="item">
                        <figure className="item__img__wrapper">
                          <Skeleton key={index} width="100%" height="100%" />
                        </figure>
                        <div className="item__details">
                          <span className="item__details__name">
                            <Skeleton
                              width="80px"
                              height="16px"
                              borderRadius="4px"
                            />
                          </span>
                          <span className="item__details__price">
                            <Skeleton
                              width="48px"
                              height="16px"
                              borderRadius="4px"
                            />
                          </span>
                          <span className="item__details__last-sale">
                            <Skeleton
                              width="120px"
                              height="16px"
                              borderRadius="4px"
                            />
                          </span>
                        </div>
                      </a>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
              <div className="recommended-items__footer">
                <Skeleton width="120px" height="24px" borderRadius="4px" />
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
