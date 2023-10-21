import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import MediaSlider from "../components/MediaSlider";
import { LinearProgress } from "@mui/material";
import { useEffect, useState } from "react";

export const getRecentSeries = async (pageNum: number) => {
  try {
    const seriesRes = await fetch(
      `https://api.consumet.org/anime/gogoanime/top-airing?page=${pageNum || 1}`
    );
    const seriesData = await seriesRes.json();

    if (seriesData.hasOwnProperty("success"))
      throw new Error("Api call failed, check console.");

    return seriesData;
  } catch (error) {
    console.log(error);
    throw new Error("Api call failed, check console.");
  }
};

export default function Home() {
  const [series, setSeries] = useState<any | null>(null);

  useEffect(() => {
    (async () => {
      const data = await getRecentSeries(1);
      setSeries(data);
    })();
  }, []);

  // console.log(mediaInfo);

  if (!series) return <LinearProgress />;

  return (
    <main>
      Home Anime:
      <MediaSlider title="Anime series" mediaData={series.results} />
    </main>
  );
}
