import React, { useEffect, useState } from "react";
import CollectionHeader from "../components/collection/CollectionHeader";
import CollectionInfo from "../components/collection/CollectionInfo";
import CollectionItems from "../components/collection/CollectionItems";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function CollectionPage() {
  const { id } = useParams();
  const [collection, setCollection] = useState([]);
  const [items, setItems] = useState([]);

  async function fetchData() {
    const { data } = await axios.get(
      `https://remote-internship-api-production.up.railway.app/collection/${id}`,
    );

    setCollection(data.data);
    setItems(data.data.items);
  }

  useEffect(() => {
    fetchData();
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <CollectionHeader collection={collection} />
      <CollectionInfo collection={collection} />
      <CollectionItems items={items} setItems={setItems} />
    </>
  );
}
