import React from "react";
import {
  Typography,
  Avatar,
  IconButton,
  useMediaQuery,
} from "@material-ui/core";
import { Delete } from "@material-ui/icons";
import QueueSongStyles from "../materialStyles/QueueSongStyles";

function QueueSongList() {
  const greaterThenMedium = useMediaQuery((theme) => theme.breakpoints.up("md"));

  const song = {
    title: "Hello",
    author: "World",
    thumbnail: "https://i1.sndcdn.com/avatars-000355550567-5e42tb-t500x500.jpg",
  };

  return (
    greaterThenMedium && (
      <div style={{ margin: "10px 0" }}>
        <Typography color="textSecondary" variant="button">
          QUEUE (5)
        </Typography>
        {Array.from({ length: 5 }, () => song).map((song, i) => (
          <QueueSongItem key={i} song={song} />
        ))}
      </div>
    )
  );
}

function QueueSongItem({ song }) {
  const classes = QueueSongStyles();

  const { thumbnail, title, artist } = song;

  return (
    <div className={classes.container}>
      <Avatar className={classes.avatar} src={thumbnail} alt="Song thumbnail" />
      <div className={classes.songInfoContainer}>
        <Typography className={classes.text} variant="subtitle2">
          {title}
        </Typography>
        <Typography
          className={classes.text}
          color="textSecondary"
          variant="body2"
        >
          {artist}
        </Typography>
      </div>
      <IconButton>
        <Delete color="error" />
      </IconButton>
    </div>
  );
}

export default QueueSongList;
