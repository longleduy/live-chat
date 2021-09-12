import '../App.css';
import React, {Fragment, memo, useEffect, useRef} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import CommentItem from "./CommentItem";
import IconButton from '@material-ui/core/IconButton';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';

const useStyles = makeStyles((theme) => ({
    commentList: {
        padding: "0 12px",
        paddingTop: '12px',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'auto',
        paddingBottom: theme.spacing(5),
        position: "absolute",
        top: 0,
        bottom: 0,
        overflowY: "scroll",
    },
    scrollButton: {
        backgroundColor: "#E60012",
        opacity: '80%',
        position: 'absolute',
        zIndex: 9999,
        bottom: '120px',
        left: 'calc(50% - 12px)',
        visibility: 'collapse'
    },
    commentNotifyCommon: {
        backgroundColor: "#F1F1F1",
        padding: 9,
        display: "flex",
      },
      iconNotifyCommon: {
        marginRight: 9,
      },
      textNotifyCommon: {
        fontSize: "0.75rem",
        lineHeight: 1.25,
        color: "#999999",
      },
}));

const CommentList = memo((props) => {
    const myRef = useRef(null);
    const scrollButtonRef = useRef(null);
    console.log('CommentList');
    const comments = [...props.data.getCommentsByLiveID.comments].reverse();
    useEffect(() => {
        if(props.data && comments && comments.length > 0){
            const lastComment = comments[comments.length - 1];
            const  d = myRef.current;
            if (d.scrollTop + d.clientHeight >= d.scrollHeight - 100 || lastComment.user_info.user_id === props.userId) {
                myRef.current.scrollTop = myRef.current.scrollHeight;
            }
            else{
                scrollButtonRef.current.style.visibility = 'visible';
            }
        }
    },[props.data]);
    const scrollBottom = () => {
        myRef.current.scrollTop = myRef.current.scrollHeight;
        scrollButtonRef.current.style.visibility = 'collapse';
    }
    //const {getCommentsByLiveID} = props.data;
    const classes = useStyles();
    return (
        <Fragment>
            <Grid item xs={12} className={classes.commentList} ref={myRef}>
                <IconButton
                    ref={scrollButtonRef}
                    aria-label="Scroll Bottom"
                    className={classes.scrollButton}
                    size={'small'}
                    onClick={scrollBottom}
                >
                    <ArrowDownwardIcon style={{color: 'white'}}/>
                </IconButton>
                {
                    comments.map((d, idx) => {
                        return <CommentItem key={d.comment_id} data={d}/>
                    })
                }
                <div className={classes.commentNotifyCommon}>
                    <div className={classes.iconNotifyCommon}>
                        <img
                            src={"/iconTVComment.png"}
                            alt="icon-TV-Comment"
                        />
                    </div>
                    <div className={classes.textNotifyCommon}>
                        このセクションにはチャット機能についての説明が入ります。このセクションにはチャット機能についての説明が入ります。
                        <span style={{ color: "#A42227" }}>詳細</span>
                    </div>
                </div>

            </Grid>
        </Fragment>
    );
});
export default CommentList;
