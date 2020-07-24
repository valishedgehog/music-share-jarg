import { makeStyles } from "@material-ui/core";

const SongPlayerStyles = makeStyles((theme) => ({
    container: {
        display: 'flex',
        justifyContent: 'space-between',
    },
    details: {
        display: 'flex',
        flexDirection: 'column',
        padding: '0px 15px',
        width: '100%'
    },
    content: {
        flex: '1 0 auto'
    },
    thumbnail: {
        width: 200,
    },
    controls: {
        display: 'flex',
        alignItems: 'center',
        paddingLeft: theme.spacing(1),
        paddingRight: theme.spacing(1),
    },
    playIcon: {
        height: 38,
        width: 38
    },
    songLength: {
        marginLeft: 'auto'
    }
}));

export default SongPlayerStyles;
