import React, { useEffect, useState } from "react";
import SelectedCollection from "../components/home/SelectedCollection";
import { Link } from "react-router-dom";
import Collection from "../components/ui/Collection";
import axios from "axios";
import Skeleton from "../components/ui/Skeleton";

export default function CollectionsPage() {
  const [collections, setCollections] = useState([]);
  const [numShown, setNumShown] = useState(12);
  const [loadVisible, setLoadVisible] = useState(true);

  async function fetchData() {
    const { data } = await axios.get(
      "https://remote-internship-api-production.up.railway.app/collections",
    );

    setCollections(data.data);
  }

  useEffect(() => {
    fetchData();
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (collections.length > 1 && numShown >= collections.length) {
      setLoadVisible(false);
    }
  }, [numShown]);

  return (
    <div className="container">
      <div className="row">
        <h1 className="collections-page__title">Collections</h1>
        <div className="collections__body">
          {collections.length > 0
            ? collections.slice(0, numShown).map((collection, index) => (
                <div className="collection-column">
                  <Collection key={index} collection={collection} />
                </div>
              ))
            : new Array(12).fill().map((_, index) => (
                <div className="collection-column">
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
                </div>
              ))}
        </div>
        {loadVisible ? (
          <button
            className="collections-page__button"
            onClick={() => setNumShown((prev) => prev + 6)}
          >
            Load more
          </button>
        ) : null}
      </div>
    </div>
  );
}
