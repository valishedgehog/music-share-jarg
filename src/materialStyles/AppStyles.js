import { makeStyles } from "@material-ui/core";

const AppStyles = makeStyles((theme) => ({
  container: {
    marginTop: 60,
  },

  containerSmall: {
    marginTop: 10,
  },

  rightColumn: {
    position: "fixed",
    width: "100%",
    right: 0,
    top: 70,
  },

  rightColumnSmall: {
    position: "fixed",
    width: "100%",
    left: 0,
    bottom: 0,
  }
}));

export default AppStyles;
