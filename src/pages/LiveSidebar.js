import '../App.css';
import React, {Fragment, memo, useEffect} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import axios from 'axios';
import CommentList from "./CommentList";
import SettingUsername from "./SettingUsername";
import FooterChat from "./FooterChat";
import {Loading} from './Loading';
import {GET_COMMENT_BY_POST_ID, CREATE_COMMENT, SUB_CREATE_COMMENT, SUB_ADMIN_ACTION} from '../commons/graphql/schema';
import {useQuery, useMutation, useSubscription, useLazyQuery} from "@apollo/client";
import {Button} from "@material-ui/core";
import Subcription from "./Subcription";

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
const live_episode_id = 16112;
const live_program_id = 161;
const LiveSidebar = memo(({userId}) => {
    console.log('LiveSidebar');
    const variables = {
        live_episode_id: live_episode_id
    }
    const {refetch, data, subscribeToMore, networkStatus} = useQuery(GET_COMMENT_BY_POST_ID, {
        variables
    });
    useSubscription(
        SUB_ADMIN_ACTION,
        {
            variables,
            onSubscriptionData: async ({client, subscriptionData}) => {
                if (subscriptionData.data && subscriptionData.data.subscribeToAdminAction) {
                    if (["REFETCH","BAN_USER_REFECTH","UNBAN_USER_REFECTH"].includes(subscriptionData.data.subscribeToAdminAction.mode)) {
                        const subDataCommentTime = Number(subscriptionData.data.subscribeToAdminAction.comment.create_at);
                        const res = client.readQuery({
                            query: GET_COMMENT_BY_POST_ID,
                            variables
                        });
                        const currentList = res.getCommentsByLiveIDAdmin.comments;
                        variables.limit = currentList.length;
                        let lasteCurrentCommentTime = 0;
                        if (currentList.length > 0) {
                            lasteCurrentCommentTime = Number(currentList[currentList.length - 1].create_at)
                        }
                        if (currentList.nextToken === null || subDataCommentTime >= lasteCurrentCommentTime || lasteCurrentCommentTime === 0) {
                            console.log("Refetch");
                            refetch();
                        }
                    }
                    if(["BAN_USER", "BAN_USER_REFECTH"].includes(subscriptionData.data.subscribeToAdminAction.mode)){
                        const banUserID = subscriptionData.data.subscribeToAdminAction.user_id;
                        console.log(`Kiem tra user_id ${banUserID} có phải user của mình (có trong localstorage) thì disable chức năng comment`);
                    }
                    else if(["UNBAN_USER","UNBAN_USER_REFECTH"].includes(subscriptionData.data.subscribeToAdminAction.mode)){
                        const banUserID = subscriptionData.data.subscribeToAdminAction.user_id;
                        console.log(`Kiem tra user_id ${banUserID} có phải user của mình (có trong localstorage) thì enable chức năng comment`);
                    }
                    else if(subscriptionData.data.subscribeToAdminAction.mode === "PIN_COMMENT"){
                        console.log("PIN COMMENT NAY", subscriptionData.data.subscribeToAdminAction.comment)
                    }
                    else if(subscriptionData.data.subscribeToAdminAction.mode === "UNPIN_COMMENT"){
                        console.log("BO PIM COMMENT")
                    }
                }
            }
        }
    );
    console.log("networkStatus", networkStatus)
    const classes = useStyles();
    const [isShowSettingUsername, setIsShowSettingUsername] = React.useState(false);
    const [username, setUsername] = React.useState("");

    const handleShowSettingUsername = () => {
        setIsShowSettingUsername(true);
    }

    const handleCloseSettingUsername = () => {
        setIsShowSettingUsername(false);
    }

    const submitUsername = async (username) => {
        if (username) {
            axios.post(`https://ncnokoaqk0.execute-api.ap-northeast-1.amazonaws.com/dev/auth/live-chat-user`, {user_name: username})
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
        await axios.post(
            'http://localhost:8081/chat/comment',
            {
                "live_episode_id": live_episode_id,
                "live_program_id": live_program_id,
                "content": content
            },
            {
                headers: {
                    'admin-token': 'ADMIN_REQEST_SECRET_TOKEN'
                }
            }
        )
        // const variables = {
        //     live_id: 1,
        //     user_id: userId,
        //     content: content
        // };
        // createComment({
        //     variables
        // }).then();
    };

    useEffect(() => {
        console.log("SUB")
        subscribeToMore({
            document: SUB_CREATE_COMMENT,
            variables: {live_episode_id: live_episode_id},
            updateQuery: (prev, {subscriptionData}) => {
                console.log("updateQuery")
                if (!subscriptionData.data) return prev;
                const subscribeToNewCommentsAdmin = subscriptionData.data.subscribeToNewCommentsAdmin;
                const data = Object.assign({}, prev, {
                    getCommentsByLiveIDAdmin: {
                        ...prev.getCommentsByLiveIDAdmin,
                        comments: [subscribeToNewCommentsAdmin, ...prev.getCommentsByLiveIDAdmin.comments]
                    }
                });
                return data;
            }
        });
    }, [])
    return (
        <Fragment>
            <div className={classes.containerSidebar}>
                <div className={classes.title}>チャット</div>
                {!isShowSettingUsername && (
                    <div className={classes.contentComment}>
                        {networkStatus === 1 ? <Loading/> :
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
