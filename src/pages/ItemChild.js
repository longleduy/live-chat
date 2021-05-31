import '../App.css';
import React, {Fragment, memo} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import {deepOrange, deepPurple, cyan, brown, green, blue} from '@material-ui/core/colors';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    orange: {
        color: theme.palette.getContrastText(deepOrange[500]),
        backgroundColor: deepOrange[500],
    },
    purple: {
        color: theme.palette.getContrastText(deepPurple[500]),
        backgroundColor: deepPurple[500],
    },
    cyan: {
        color: theme.palette.getContrastText(cyan[500]),
        backgroundColor: cyan[500],
    },
    brown: {
        color: theme.palette.getContrastText(brown[500]),
        backgroundColor: brown[500],
    },
    green: {
        color: theme.palette.getContrastText(green[500]),
        backgroundColor: green[500],
    },
    blue: {
        color: theme.palette.getContrastText(cyan[500]),
        backgroundColor: blue[500],
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
    container: {
        display: 'flex',
        justifyContent: 'center'
    },
    content: {
        flexBasis: "unset",
        width: '640px',
        padding: 'unset !important'
    },
    detail: {
        display: 'flex',
        flexDirection: 'column',
        margin: '10px 0px 10px 0px'
    },
    programName: {
        fontSize: '12px',
        color: '#002B60'
    },
    episodeTitle: {
        fontSize: '20px',
        margin: '10px 0px 20px 0px',
        fontWeight: 'bold'
    },
    episodeDateTime: {
        color: '#6f6c6c',
        fontSize: '11px'
    },
    detailContent: {},
    commentDiv: {
        marginTop: '30px'
    },
    commentInput: {
        width: '100%',
        '& label': {
            fontSize: '12px'
        }
    },
    commentList: {
        display: 'flex',
        flexDirection: 'column',
        marginTop: '25px'
    },
    avatarDiv: {},
    commentContent: {
        display: "flex",
        flexGrow: 1,
        paddingLeft: "5px",
        flexDirection: 'column'
    },
    commentContent2: {
        display: "flex",
        flexDirection: "column",
        padding: "5px 5px 5px 5px",
        backgroundColor: "#f0f0f0",
        borderRadius: "3px"
    },
    userName: {
        fontWeight: "bold", fontSize: "15px",
        flexGrow: 1
    },
    commentContentLabel: {
        fontSize: "12px", paddingTop: "5px",
        color: '#575555'
    },
    commentItem: {
        display: 'flex',
        flexDirection: 'row',
        marginBottom: '10px',
        backgroundColor: '#f0f0f0',
        padding: '5px 10px',
        borderRadius: '3px'
    },
    commentDate: {
        fontSize: "9px",
        fontWeight: 'bold',
        marginTop: '5px'
    },
    userNameDate: {
        display: 'flex',
        flexDirection: 'row'
    }
}));

const ItemChild = memo((props) => {
    console.log('ItemChild');
    const {data} = props;
    const userInfo = data.user_info || {
        "user_id": "1",
        "user_name": "User",
        "avatar_color": "orange"
    }
    const classes = useStyles();
    return (
        <Fragment>
            <div className={classes.commentItem}>
                <div className={classes.avatarDiv}>
                    {userInfo.avatar === "null" ?
                        <Avatar className={classes[userInfo.avatar_color]} sizes={'35'}>{userInfo.user_name.substring(0, 1)}</Avatar> :
                        <Avatar sizes={'35'} src={userInfo.avatar} />
                    }
                </div>
                <div className={classes.commentContent}>
                    <div className={classes.commentContent2}>
                        <div className={classes.userNameDate}>
                            <label className={classes.userName}>{userInfo.user_name}</label>
                            <label className={classes.commentDate}>{new Date(Number(data.create_at)).toLocaleString()}</label>
                        </div>
                        <label className={classes.commentContentLabel}>{data.content}</label>
                    </div>
                </div>
            </div>
        </Fragment>
    );
});
export default ItemChild;
