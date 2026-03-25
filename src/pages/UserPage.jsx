import { faEthereum } from "@fortawesome/free-brands-svg-icons";
import { faShoppingBag } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Skeleton from "../components/ui/Skeleton";

export default function UserPage() {
  const [user, setUser] = useState([]);
  const [numShown, setNumShown] = useState(12);
  const [loadVisible, setLoadVisible] = useState(true);
  const [sort, setSort] = useState("");
  const [items, setItems] = useState([]);
  const { id } = useParams();

  async function fetchData() {
    const { data } = await axios.get(
      `https://remote-internship-api-production.up.railway.app/user/${id}`,
    );
    setUser(data.data);
    setItems(data.data.items);
  }

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchData();
  }, []);

  function sortItems() {
    if (sort === "HIGH_TO_LOW") {
      setItems(items.slice().sort((a, b) => b.price - a.price));
    } else if (sort === "LOW_TO_HIGH") {
      setItems(items.slice().sort((a, b) => a.price - b.price));
    }
  }

  useEffect(() => {
    sortItems();
  }, [sort]);
  useEffect(() => {
    if (items?.length > 1 && numShown >= items?.length) {
      setLoadVisible(false);
    }
  }, [numShown]);

  return (
    <>
      {Object.keys(user).length > 0 ? (
        <>
          <header
            style={{
              backgroundImage: `url(${user.imageLink})`,
            }}
            id="user-header"
          ></header>

          <section id="user-info">
            <div className="row">
              <div className="user-info__wrapper">
                <figure className="user-info__img__wrapper">
                  <img
                    src={user.profilePicture}
                    alt=""
                    className="user-info__img"
                  />
                </figure>
                <h1 className="user-info__name">{user.name}</h1>
                <div className="user-info__details">
                  <span className="user-info__wallet">
                    <FontAwesomeIcon
                      icon={faEthereum}
                      className="user-info__wallet__icon"
                    />
                    <span className="user-info__wallet__data">
                      {user.walletCode}
                    </span>
                  </span>
                  <span className="user-info__year">
                    <span className="user-info__year__data">
                      Joined {user.creationDate}
                    </span>
                  </span>
                </div>
              </div>
            </div>
          </section>

          <section id="user-items">
            <div className="row user-items__row">
              <div className="user-items__header">
                <div className="user-items__header__left">
                  <span className="user-items__header__text">
                    {items.length} items
                  </span>
                </div>
                <select
                  className="user-items__header__sort"
                  onChange={(event) => setSort(event.target.value)}
                >
                  <option value="" disabled>
                    Default
                  </option>
                  <option value="HIGH_TO_LOW">Price high to low</option>
                  <option value="LOW_TO_HIGH">Price low to high</option>
                </select>
              </div>
              <div className="user-items__body">
                {items.slice(0, numShown).map((item, index) => (
                  <div className="item-column" key={index}>
                    <Link to={`/item/${item.itemId}`} className="item">
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
                      <a className="item__see-more" href="#">
                        <button className="item__see-more__button">
                          See More
                        </button>
                        <div className="item__see-more__icon">
                          <FontAwesomeIcon icon={faShoppingBag} />
                        </div>
                      </a>
                    </Link>
                  </div>
                ))}
              </div>
            </div>
            {loadVisible ? (
              <button
                className="collection-page__button"
                onClick={() => {
                  setNumShown((prev) => prev + 6);
                }}
              >
                Load more
              </button>
            ) : null}
          </section>
        </>
      ) : (
        <>
          <header id="user-header">
            <Skeleton width="100%" height="100%" />
          </header>

          <section id="user-info">
            <div className="row">
              <div className="user-info__wrapper">
                <figure className="user-info__img__wrapper">
                  <Skeleton width="100%" height="100%" />
                </figure>
                <h1 className="user-info__name">
                  <Skeleton width="240px" height="16px" borderRadius="4px" />
                </h1>
                <div className="user-info__details">
                  <span className="user-info__wallet">
                    <Skeleton width="300px" height="16px" borderRadius="4px" />
                  </span>
                  <span className="user-info__year">
                    <span className="user-info__year__data">
                      <Skeleton
                        width="120px"
                        height="16px"
                        borderRadius="4px"
                      />
                    </span>
                  </span>
                </div>
              </div>
            </div>
          </section>

          <section id="user-items">
            <div className="row user-items__row">
              <div className="user-items__header">
                <div className="user-items__header__left">
                  <span className="user-items__header__text">
                    <Skeleton width="120px" height="16px" borderRadius="4px" />
                  </span>
                </div>
                <Skeleton width="240px" height="48px" borderRadius="8px" />
              </div>
              <div className="user-items__body">
                {new Array(12).fill().map((_, index) => (
                  <div className="item-column" key={index}>
                    <div className="item">
                      <figure className="item__img__wrapper">
                        <Skeleton width="100%" height="100%" />
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
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </>
      )}
    </>
  );
}
