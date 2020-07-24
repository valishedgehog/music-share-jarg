import React from "react";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  IconButton,
} from "@material-ui/core";
import { PlayArrow, Save } from "@material-ui/icons";
import SongItemStyles from "../materialStyles/SongItemStyles";

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

export default SongItem;
