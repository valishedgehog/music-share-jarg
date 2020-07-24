import React from "react";
import Header from "./components/Header";
import AddSong from "./components/AddSong";
import SongList from "./components/SongList";
import SongPlayer from "./components/SongPlayer";
import { Grid } from "@material-ui/core";

function App() {
  return (
    <>
      <Header />
      <Grid style={{
        marginTop: 60
      }} container spacing={2}>
        <Grid item xs={12} sm={12} md={7}>
          <AddSong />
          <SongList />
        </Grid>
        <Grid item xs={12} sm={12} md={5}>
          <SongPlayer />
        </Grid>
      </Grid>
    </>
  );
}

export default App;