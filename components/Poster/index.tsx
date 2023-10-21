import React from "react";
import Link from "next/link";
// import Image from "next/image";
import { Box, CircularProgress, Typography } from "@mui/material";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

import { styles as classes } from "./poster.styles";
// import { MovieResult } from "../../types/apiResponses";
import { formatImgSrc, toPercent, toUrlFriendly } from "../../utils";
import { Media } from "../MediaSlider";

type PosterProps = {
  singleMediaData: Media;
};

const Poster = ({ singleMediaData }: PosterProps) => {
  // console.log("singleMovieData:", singleMovieData);
  const { id, title, image } = singleMediaData;
  // const titleConverted = toUrlFriendly(title);

  return (
    <Box sx={classes.poster}>
      <Link
        shallow
        href={`/anime/${id}`}
        style={{ WebkitTapHighlightColor: "transparent" }}
      >
        <Box sx={classes.posterUp}>
          <LazyLoadImage
            placeholderSrc="/assets/flixtr-placeholder.svg"
            src={formatImgSrc("", image)}
            style={{
              objectFit: "cover",
              objectPosition: "top",
              width: "100%",
              height: "100%",
            }}
            className="poster-img"
            alt={id}
            effect="blur"
          />
        </Box>
        <Box sx={classes.posterDown}>
          <Typography
            variant="subtitle2"
            sx={classes.posterTitle}
            title={title}
          >
            {title}
          </Typography>
          <Box sx={classes.posterYearMain}>
            <Typography variant="subtitle2" sx={classes.posterYear}>
              {new Date().getFullYear()}
            </Typography>
            <Typography variant="subtitle2" sx={classes.posterType}>
              Movie
            </Typography>
          </Box>
        </Box>

        {/* {vote_average ? (
          <Box sx={classes.ratings}>
            <Box sx={classes.ratingsInner}>
              <CircularProgress
                color="secondary"
                variant="determinate"
                value={toPercent(vote_average)}
              />
              <Box sx={classes.ratingsTxt}>
                <Typography
                  title="Ratings"
                  variant="caption"
                  component="div"
                  color="secondary"
                >{`${toPercent(vote_average)}%`}</Typography>
              </Box>
            </Box>
          </Box>
        ) : null} */}
      </Link>
    </Box>
  );
};

export default Poster;
