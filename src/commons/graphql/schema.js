import gql from "graphql-tag";

const GET_COMMENT_BY_POST_ID = gql`
    query MyQuery($live_episode_id: Int!,$limit: Int,$nextToken: String) {
        getCommentsByLiveIDAdmin(live_episode_id: $live_episode_id,limit: $limit,nextToken: $nextToken){
            comments {
                comment_id
                live_episode_id
                live_program_id
                comment_status
                comment_role
                pin_flg
                content
                user_info {
                    user_id
                    user_name
                }
                create_at
            }
            nextToken
        }
    }
`;

const SUB_CREATE_COMMENT = gql`
    subscription SubscribeToNewCommentsAdmin($live_episode_id: Int!){
        subscribeToNewCommentsAdmin(live_episode_id: $live_episode_id){
            comment_id
            live_episode_id
            live_program_id
            comment_status
            comment_role
            pin_flg
            content
            user_info {
                user_id
                user_name
            }
            create_at
        }
    }
`;
const SUB_ADMIN_ACTION = gql`
    subscription SubscribeToAdminAction($live_episode_id: Int!){
        subscribeToAdminAction(live_episode_id: $live_episode_id) {
            live_episode_id
            mode
            comment{
                comment_id
                live_episode_id
                content
                create_at
            }
            user_id
            push_flg
        }
    }
`;
export {
    GET_COMMENT_BY_POST_ID,
    SUB_CREATE_COMMENT,
    SUB_ADMIN_ACTION
}