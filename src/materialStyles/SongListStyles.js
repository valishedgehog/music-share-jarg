import { makeStyles } from "@material-ui/core";

const SongListStyles = makeStyles((themes) => ({
  loadingProgress: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: 5,
  },
}));

export default SongListStyles;
