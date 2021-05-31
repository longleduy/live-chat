import '../App.css';
import React, {Fragment, memo} from 'react';
import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    containerComment: {
        marginBottom: theme.spacing(2),
      },
      usernameAndTime: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      },
      username: {
        fontSize: "0.8125rem",
        lineHeight: 1.25,
        fontWeight: "bold",
        color: "#333333",
      },
      time: {
        fontFamily: "Hiragino Sans",
        fontSize: "0.8125rem",
        lineHeight: 1.25,
        color: "#999999",
      },
      content: {
        fontSize: "0.8125rem",
        color: "#333333",
      },
}));

const convertToTime = (datetime) => {
  const fullDateTimeComment = new Date(Number(datetime));
  const hours = fullDateTimeComment.getHours();
  const minutes = fullDateTimeComment.getMinutes();
  const hoursStr = hours.toLocaleString().length === 1 ? `0${hours}` : `${hours}`;
  const minutesStr = minutes.toLocaleString().length === 1 ? `0${minutes}` : `${minutes}`;

  return `${hoursStr}:${minutesStr}`;
}

const CommentItem = memo((props) => {
    console.log('CommentItem');
    const {data} = props;
    const userInfo = data.user_info || {
        "user_id": "1",
        "user_name": "User",
        "avatar_color": "orange"
    }
    const classes = useStyles();

    return (
        <Fragment>
            <div className={classes.containerComment}>
                <div className={classes.usernameAndTime}>
                    <div className={classes.username}>{userInfo.user_name}</div>
                    <div className={classes.time}>{convertToTime(data.create_at)}</div>
                </div>
                <div className={classes.content}>{data.content}</div>
            </div>
        </Fragment>
    );
});
export default CommentItem;
