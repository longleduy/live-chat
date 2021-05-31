import '../App.css';
import React, {Fragment, memo, useEffect, useRef} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import ItemChild from "./ItemChild";
import IconButton from '@material-ui/core/IconButton';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';

const useStyles = makeStyles((theme) => ({
    commentList: {
        display: 'flex',
        flexDirection: 'column',
        overflow: 'auto',
    },
    scrollButton: {
        backgroundColor: "#E60012",
        opacity: '80%',
        position: 'absolute',
        zIndex: 9999,
        bottom: '120px',
        left: 'calc(50% - 12px)',
        visibility: 'collapse'
    }
}));

const CommentItem = memo((props) => {
    const myRef = useRef(null);
    const scrollButtonRef = useRef(null);
    console.log('CommentItem');
    useEffect(() => {
        if(props.data && props.data.getCommentsByLiveID && props.data.getCommentsByLiveID.length > 0){
            const lastComment = props.data.getCommentsByLiveID[props.data.getCommentsByLiveID.length - 1];
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
    const {getCommentsByLiveID} = props.data;
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
                    getCommentsByLiveID.map((d, idx) => {
                        return <ItemChild key={d.comment_id} data={d}/>
                    })
                }
            </Grid>
        </Fragment>
    );
});
export default CommentItem;
