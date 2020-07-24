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
import { LinkOutlined, AddBoxOutlined } from "@material-ui/icons";
import AddSongStyles from "../materialStyles/AddSongStyles";

function AddSong() {
  const classes = AddSongStyles();

  const [dialog, setDialog] = React.useState(false);

  function handleCloseDialog() {
    setDialog(false);
  }

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
            src="https://i1.sndcdn.com/avatars-000355550567-5e42tb-t500x500.jpg"
            alt="Song thumbnail"
            className={classes.thumbnail}
          ></img>
          <TextField margin="dense" name="title" label="Title" fullWidth />
          <TextField margin="dense" name="artist" label="Artist" fullWidth />
          <TextField
            margin="dense"
            name="thumbnail"
            label="Thumbnail"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="secondary">
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={handleCloseDialog}
            color="primary"
          >
            Add
          </Button>
        </DialogActions>
      </Dialog>
      <TextField
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
        className={classes.addSongButton}
        variant="contained"
        endIcon={<AddBoxOutlined />}
        color="primary"
        onClick={() => setDialog(true)}
      >
        Add
      </Button>
    </div>
  );
}

export default AddSong;
