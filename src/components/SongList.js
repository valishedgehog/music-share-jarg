import React from "react";
import { CircularProgress } from "@material-ui/core";
import SongListStyles from "../materialStyles/SongListStyles";
import SongItem from "./SongItem";

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

export default SongList;
