import React, { useEffect, useState } from "react";
import VerifiedIcon from "../../assets/verified.png";
import TrendingCollection from "../../assets/trending-collection.avif";
import { Link } from "react-router-dom";
import axios from "axios";
import Skeleton from "../ui/Skeleton";

export default function Trending() {
  const [trending, setTrending] = useState([]);

  async function fetchData() {
    const { data } = await axios.get(
      "https://remote-internship-api-production.up.railway.app/trendingNFTs",
    );
    setTrending(data.data);
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <section id="trending">
      <div className="container">
        <div className="row trending__row">
          <div className="trending__header">
            <h2 className="trending__header__title">Trending NFTs</h2>
            <Link className="trending__header__button" to={"/collections"}>
              View All
            </Link>
          </div>
          <div className="trending__body">
            <div className="trending-column">
              <div className="trending-column__header">
                <div className="trending-column__header__rank">#</div>
                <div className="trending-column__header__collection">
                  Collection
                </div>
                <div className="trending-column__header__price">
                  Floor Price
                </div>
                <div className="trending-column__header__price">Volume</div>
              </div>
              <div className="trending-column__body">
                {trending.length > 0
                  ? trending.slice(0, 5).map((nft) => (
                      <Link
                        to={`/collection/${nft.collectionId}`}
                        key={nft?.rank}
                        className="trending-collection"
                      >
                        <div className="trending-collection__rank">
                          {nft?.rank}
                        </div>
                        <div className="trending-collection__collection">
                          <figure className="trending-collection__img__wrapper">
                            <img
                              src={nft?.imageLink}
                              alt=""
                              className="trending-collection__img"
                            />
                          </figure>
                          <div className="trending-collection__name">
                            {nft?.title}
                          </div>
                          <img
                            src={VerifiedIcon}
                            className="trending-collection__verified"
                          />
                        </div>
                        <div className="trending-collection__price">
                          <span className="trending-collection__price__span">
                            {Number(nft?.floor).toFixed(2)} ETH
                          </span>
                        </div>
                        <div className="trending-collection__volume">
                          <span className="trending-collection__volume__span">
                            {nft?.totalVolume} ETH
                          </span>
                        </div>
                      </Link>
                    ))
                  : new Array(5).fill().map((_, index) => (
                      <div className="trending-collection">
                        <div className="trending-collection__rank"></div>
                        <div className="trending-collection__collection">
                          <figure className="trending-collection__img__wrapper">
                            <Skeleton
                              key={index}
                              width="72px"
                              height="72px"
                              borderRadius="12px"
                            />
                          </figure>
                          <div className="trending-collection__name">
                            <Skeleton
                              key={index}
                              width="132px"
                              height="20px"
                              borderRadius="0px"
                            />
                          </div>
                        </div>
                        <div className="trending-collection__price">
                          <span className="trending-collection__price__span">
                            <Skeleton
                              key={index}
                              width="80px"
                              height="20px"
                              borderRadius="0px"
                            />
                          </span>
                        </div>
                        <div className="trending-collection__volume">
                          <span className="trending-collection__volume__span">
                            <Skeleton
                              key={index}
                              width="80px"
                              height="20px"
                              borderRadius="0px"
                            />
                          </span>
                        </div>
                      </div>
                    ))}
              </div>
            </div>
            <div className="trending-column">
              <div className="trending-column__header trending-column__header2">
                <div className="trending-column__header__rank">#</div>
                <div className="trending-column__header__collection">
                  Collection
                </div>
                <div className="trending-column__header__price">
                  Floor Price
                </div>
                <div className="trending-column__header__price">Volume</div>
              </div>
              <div className="trending-column__body">
                {trending.length > 0
                  ? trending.slice(5, 10).map((nft) => (
                      <Link
                        to={`/collection/${nft.collectionId}`}
                        key={nft?.rank}
                        className="trending-collection"
                      >
                        <div className="trending-collection__rank">
                          {nft?.rank}
                        </div>
                        <div className="trending-collection__collection">
                          <figure className="trending-collection__img__wrapper">
                            <img
                              src={nft?.imageLink}
                              alt=""
                              className="trending-collection__img"
                            />
                          </figure>
                          <div className="trending-collection__name">
                            {nft?.title}
                          </div>
                          <img
                            src={VerifiedIcon}
                            className="trending-collection__verified"
                          />
                        </div>
                        <div className="trending-collection__price">
                          <span className="trending-collection__price__span">
                            {Number(nft?.floor).toFixed(2)} ETH
                          </span>
                        </div>
                        <div className="trending-collection__volume">
                          <span className="trending-collection__volume__span">
                            {nft?.totalVolume} ETH
                          </span>
                        </div>
                      </Link>
                    ))
                  : new Array(5).fill().map((_, index) => (
                      <div className="trending-collection">
                        <div className="trending-collection__rank"></div>
                        <div className="trending-collection__collection">
                          <figure className="trending-collection__img__wrapper">
                            <Skeleton
                              key={index}
                              width="72px"
                              height="72px"
                              borderRadius="12px"
                            />
                          </figure>
                          <div className="trending-collection__name">
                            <Skeleton
                              key={index}
                              width="132px"
                              height="20px"
                              borderRadius="0px"
                            />
                          </div>
                        </div>
                        <div className="trending-collection__price">
                          <span className="trending-collection__price__span">
                            <Skeleton
                              key={index}
                              width="80px"
                              height="20px"
                              borderRadius="0px"
                            />
                          </span>
                        </div>
                        <div className="trending-collection__volume">
                          <span className="trending-collection__volume__span">
                            <Skeleton
                              key={index}
                              width="80px"
                              height="20px"
                              borderRadius="0px"
                            />
                          </span>
                        </div>
                      </div>
                    ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
