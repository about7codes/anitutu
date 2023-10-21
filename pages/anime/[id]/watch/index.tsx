import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import {
  Grid,
  Button,
  Typography,
  ButtonGroup,
  Box,
  LinearProgress,
} from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";

import { styles as classes } from "../../../../styles/watchAnime.styles";
import { convertToNumber } from "../../../../utils";
import { useSearchParams } from "next/navigation";

// import { SeriesResult } from "../../../../../../types/apiResponses";
// import TvTileSlider from "../../../../../../components/TvTileSlider/TvTileSlider";
// import {
//   useSeriesById,
//   useSeriesSeasonById,
// } from "../../../../../../hooks/series.hooks";

export const getMediaInfo = async (mediaId: string) => {
  try {
    const mediaRes = await fetch(
      `https://api.consumet.org/anime/gogoanime/info/${mediaId}`
    );
    const mediaData = await mediaRes.json();

    if (mediaData.hasOwnProperty("success"))
      throw new Error("Api call failed, check console.");

    return mediaData;
  } catch (error) {
    console.log(error);
    throw new Error("Api call failed, check console.");
  }
};

export interface MediaInfo {
  id: string;
  title: string;
  url: string;
  genres: string[];
  totalEpisodes: number;
  image: string;
  releaseDate: string;
  description: string;
  subOrDub: "sub" | "dub";
  type: string;
  status: string;
  otherName: string;
  episodes: MediaEpisodeInfo[];
}

export interface MediaEpisodeInfo {
  id: string;
  number: number;
}

type WatchAnimeProps = { params: { id: string } };

export default function WatchAnime(props: WatchAnimeProps) {
  const router = useRouter();
  const animeId = router.query.id;

  const [mediaInfo, setMediaInfo] = useState<MediaInfo | null>(null);

  useEffect(() => {
    (async () => {
      const data = await getMediaInfo(animeId as string);
      setMediaInfo(data);
    })();
  }, []);

  // const searchParams = useSearchParams();

  // const e = searchParams.get("e");
  // const p = searchParams.get("p");

  const { e, p } = router.query;
  const [ep, setEp] = useState(1);
  const [player, setPlayer] = useState<1 | 2 | 3>(1);

  // const { data: tvShowSeasonData, isLoading: isSeasonLoading } =
  //   useSeriesSeasonById(id, seasoncount);
  // const { data: tvShowData, isLoading: isShowLoading } = useSeriesById(id);

  useEffect(() => {
    const eNum = convertToNumber(e || "");
    const pNum = convertToNumber(p || "");

    if (eNum) setEp(eNum);
    if (pNum) {
      if (pNum === 1) setPlayer(pNum);
      if (pNum === 2) setPlayer(pNum);
      if (pNum === 3) setPlayer(pNum);
    }
  }, []);

  // if (isSeasonLoading || isShowLoading) return <LinearProgress />;

  const changePlayer = (playerId: typeof player) => {
    setPlayer((prevPlayerId) => {
      if (prevPlayerId === playerId) return prevPlayerId;

      router.replace(
        {
          pathname: router.asPath.split("?")[0],
          query: { e: ep, p: playerId },
        },
        undefined,
        {
          shallow: true,
        }
      );

      return playerId;
    });
  };

  if (!mediaInfo) return <LinearProgress />;

  console.log(mediaInfo);

  const {
    id,
    title,
    genres,
    totalEpisodes,
    image,
    releaseDate,
    description,
    subOrDub,
    type,
    status,
    otherName,
    episodes,
  } = mediaInfo;

  return (
    <Grid container>
      <Grid item sx={classes.watchHead}>
        <Link href={`/anime/${animeId}`} className="backToInfo">
          <Button
            variant="outlined"
            color="secondary"
            startIcon={<ArrowBackIosNewIcon sx={classes.backIco} />}
            size="small"
          >
            Back to show details
          </Button>
        </Link>
        <Typography sx={{ textTransform: "capitalize", paddingLeft: "10px" }}>
          Watching season {"seasoncount"} episode {"ep"} of{" "}
          {typeof animeId === "string" && animeId?.replaceAll("-", " ")}
        </Typography>
      </Grid>

      <Grid item sx={classes.moviePlayer}>
        <ButtonGroup
          variant="contained"
          aria-label="Media player list"
          sx={classes.btnGroup}
        >
          <Button
            fullWidth
            color={player === 1 ? "secondary" : "primary"}
            onClick={() => changePlayer(1)}
          >
            Player #1
          </Button>
          <Button
            fullWidth
            color={player === 2 ? "secondary" : "primary"}
            onClick={() => changePlayer(2)}
          >
            Player #2
          </Button>
          <Button
            fullWidth
            color={player === 3 ? "secondary" : "primary"}
            onClick={() => changePlayer(3)}
          >
            Player #3
          </Button>
        </ButtonGroup>

        {player === 1 && (
          <div>Player 1</div>
          // <iframe
          //   allowFullScreen
          //   id="watch-iframe1"
          //   src={`${process.env.NEXT_PUBLIC_Player_URL_VS}/${id}/${
          //     seasoncount ? seasoncount : 1
          //   }-${ep}/color-ADDC35`}
          // ></iframe>
        )}

        {player === 2 && (
          <div>Player 2</div>
          // <iframe
          //   allowFullScreen
          //   id="watch-iframe2"
          //   src={`${process.env.NEXT_PUBLIC_Player_URL_SE}video_id=${id}&s=${
          //     seasoncount ? seasoncount : 1
          //   }&e=${ep}`}
          // ></iframe>
        )}

        {player === 3 && (
          <div>Player 3</div>
          // <iframe
          //   allowFullScreen
          //   id="watch-iframe3"
          //   src={`${process.env.NEXT_PUBLIC_Player_URL_AE}/tv/tmdb/${id}-${
          //     seasoncount ? seasoncount : 1
          //   }-${ep}`}
          // ></iframe>
        )}
      </Grid>

      <Grid sx={classes.bottom}>
        <Grid item sx={classes.episodeBtns}>
          {episodes?.map(({ id, number }) => (
            <Box sx={classes.episodeBtnBox} key={id}>
              <Button
                variant="contained"
                sx={classes.episodeBtn}
                color={number === 1 ? "secondary" : "primary"}
                // onClick={() => {
                //   setEp((prevEp) => {
                //     if (prevEp === episode_number) return prevEp;

                //     router.replace(
                //       {
                //         pathname: router.asPath.split("?")[0],
                //         query: { e: episode_number, p: player },
                //       },
                //       undefined,
                //       {
                //         shallow: true,
                //       }
                //     );

                //     return episode_number;
                //   });
                // }}
              >
                Ep {number}
              </Button>
            </Box>
          ))}
        </Grid>
      </Grid>

      {/* {[
          { movieData: recommendations?.results, title: "Recommended for you" },
          { movieData: similar?.results, title: "Related shows" },
        ].map(({ movieData, title }) => (
          <Grid item sx={classes.mustWatch} key={title}>
            <TvTileSlider title={title} seriesData={movieData} />
          </Grid>
        ))} */}
    </Grid>
  );
}
