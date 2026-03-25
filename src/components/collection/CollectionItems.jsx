import { faEye } from "@fortawesome/free-regular-svg-icons";
import { faShoppingBag } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Skeleton from "../ui/Skeleton";

export default function CollectionItems({ items, setItems }) {
  const [numShown, setNumShown] = useState(12);
  const [loadVisible, setLoadVisible] = useState(true);
  const [sort, setSort] = useState("");

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
    <section id="collection-items">
      {items?.length > 0 ? (
        <div className="row collection-items__row">
          <div className="collection-items__header">
            <div className="collection-items__header__left">
              <span className="collection-items__header__live">
                <div className="green-pulse"></div>
                Live
              </span>
              <span className="collection-items__header__results">
                {items?.length} results
              </span>
            </div>
            <select
              className="collection-items__header__sort"
              value={sort}
              onChange={(event) => setSort(event.target.value)}
            >
              <option value="" disabled>
                Default
              </option>
              <option value="HIGH_TO_LOW">Price high to low</option>
              <option value="LOW_TO_HIGH">Price low to high</option>
            </select>
          </div>
          <div className="collection-items__body">
            {items?.slice(0, numShown).map((item, index) => (
              <div key={index} className="item-column">
                <Link to={`/item/${item.itemId}`} key={index} className="item">
                  <figure className="item__img__wrapper">
                    <img src={item.imageLink} alt="" className="item__img" />
                  </figure>
                  <div className="item__details">
                    <span className="item__details__name">{item.title}</span>
                    <span className="item__details__price">
                      {item.price} ETH
                    </span>
                    <span className="item__details__last-sale">
                      Last sale: {item.lastSale} ETH
                    </span>
                  </div>
                  <div className="item__see-more">
                    <button className="item__see-more__button">See More</button>
                    <div className="item__see-more__icon">
                      <FontAwesomeIcon icon={faShoppingBag} />
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="row collection-items__row">
          <div className="collection-items__header">
            <div className="collection-items__header__left">
              <span className="collection-items__header__live">
                <Skeleton width="52px" height="16px" borderRadius="4px" />
              </span>
              <span className="collection-items__header__results">
                <Skeleton width="72px" height="16px" borderRadius="4px" />
              </span>
            </div>
            <div>
              <Skeleton width="240px" height="48px" borderRadius="8px" />
            </div>
          </div>
          <div className="collection-items__body">
            {new Array(12).fill().map((_, index) => (
              <div key={index} className="item-column">
                <div className="item">
                  <figure className="item__img__wrapper">
                    <Skeleton key={index} width="100%" height="100%" />
                  </figure>
                  <div className="item__details">
                    <span className="item__details__name">
                      <Skeleton
                        key={index}
                        width="80px"
                        height="16px"
                        borderRadius="4px"
                      />
                    </span>
                    <span className="item__details__price">
                      <Skeleton
                        key={index}
                        width="48px"
                        height="16px"
                        borderRadius="4px"
                      />
                    </span>
                    <span className="item__details__last-sale">
                      <Skeleton
                        key={index}
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
      )}
      {items?.length > 0 && loadVisible ? (
        <button
          className="collection-page__button"
          onClick={() => setNumShown((prev) => prev + 6)}
        >
          Load more
        </button>
      ) : null}
    </section>
  );
}
