import React, {Fragment, memo} from 'react';
import {useSubscription} from "@apollo/client";
import {GET_COMMENT_BY_POST_ID, SUB_ADMIN_ACTION} from "../commons/graphql/schema";

const Subcription = memo(({refetch}) => {
    console.log('Subcription Component');
    const variables = { live_episode_id: 16112 };
    useSubscription(
        SUB_ADMIN_ACTION,
        {
            variables,
            onSubscriptionData: ({client,subscriptionData}) => {
                console.log("_____________")
            }
            //     if(subscriptionData.data && subscriptionData.data.subscribeToAdminAction && subscriptionData.data.subscribeToAdminAction.mode === "REFETCH"){
            //         const subDataCommentTime = Number(subscriptionData.data.subscribeToAdminAction.comment.create_at);
            //         const res = client.readQuery({
            //             query: GET_COMMENT_BY_POST_ID,
            //             variables
            //         });
            //         const currentList = res.getCommentsByLiveID.comments;
            //         let lasteCurrentCommentTime = 0;
            //         if(currentList.length > 0){
            //             lasteCurrentCommentTime = Number(currentList[currentList.length - 1].create_at)
            //         }
            //         console.log(subDataCommentTime, lasteCurrentCommentTime);
            //         if(subDataCommentTime >= lasteCurrentCommentTime || lasteCurrentCommentTime === 0){
            //             console.log("Refetch");
            //             refetch({limit: currentList.length}).then(({data}) => {
            //                 client.writeQuery({query: GET_COMMENT_BY_POST_ID,data, variables})
            //             });
            //         }
            //     }
            // }
        }
    );
    return (
        <Fragment>

        </Fragment>
    );
});
export default Subcription;
