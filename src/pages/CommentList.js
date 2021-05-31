import '../App.css';
import React, {Fragment, memo, useEffect} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import TextField from "@material-ui/core/TextField";
import CommentItem from "./CommentItem";
import {Loading} from './Loading';
import {GET_COMMENT_BY_POST_ID, CREATE_COMMENT, SUB_CREATE_COMMENT} from '../commons/graphql/schema';
import {useQuery, useMutation} from "@apollo/react-hooks";

const useStyles = makeStyles((theme) => ({
    commentDiv: {
        marginTop: '15px',
        marginBottom: '30px',
        flexBasis: 0
    },
    commentInput: {
        width: '100%',
        '& label': {
            fontSize: '12px'
        }
    }
}));
const CommentList = memo(({userId}) => {
    console.log('CommentList');
    const { loading, error, data, subscribeToMore } = useQuery(GET_COMMENT_BY_POST_ID);
    const [
        createComment,
        { loading: mutationLoading, error: mutationError },
    ] = useMutation(CREATE_COMMENT, {
        update(cache, { data: { createComment } }) {
            const {getCommentsByLiveID} = cache.readQuery({query: GET_COMMENT_BY_POST_ID});
            const exists = getCommentsByLiveID.find(
                ({ comment_id }) => comment_id === createComment.comment_id
            );
            createComment['mutation'] = true;
            if(!exists) return cache.writeQuery({query: GET_COMMENT_BY_POST_ID, data: {
                    getCommentsByLiveID: [
                        ...getCommentsByLiveID,
                        createComment
                    ]
                }})
        }
    });
    const classes = useStyles();
    const [content, setContent] = React.useState('');
    const handleChange = (event) => {
        setContent(event.target.value);
    };
    const submitComment = async (e) => {
        if (e.keyCode === 13 && !e.shiftKey) {
            const variables = {
                live_id: 1,
                user_id: userId,
                content
            };
            createComment({
                variables
            }).then();
            setContent('')
        }
    };
    useEffect(() => {
        console.log("SUB")
        subscribeToMore({
            document: SUB_CREATE_COMMENT,
            variables: { live_id: 1 },
            updateQuery: (prev, { subscriptionData }) => {
                console.log("updateQuery")
                if (!subscriptionData.data) return prev;
                const subscribeToNewComments = subscriptionData.data.subscribeToNewComments;
                const exists = prev.getCommentsByLiveID.find(
                    ({ comment_id }) => comment_id === subscribeToNewComments.comment_id
                );
                if (exists) return prev;
                return Object.assign({}, prev, {
                    getCommentsByLiveID: [...prev.getCommentsByLiveID, subscribeToNewComments]
                });
            }
        })
    }, [])
    return (
        <Fragment>
            {loading ? <Loading/> :
            <CommentItem data={data} userId={userId}/>}
            <Grid item xs={12} className={classes.commentDiv}>
                <TextField
                    className={classes.commentInput}
                    id="standard-multiline-flexible"
                    label="コメントを書く..."
                    rowsMax={4}
                    value={content}
                    onChange={handleChange}
                    onKeyUp={submitComment}
                />
            </Grid>
        </Fragment>
    );
})

export default CommentList;
