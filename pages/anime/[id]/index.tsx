import React, { useEffect, useState } from "react";
import Link from "next/link";
import { formatImgSrc } from "../../../utils";
import { Grid, Box, Typography, Button, LinearProgress } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { styles as classes } from "../../../styles/animeDetails.styles";
import { useRouter } from "next/router";

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

type AnimeDetailsProps = { params: { id: string } };

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

export default function AnimeDetails(props: AnimeDetailsProps) {
  // let mediaInfo: MediaInfo | undefined = undefined;
  const router = useRouter();
  const animeId = router.query.id;

  const [mediaInfo, setMediaInfo] = useState<MediaInfo | null>(null);

  useEffect(() => {
    (async () => {
      const data = await getMediaInfo(animeId as string);
      setMediaInfo(data);
    })();
  }, []);

  console.log(mediaInfo);

  if (!mediaInfo) return <LinearProgress />;

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
    <>
      {/* <CustomHead title={name} media_type="tv" /> */}
      <Grid sx={classes.main}>
        <Grid item sx={classes.top}>
          <Box
            sx={classes.backgroundCover}
            style={{
              backgroundImage: `url(${image})`,
            }}
          ></Box>
          <Box sx={classes.imageBox}>
            <LazyLoadImage
              placeholderSrc="/assets/flixtr-placeholder.svg"
              src={formatImgSrc("", image)}
              style={
                image
                  ? {
                      objectFit: "cover",
                      objectPosition: "top",
                      width: "100%",
                      height: "100%",
                    }
                  : {
                      objectFit: "contain",
                      objectPosition: "center",
                      width: "100%",
                      height: "100%",
                    }
              }
              effect="blur"
              alt={title}
            />
          </Box>
          <Box sx={classes.detailMid}>
            <Box>
              <Typography variant="h4" sx={classes.mediaTitle}>
                {title}
              </Typography>
              <Grid sx={classes.belowTitle}>
                <Grid item>Series</Grid>
                <Grid item>{subOrDub === "sub" ? "Subbed" : "Dubbed"}</Grid>
              </Grid>
            </Box>
            <Box sx={classes.mediaBtns}>
              {
                <Link
                  href={`/anime/${id}/watch`}
                  style={{ WebkitTapHighlightColor: "transparent" }}
                >
                  <Button
                    variant="contained"
                    color="secondary"
                    sx={classes.watchBtn}
                  >
                    Watch episode 1
                  </Button>
                </Link>
              }

              {false ? (
                <LoadingButton
                  // loading={isLoadingRemove}
                  variant="outlined"
                  color="error"
                  sx={classes.watchlistBtn}
                  // onClick={handleRemoveWatchlist}
                >
                  Remove from watchlist
                </LoadingButton>
              ) : (
                <LoadingButton
                  // loading={isLoadingPost}
                  variant="outlined"
                  color="secondary"
                  sx={classes.watchlistBtn}
                  // onClick={handleAddToWatchlist}
                >
                  Add to watchlist
                </LoadingButton>
              )}
            </Box>
            <Box>
              <Typography variant="body1" sx={classes.overview}>
                {description}
              </Typography>
            </Box>
          </Box>

          <Box sx={classes.detailLast}>
            <Grid>
              <Grid item sx={classes.bulletHead}>
                Genres:{" "}
              </Grid>
              <Grid item sx={classes.bulletInfo}>
                {genres?.map((genre, index) => (
                  <React.Fragment key={genre}>
                    {genre}
                    {index < genres.length - 1 && ", "}
                  </React.Fragment>
                ))}
              </Grid>
            </Grid>

            <Grid>
              <Grid item sx={classes.bulletHead}>
                Status:{" "}
              </Grid>
              <Grid item sx={classes.bulletInfo}>
                {status}
              </Grid>
            </Grid>
            <Grid>
              <Grid item sx={classes.bulletHead}>
                Release Year:{" "}
              </Grid>
              <Grid item sx={classes.bulletInfo}>
                {releaseDate || "N/A"}
              </Grid>
            </Grid>
            <Grid>
              <Grid item sx={classes.bulletHead}>
                Release:{" "}
              </Grid>
              <Grid item sx={classes.bulletInfo}>
                {type}
              </Grid>
            </Grid>

            <Grid>
              <Grid item sx={classes.bulletHead}>
                Total episodes:{" "}
              </Grid>
              <Grid item sx={classes.bulletInfo}>
                {totalEpisodes}
              </Grid>
            </Grid>

            <Grid>
              <Grid item sx={classes.bulletHead}>
                Language:{" "}
              </Grid>
              <Grid item sx={classes.bulletInfo}>
                {subOrDub === "sub" ? "Japanese" : "English"}
              </Grid>
            </Grid>

            <Grid>
              <Grid item sx={classes.bulletHead}>
                Other names:{" "}
              </Grid>
              <Grid item sx={classes.bulletInfo}>
                {otherName}
              </Grid>
            </Grid>
          </Box>
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
      </Grid>
    </>
  );
}
