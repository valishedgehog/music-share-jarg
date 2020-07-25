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
import { useSubscription } from "@apollo/react-hooks";
import { GET_SONGS_SUB } from "../graphql/subscriptions";

function SongList() {
  const { data, loading, error } = useSubscription(GET_SONGS_SUB);
  const classes = SongListStyles();

  if (loading) {
    return (
      <div className={classes.loadingProgress}>
        <CircularProgress />
      </div>
    );
  }

  if (error) return <div>Error fetching songs</div>;

  return (
    <div>
      {data.songs.map((song) => (
        <SongItem key={song.id} song={song} />
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
