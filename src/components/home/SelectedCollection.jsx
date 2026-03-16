import React, { useEffect, useState } from "react";
import VerifiedIcon from "../../assets/verified.png";
import { Link } from "react-router-dom";
import axios from "axios";
import Skeleton from "../ui/Skeleton";

export default function SelectedCollection() {
  const [data, setData] = useState(null);

  async function fetchData() {
    const { data } = await axios.get(
      "https://remote-internship-api-production.up.railway.app/selectedCollection",
    );
    setData(data.data);
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <header>
      {data ? (
        <div className="selected-collection">
          <video
            autoPlay
            muted
            loop
            playsInline
            poster={data.thumbnail}
            src={data.videoLink}
            className="selected-collection__bg"
          />
          <div className="selected-collection__description">
            <img src={data.logo} alt="" className="selected-collection__logo" />
            <h1 className="selected-collection__title">{data.title}</h1>
            <Link to={"/user"} className="selected-collection__author">
              By {data.creator}
              <img
                src={VerifiedIcon}
                className="selected-collection__author__verified"
              />
            </Link>
            <div className="selected-collection__details">
              {data.amountOfItems} items · {data.floorPrice} ETH
            </div>
            <Link to={"/collection"} className="selected-collection__button">
              <div className="green-pulse"></div>
              View Collection
            </Link>
          </div>
        </div>
      ) : (
        <Skeleton
          width="100%"
          height="calc(-35.584px + 27.8vw)"
          borderRadius="0"
        />
      )}
    </header>
  );
}
