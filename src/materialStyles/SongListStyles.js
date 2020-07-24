import { makeStyles } from "@material-ui/core";

const SongListStyles = makeStyles((themes) => ({
  loadingProgress: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: 5,
  },
}));

const SongItemStyles = makeStyles((themes) => ({
  container: {
    margin: themes.spacing(3),
  },
  songInfoContainer: {
    display: "flex",
    alignItems: "center",
  },
  songInfo: {
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
  },
  thumbnail: {
    objectFit: "cover",
    width: 140,
    height: 140,
  },
}));


export { SongListStyles, SongItemStyles };
