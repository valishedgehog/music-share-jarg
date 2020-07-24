import React from "react";
import Header from "./components/Header";
import AddSong from "./components/AddSong";
import SongList from "./components/SongList";
import SongPlayer from "./components/SongPlayer";
import { Grid, useMediaQuery, Hidden } from "@material-ui/core";
import AppStyles from "./materialStyles/AppStyles";

function App() {
  const greaterThenSmall = useMediaQuery((theme) => theme.breakpoints.up("sm"));
  const lessThenMedium = useMediaQuery((theme) => theme.breakpoints.down("md"));
  const classes = AppStyles();

  return (
    <>
      <Hidden only="xs">
        <Header />
      </Hidden>
      <Grid
        className={
          greaterThenSmall ? classes.container : classes.containerSmall
        }
        container
        spacing={2}
      >
        <Grid item xs={12} sm={12} md={7}>
          <AddSong />
          <SongList />
        </Grid>
        <Grid
          className={
            lessThenMedium ? classes.rightColumnSmall : classes.rightColumn
          }
          item
          xs={12}
          sm={12}
          md={5}
        >
          <SongPlayer />
        </Grid>
      </Grid>
    </>
  );
}

export default App;
