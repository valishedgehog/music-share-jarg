import React from "react";
import {
  CircularProgress,
  Card,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  IconButton,
} from "@material-ui/core";
import {
  SongListStyles,
  SongItemStyles,
} from "../materialStyles/SongListStyles";
import { PlayArrow, Save } from "@material-ui/icons";

function SongList() {
  const classes = SongListStyles();

  const song = {
    title: "Hello",
    author: "World",
    thumbnail: "https://i1.sndcdn.com/avatars-000355550567-5e42tb-t500x500.jpg",
  };

  let loading = false;
  if (loading) {
    return (
      <div className={classes.loadingProgress}>
        <CircularProgress />
      </div>
    );
  }

  return (
    <div>
      {Array.from({ length: 10 }, () => song).map((song, i) => (
        <SongItem key={i} song={song} />
      ))}
    </div>
  );
}

function SongItem({ song }) {
  const classes = SongItemStyles();
  const { title, author, thumbnail } = song;

  return (
    <Card className={classes.container}>
      <div className={classes.songInfoContainer}>
        <CardMedia image={thumbnail} className={classes.thumbnail} />
        <div className={classes.songInfo}>
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {title}
            </Typography>
            <Typography
              gutterBottom
              variant="body1"
              component="p"
              color="textSecondary"
            >
              {author}
            </Typography>
          </CardContent>
          <CardActions>
            <IconButton size="medium" color="primary">
              <PlayArrow />
            </IconButton>
            <IconButton size="medium" color="primary">
              <Save color="secondary" />
            </IconButton>
          </CardActions>
        </div>
      </div>
    </Card>
  );
}

export default SongList;
