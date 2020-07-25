import React from "react";
import {
  TextField,
  InputAdornment,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@material-ui/core";
import { useMutation } from "@apollo/react-hooks";
import { LinkOutlined, AddBoxOutlined } from "@material-ui/icons";
import AddSongStyles from "../materialStyles/AddSongStyles";
import ReactPlayer from "react-player";
import SoundcloudPlayer from "react-player/lib/players/SoundCloud";
import YoutubePlayer from "react-player/lib/players/YouTube";
import { INSERT_SONG } from "../graphql/mutations";

const DEFAULT_SONG = {
  title: "",
  duration: null,
  artist: "",
  thumbnail: "",
};

function AddSong() {
  const classes = AddSongStyles();
  const [addSong, { error }] = useMutation(INSERT_SONG);
  const [url, setUrl] = React.useState("");
  const [playable, setPlayable] = React.useState(false);
  const [dialog, setDialog] = React.useState(false);
  const [song, setSong] = React.useState(DEFAULT_SONG);

  React.useEffect(() => {
    const isPlayable =
      SoundcloudPlayer.canPlay(url) || YoutubePlayer.canPlay(url);
    setPlayable(isPlayable);
  }, [url]);

  function handleChangeSong(event) {
    const { name, value } = event.target;
    setSong((prevSong) => ({
      ...prevSong,
      [name]: value,
    }));
  }

  async function handleEditSong({ player }) {
    const nestedPlayer = player.player.player;
    let songData;
    if (nestedPlayer.getVideoData) {
      songData = getYoutubeInfo(nestedPlayer);
    } else if (nestedPlayer.getCurrentSound) {
      songData = await getSoundCloudInfo(nestedPlayer);
    }

    setSong({ ...songData, url });
  }

  function getSoundCloudInfo(player) {
    return new Promise((resolve) => {
      player.getCurrentSound((songData) => {
        if (songData) {
          resolve({
            duration: Number(songData.duration / 1000),
            title: songData.title,
            artist: songData.user.username,
            thumbnail: songData.artwork_url.replace("-large", "-t500x500"),
          });
        }
      });
    });
  }

  function getYoutubeInfo(player) {
    const duration = player.getDuration();
    const { title, video_id, author } = player.getVideoData();
    const thumbnail = `https://img.youtube.com/vi/${video_id}/0.jpg`;
    return {
      duration,
      title,
      artist: author,
      thumbnail,
    };
  }

  function handleCloseDialog() {
    setDialog(false);
    setSong(DEFAULT_SONG);
    setUrl("");
  }

  async function handleAddSong() {
    try {
      const { url, thumbnail, duration, title, artist } = song;
      await addSong({
        variables: {
          url: url.length > 0 ? url : null,
          thumbnail: thumbnail.length > 0 ? thumbnail : null,
          duration: duration > 0 ? duration : null,
          title: title.length > 0 ? title : null,
          artist: artist.length > 0 ? artist : null,
        },
      });
      handleCloseDialog();
    } catch (error) {
      console.error("Error adding song", song);
    }
  }

  function handleError(field) {
    return error?.graphQLErrors[0]?.extensions?.path?.includes(field);
  }

  const { thumbnail, title, artist } = song;
  return (
    <div className={classes.container}>
      <Dialog
        open={dialog}
        onClose={handleCloseDialog}
        className={classes.dialog}
      >
        <DialogTitle>Edit song</DialogTitle>
        <DialogContent>
          <img
            src={thumbnail}
            alt="Song thumbnail"
            className={classes.thumbnail}
          ></img>
          <TextField
            value={title}
            onChange={handleChangeSong}
            margin="dense"
            name="title"
            label="Title"
            fullWidth
            error={handleError('title')}
            helperText={handleError('title') && 'Fill out this field'}
          />
          <TextField
            value={artist}
            onChange={handleChangeSong}
            margin="dense"
            name="artist"
            label="Artist"
            fullWidth
            error={handleError('artist')}
            helperText={handleError('artist') && 'Fill out this field'}
          />
          <TextField
            value={thumbnail}
            onChange={handleChangeSong}
            margin="dense"
            name="thumbnail"
            label="Thumbnail"
            fullWidth
            error={handleError('thumbnail')}
            helperText={handleError('thumbnail') && 'Fill out this field'}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="secondary">
            Cancel
          </Button>
          <Button variant="contained" onClick={handleAddSong} color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog>
      <TextField
        onChange={(event) => setUrl(event.target.value)}
        value={url}
        placeholder="Add youtube or Soundcloud Url"
        fullWidth
        margin="normal"
        type="url"
        InputProps={{
          "aria-label": "url",
          startAdornment: (
            <InputAdornment position="start">
              <LinkOutlined />
            </InputAdornment>
          ),
        }}
        className={classes.urlInput}
      />
      <Button
        disabled={!playable}
        className={classes.addSongButton}
        variant="contained"
        endIcon={<AddBoxOutlined />}
        color="primary"
        onClick={() => setDialog(true)}
      >
        Add
      </Button>
      <ReactPlayer url={url} hidden onReady={handleEditSong} />
    </div>
  );
}

export default AddSong;
