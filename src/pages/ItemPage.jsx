import { faEye, faHeart } from "@fortawesome/free-regular-svg-icons";
import {
  faShapes,
  faTag,
  faShoppingBag,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import RecommendedItems from "../components/item/RecommendedItems";
import { faEthereum } from "@fortawesome/free-brands-svg-icons";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Skeleton from "../components/ui/Skeleton";

export default function ItemPage() {
  const { id } = useParams();
  const [item, setItem] = useState([]);
  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [hours, setHours] = useState(0);
  const [filteredItems, setFilteredItems] = useState([]);

  async function fetchData() {
    const { data } = await axios.get(
      `https://remote-internship-api-production.up.railway.app/item/${id}`,
    );
    setItem(data.data);
    const collectionData = await axios.get(
      `https://remote-internship-api-production.up.railway.app/collection/${data.data.collectionId}`,
    );
    const items = collectionData.data.data.items;
    setFilteredItems(items);
  }

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchData();
  }, [id]);

  useEffect(() => {
    requestAnimationFrame(updateTime);
  });

  function updateTime() {
    let milliseconds = item.expiryDate - Date.now();
    setSeconds(milliseconds / 1000);
    setMinutes(seconds / 60);
    setHours(minutes / 60);
  }

  return (
    <>
      <section id="item-info">
        <div className="container">
          {Object.keys(item).length > 0 ? (
            <div className="row item-page__row">
              <div className="item-page__left">
                <figure className="item-page__img__wrapper">
                  <div className="item-page__img__details">
                    <FontAwesomeIcon
                      icon={faEthereum}
                      className="item-page__img__icon"
                    />
                    <div className="item-page__img__likes">
                      <FontAwesomeIcon
                        icon={faHeart}
                        className="item-page__img__icon"
                      />
                      <span className="item-page__img__likes__text">
                        {item.favorites}
                      </span>
                    </div>
                  </div>
                  <img src={item.imageLink} alt="" className="item-page__img" />
                </figure>
              </div>
              <div className="item-page__right">
                <Link
                  to={`/collection/${item.collectionId}`}
                  className="item-page__collection light-blue"
                >
                  {item.collection}
                </Link>
                <h1 className="item-page__name">{item.title}</h1>
                <span className="item-page__owner">
                  Owned by{" "}
                  <Link
                    to={`/user/${item.ownerId}`}
                    className="light-blue item-page__owner__link"
                  >
                    {item.owner}
                  </Link>
                </span>
                <div className="item-page__details">
                  <div className="item-page__detail">
                    <FontAwesomeIcon
                      icon={faEye}
                      className="item-page__detail__icon"
                    />
                    <span className="item-page__detail__text">
                      {item.views} views
                    </span>
                  </div>
                  <div className="item-page__detail">
                    <FontAwesomeIcon
                      icon={faHeart}
                      className="item-page__detail__icon"
                    />
                    <span className="item-page__detail__text">
                      {item.favorites} favorites
                    </span>
                  </div>
                  <div className="item-page__detail">
                    <FontAwesomeIcon
                      icon={faShapes}
                      className="item-page__detail__icon"
                    />
                    <span className="item-page__detail__text">PFPs</span>
                  </div>
                </div>
                <div className="item-page__sale">
                  <div className="item-page__sale__header">
                    <div className="green-pulse"></div>
                    <span>
                      Sale ends in {Math.round(hours)}h{" "}
                      {Math.round(minutes % 60)}m {Math.round(seconds % 60)}s
                    </span>
                  </div>
                  <div className="item-page__sale__body">
                    <span className="item-page__sale__label">
                      Current price
                    </span>
                    <div className="item-page__sale__price">
                      <span className="item-page__sale__price__eth">
                        {item.ethPrice} ETH
                      </span>
                      <span className="item-page__sale__price__dollars">
                        {item.usdPrice}
                      </span>
                    </div>
                    <div className="item-page__sale__buttons">
                      <div className="item-page__sale__buy">
                        <button className="item-page__sale__buy__button disabled">
                          Buy now
                        </button>
                        <button className="item-page__sale__buy__icon disabled">
                          <FontAwesomeIcon icon={faShoppingBag} />
                        </button>
                      </div>
                      <button className="item-page__sale__offer disabled">
                        <FontAwesomeIcon icon={faTag} />
                        Make offer
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="row item-page__row">
              <div className="item-page__left">
                <figure className="item-page__img__wrapper">
                  <div className="item-page__img__details">
                    <FontAwesomeIcon
                      icon={faEthereum}
                      className="item-page__img__icon"
                    />
                    <div className="item-page__img__likes">
                      <Skeleton width="36px" height="16px" borderRadius="4px" />
                    </div>
                  </div>
                  <Skeleton
                    width="100%"
                    height="100%"
                    className="item-page__img"
                  />
                </figure>
              </div>
              <div className="item-page__right">
                <a className="item-page__collection light-blue">
                  <Skeleton width="140px" height="16px" borderRadius="4px" />
                </a>
                <h1 className="item-page__name">
                  <Skeleton width="280px" height="16px" borderRadius="4px" />
                </h1>
                <span className="item-page__owner">
                  <Skeleton width="140px" height="16px" borderRadius="4px" />
                </span>
                <div className="item-page__details">
                  <div className="item-page__detail">
                    <Skeleton width="84px" height="16px" borderRadius="4px" />
                  </div>
                  <div className="item-page__detail">
                    <Skeleton width="84px" height="16px" borderRadius="4px" />
                  </div>
                  <div className="item-page__detail">
                    <Skeleton width="84px" height="16px" borderRadius="4px" />
                  </div>
                </div>
                <div className="item-page__sale">
                  <div className="item-page__sale__header">
                    <Skeleton width="240px" height="16px" borderRadius="4px" />
                  </div>
                  <div className="item-page__sale__body">
                    <span className="item-page__sale__label">
                      <Skeleton width="84px" height="16px" borderRadius="4px" />
                    </span>
                    <div className="item-page__sale__price">
                      <span className="item-page__sale__price__eth">
                        <Skeleton
                          width="152px"
                          height="16px"
                          borderRadius="4px"
                        />
                      </span>
                      <span className="item-page__sale__price__dollars">
                        <Skeleton
                          width="152px"
                          height="16px"
                          borderRadius="4px"
                        />
                      </span>
                    </div>
                    <div className="item-page__sale__buttons">
                      <Skeleton width="100%" height="48px" borderRadius="4px" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      <RecommendedItems
        items={filteredItems}
        collectionId={item.collectionId}
        setFilteredItems={setFilteredItems}
        currentId={item.id}
      />
    </>
  );
}
