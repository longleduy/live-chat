import '../App.css';
import React, {Fragment, memo, useEffect} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import axios from 'axios';
import CommentList from "./CommentList";
import SettingUsername from "./SettingUsername";
import FooterChat from "./FooterChat";
import {Loading} from './Loading';
import {GET_COMMENT_BY_POST_ID, CREATE_COMMENT, SUB_CREATE_COMMENT} from '../commons/graphql/schema';
import {useQuery, useMutation} from "@apollo/react-hooks";

const useStyles = makeStyles((theme) => ({
    containerSidebar: {
        border: "1px solid #DDDDDD",
        backgroundColor: "#FAFAFA",
    },
    commentDiv: {
        marginTop: '15px',
        marginBottom: '30px',
        flexBasis: 0
    },
    contentComment: {
        height: 412,
        overflow: "hidden",
        position: "relative",
    },
    commentInput: {
        width: '100%',
        '& label': {
            fontSize: '12px'
        }
    },
    title: {
        height: 38,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontSize: "0.8125rem",
        color: "#999999",
        backgroundColor: "#FFFFFF",
        boxShadow: "0px 1px 0px #DDDDDD",
    },
    contentSettingUser: {
        height: 524,
    },
    footerChat: {
        padding: "11px 13px",
        backgroundColor: theme.customColor?.WHITE,
    },
}));

const LiveSidebar = memo(({userId}) => {
    console.log('LiveSidebar');
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
    const [isShowSettingUsername, setIsShowSettingUsername] = React.useState(false);
    const [username, setUsername] =  React.useState("");

    const handleShowSettingUsername = () => {
        setIsShowSettingUsername(true);
    }

    const handleCloseSettingUsername = () => {
        setIsShowSettingUsername(false);
    }

    const submitUsername = async (username) => {
        if (username) {
            axios.post(`https://ncnokoaqk0.execute-api.ap-northeast-1.amazonaws.com/dev/auth/live-chat-user`, { user_name: username })
            .then(res => {
                console.log(res.data.data);
                localStorage.setItem("user", JSON.stringify(res.data.data));
            })
            
            setUsername(username);
            handleCloseSettingUsername();
        }
    }
    
    const cancelSettingUsername = () => {
        handleCloseSettingUsername();
    }

    const submitComment = async (content) => {
        const variables = {
            live_id: 1,
            user_id: userId,
            content: content
        };
        createComment({
            variables
        }).then();
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    
    return (
        <Fragment>
            <div className={classes.containerSidebar}>
                <div className={classes.title}>チャット</div>
                {!isShowSettingUsername && (
                    <div className={classes.contentComment}>
                        {loading ? <Loading/> :
                        <CommentList data={data} userId={userId}/>}
                    </div>
                )}
                {!isShowSettingUsername && (
                    <div className={classes.footerChat}>
                        <FooterChat 
                            username={username}
                            submitComment={submitComment}
                            handleShowSettingUsername={handleShowSettingUsername} 
                        />
                    </div>
                )}
                {isShowSettingUsername && (
                    <div className={classes.contentSettingUser}>
                        <SettingUsername
                            username={username}
                            submitUsername={submitUsername}
                            cancelSettingUsername={cancelSettingUsername}
                        />
                    </div>
                )}
            </div>
        </Fragment>
    );
})

export default LiveSidebar;
