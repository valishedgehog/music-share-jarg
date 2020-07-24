import { makeStyles } from "@material-ui/core";

const AppStyles = makeStyles((theme) => ({
  leftColumn: {
    marginTop: 60,
  },

  rightColumn: {
    position: "fixed",
    width: "100%",
    right: 0,
    top: 70,
  },
}));

export default AppStyles;
