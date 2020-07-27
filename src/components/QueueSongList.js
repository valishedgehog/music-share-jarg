import React from "react";
import {
  Typography,
  Avatar,
  IconButton,
  useMediaQuery,
} from "@material-ui/core";
import { Delete } from "@material-ui/icons";
import QueueSongStyles from "../materialStyles/QueueSongStyles";
import { useMutation } from "@apollo/react-hooks";
import { ADD_OR_REMOVE_FROM_QUEUE } from "../graphql/mutations";

function QueueSongList({ queue }) {
  console.log(queue);
  const greaterThenMedium = useMediaQuery((theme) =>
    theme.breakpoints.up("md")
  );

  return (
    greaterThenMedium && (
      <div style={{ margin: "10px 0" }}>
        <Typography color="textSecondary" variant="button">
          QUEUE ({queue.length})
        </Typography>
        {queue.map((song, i) => (
          <QueueSongItem key={i} song={song} />
        ))}
      </div>
    )
  );
}

function QueueSongItem({ song }) {
  const classes = QueueSongStyles();
  const [addOrRemoveFromQueue] = useMutation(ADD_OR_REMOVE_FROM_QUEUE, {
    onCompleted: (data) => {
      localStorage.setItem("queue", JSON.stringify(data.addOrRemoveFromQueue));
    },
  });
  const { thumbnail, title, artist } = song;

  function handleQueueToggle() {
    addOrRemoveFromQueue({
      variables: {
        input: { ...song, __typename: "Song" },
      },
    });
  }

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
      <IconButton onClick={handleQueueToggle}>
        <Delete color="error" />
      </IconButton>
    </div>
  );
}

export default QueueSongList;
