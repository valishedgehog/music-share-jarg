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
import { SkipPrevious, SkipNext, PlayArrow, Pause } from "@material-ui/icons";
import SongPlayerStyles from "../materialStyles/SongPlayerStyles";
import { SongContext } from "../App";
import { useQuery } from "@apollo/react-hooks";
import { GET_QUEUE_SONGS } from "../graphql/queries";

function SongPlayer() {
  const { data } = useQuery(GET_QUEUE_SONGS);
  const { state, dispatch } = React.useContext(SongContext);
  const classes = SongPlayerStyles();

  function handleTogglePlay() {
    dispatch(state.isPlaying ? { type: "PAUSE_SONG" } : { type: "PLAY_SONG" });
  }

  return (
    <>
      <Card variant="outlined" className={classes.container}>
        <div className={classes.details}>
          <CardContent className={classes.content}>
            <Typography variant="h5" component="h3">
              {state.song.title}
            </Typography>
            <Typography variant="subtitle1" component="p" color="textSecondary">
              {state.song.artist}
            </Typography>
          </CardContent>
          <div className={classes.controls}>
            <IconButton>
              <SkipPrevious />
            </IconButton>
            <IconButton onClick={handleTogglePlay}>
              {state.isPlaying ? (
                <Pause className={classes.playIcon} />
              ) : (
                <PlayArrow className={classes.playIcon} />
              )}
            </IconButton>
            <IconButton>
              <SkipNext />
            </IconButton>
            <Typography
              className={classes.songLength}
              variant="subtitle1"
              component="p"
              color="textSecondary"
            >
              00:01:30
            </Typography>
          </div>
          <Slider type="range" min={0} max={1} step={0.01} />
        </div>
        <CardMedia className={classes.thumbnail} image={state.song.thumbnail} />
      </Card>
      <QueueSongList queue={data.queue} />
    </>
  );
}

export default SongPlayer;
