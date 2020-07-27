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
import ReactPlayer from "react-player";

function SongPlayer() {
  const { data } = useQuery(GET_QUEUE_SONGS);
  const reactPlayerRef = React.useRef();
  const { state, dispatch } = React.useContext(SongContext);
  const classes = SongPlayerStyles();
  const [seeking, setSeeking] = React.useState(false);
  const [played, setPlayed] = React.useState(0);
  const [playedSeconds, setPlayedSeconds] = React.useState(0);
  const [songQueueIndex, setSongQueueIndex] = React.useState(0);

  React.useEffect(() => {
    const index = data.queue.findIndex((song) => song.id === state.song.id);
    setSongQueueIndex(index);
  }, [data.queue, state.song.id]);

  React.useEffect(() => {
    const nextSong = data.queue[songQueueIndex + 1];
    if (played >= .99 && nextSong) {
      setPlayed(0);
      dispatch({ type: "SET_SONG", payload: { song: nextSong } });
    }
  }, [data.queue, played, dispatch, songQueueIndex]);

  function handleTogglePlay() {
    dispatch(state.isPlaying ? { type: "PAUSE_SONG" } : { type: "PLAY_SONG" });
  }

  function handleProgressChange(event, newValue) {
    setPlayed(newValue);
  }

  function formatDuration(seconds) {
    return new Date(seconds * 1000).toISOString().substr(11, 8);
  }

  function handleNextSong() {
    const prevSong = data.queue[songQueueIndex + 1];
    if (prevSong) {
      dispatch({type: "SET_SONG", payload: {song: prevSong}});
    }
  }

  function handlePrevSong() {
    const prevSong = data.queue[songQueueIndex - 1];
    if (prevSong) {
      dispatch({type: "SET_SONG", payload: {song: prevSong}});
    }
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
            <IconButton onClick={handlePrevSong}>
              <SkipPrevious />
            </IconButton>
            <IconButton onClick={handleTogglePlay}>
              {state.isPlaying ? (
                <Pause className={classes.playIcon} />
              ) : (
                <PlayArrow className={classes.playIcon} />
              )}
            </IconButton>
            <IconButton onClick={handleNextSong}>
              <SkipNext />
            </IconButton>
            <Typography
              className={classes.songLength}
              variant="subtitle1"
              component="p"
              color="textSecondary"
            >
              {formatDuration(playedSeconds)}
            </Typography>
          </div>
          <Slider
            onMouseDown={() => {
              setSeeking(true);
            }}
            onMouseUp={() => {
              setSeeking(false);
              reactPlayerRef.current.seekTo(played);
            }}
            onChange={handleProgressChange}
            type="range"
            min={0}
            max={1}
            step={0.01}
            value={played}
          />
        </div>
        <ReactPlayer
          ref={reactPlayerRef}
          onProgress={({ played, playedSeconds }) => {
            if (!seeking) {
              setPlayed(played);
              setPlayedSeconds(playedSeconds);
            }
          }}
          hidden
          url={state.song.url}
          playing={state.isPlaying}
        />
        <CardMedia className={classes.thumbnail} image={state.song.thumbnail} />
      </Card>
      <QueueSongList queue={data.queue} />
    </>
  );
}

export default SongPlayer;
