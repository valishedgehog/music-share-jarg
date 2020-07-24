import { makeStyles } from "@material-ui/core";

const QueueSongStyles = makeStyles((themes) => ({
  avatar: {
      width: 44,
      height: 44
  },
  text: {
      textOverflow: 'ellipsis',
      overflow: 'hidden'
  },
  container: {
      display: 'grid',
      gridAutoFlow: 'column',
      gridTemplateColumns: '50px auto 50px',
      gridGap: 12,
      alignItems: 'center',
      marginTop: 10
  },
  songInfoContainer: {
      overflow: 'hidden',
      whiteSpace: 'nowrap'
  }
}));


export default QueueSongStyles;
