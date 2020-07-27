import React from "react";
import Header from "./components/Header";
import AddSong from "./components/AddSong";
import SongList from "./components/SongList";
import SongPlayer from "./components/SongPlayer";
import { Grid, useMediaQuery, Hidden } from "@material-ui/core";
import AppStyles from "./materialStyles/AppStyles";
import songReducer from "./reducer";

export const SongContext = React.createContext({
  song: {
    id: "02f0285c-2652-40b2-b419-fab289510ca0",
    title: "Непогода | Official Audio",
    artist: "Guf & Murovei",
    thumbnail: "https://img.youtube.com/vi/mSADnLa5_BY/0.jpg",
    url: "https://www.youtube.com/watch?v=mSADnLa5_BY",
    duration: 271,
  },
  isPlaying: false,
});

function App() {
  const initialSongState = React.useContext(SongContext);
  const [state, dispatch] = React.useReducer(songReducer, initialSongState);

  const greaterThenSmall = useMediaQuery((theme) => theme.breakpoints.up("sm"));
  const lessThenMedium = useMediaQuery((theme) => theme.breakpoints.down("md"));
  const classes = AppStyles();

  return (
    <SongContext.Provider value={{ state, dispatch }}>
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
        <Grid className={lessThenMedium ? classes.marginBottom : ""} item xs={12} sm={12} md={7}>
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
    </SongContext.Provider>
  );
}

export default App;
