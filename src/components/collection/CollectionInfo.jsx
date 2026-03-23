import React from "react";
import Skeleton from "../ui/Skeleton";

export default function CollectionInfo({ collection }) {
  return (
    <section id="collection-info">
      <div className="row">
        {Object.keys(collection).length ? (
          <div className="collection-info__wrapper">
            <p className="collection-info__description">
              {collection.description}
            </p>
            <div className="collection-info__details">
              <span className="collection-info__detail">
                Items
                <span className="collection-info__detail__data">
                  {" "}
                  {collection?.items?.length}
                </span>
              </span>
              ·
              <span className="collection-info__detail">
                Created
                <span className="collection-info__detail__data">
                  {" "}
                  {collection.createdDate}
                </span>
              </span>
              ·
              <span className="collection-info__detail">
                Creator earnings
                <span className="collection-info__detail__data">
                  {" "}
                  {collection.creatorEarnings}%
                </span>
              </span>
              ·
              <span className="collection-info__detail">
                Chain
                <span className="collection-info__detail__data">
                  {" "}
                  {collection.chain}
                </span>
              </span>
            </div>
          </div>
        ) : (
          <div className="collection-info__wrapper">
            <div className="collection-info__description">
              <Skeleton width="100%" height="16px" borderRadius="4px" />
              <Skeleton width="100%" height="16px" borderRadius="4px" />
              <Skeleton width="70%" height="16px" borderRadius="4px" />
            </div>
            <div className="collection-info__details">
              <span className="collection-info__detail">
                <Skeleton width="58px" height="16px" borderRadius="4px" />
              </span>
              ·
              <span className="collection-info__detail">
                <Skeleton width="120px" height="16px" borderRadius="4px" />
              </span>
              ·
              <span className="collection-info__detail">
                <Skeleton width="132px" height="16px" borderRadius="4px" />
              </span>
              ·
              <span className="collection-info__detail">
                <Skeleton width="108px" height="16px" borderRadius="4px" />
              </span>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
