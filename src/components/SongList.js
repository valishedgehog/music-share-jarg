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
import { PlayArrow, Save, Pause } from "@material-ui/icons";
import { useSubscription, useMutation } from "@apollo/react-hooks";
import { GET_SONGS_SUB } from "../graphql/subscriptions";
import { SongContext } from "../App";
import { ADD_OR_REMOVE_FROM_QUEUE } from "../graphql/mutations";

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
  const { id } = song;
  const classes = SongItemStyles();
  const { state, dispatch } = React.useContext(SongContext);
  const [currentSongPlaying, setCurrentSongPlaying] = React.useState(false);
  const { title, author, thumbnail } = song;
  const [addOrRemoveFromQueue] = useMutation(ADD_OR_REMOVE_FROM_QUEUE, {
    onCompleted: (data) => {
      localStorage.setItem("queue", JSON.stringify(data.addOrRemoveFromQueue));
    },
  });

  function handleQueueToggle() {
    addOrRemoveFromQueue({
      variables: {
        input: { ...song, __typename: "Song" },
      },
    });
  }

  function handleTogglePlay() {
    dispatch({ type: "SET_SONG", payload: { song } });
    if (state.isPlaying && state.song.id === id)
      dispatch({ type: "PAUSE_SONG" });
    else dispatch({ type: "PLAY_SONG" });
  }

  React.useEffect(() => {
    const isSongPlaying = state.isPlaying && id === state.song.id;
    setCurrentSongPlaying(isSongPlaying);
  }, [id, state.song.id, state.isPlaying]);

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
            <IconButton
              onClick={handleTogglePlay}
              size="medium"
              color="primary"
            >
              {currentSongPlaying ? <Pause /> : <PlayArrow />}
            </IconButton>
            <IconButton
              onClick={handleQueueToggle}
              size="medium"
              color="primary"
            >
              <Save color="secondary" />
            </IconButton>
          </CardActions>
        </div>
      </div>
    </Card>
  );
}

export default SongList;
