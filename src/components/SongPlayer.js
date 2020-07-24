import React from "react";
import QueueSongList from "./QueueSongList";
import {
  Card,
  CardContent,
  Typography,
  IconButton,
  Slider,
  CardMedia,
} from "@material-ui/core";
import { SkipPrevious, SkipNext, PlayArrow } from "@material-ui/icons";
import SongPlayerStyles from "../materialStyles/SongPlayerStyles";

function SongPlayer() {
  const classes = SongPlayerStyles();

  return (
    <>
      <Card variant="outlined" className={classes.container}>
        <div className={classes.details}>
          <CardContent className={classes.content}>
            <Typography variant="h5" component="h3">
              Title
            </Typography>
            <Typography variant="subtitle1" component="p" color="textSecondary">
              Title
            </Typography>
          </CardContent>
          <div className={classes.controls}>
            <IconButton>
              <SkipPrevious />
            </IconButton>
            <IconButton>
              <PlayArrow className={classes.playIcon} />
            </IconButton>
            <IconButton>
              <SkipNext />
            </IconButton>
            <Typography className={classes.songLength} variant="subtitle1" component="p" color="textSecondary">
              00:01:30
            </Typography>
          </div>
          <Slider type="range" min={0} max={1} step={0.01} />
        </div>
        <CardMedia
          className={classes.thumbnail}
          image="https://i1.sndcdn.com/avatars-000355550567-5e42tb-t500x500.jpg"
        />
      </Card>
      <QueueSongList />
    </>
  );
}

export default SongPlayer;
