import gql from "graphql-tag";

const GET_COMMENT_BY_POST_ID = gql`
    query MyQuery($live_episode_id: Int!,$limit: Int,$nextToken: String) {
        getCommentsByLiveID(live_episode_id: $live_episode_id,limit: $limit,nextToken: $nextToken){
            comments {
                comment_id
                live_episode_id
                live_program_id
                comment_status
                comment_role
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

const CREATE_COMMENT = gql`
    mutation CreateComment($live_id: Int!, $user_id: ID!, $content: String!) {
        createComment(commentData: {live_id: $live_id, user_id: $user_id, content: $content}){
            comment_id
            live_episode_id
            live_program_id
            comment_status
            content
            user_info {
                user_id
                user_name
            }
            create_at
        }
    }
`;
const SUB_CREATE_COMMENT = gql`
    subscription SubscribeToNewComments($comment_status: String!){
        subscribeToNewComments(comment_status: $comment_status){
            comment_id
            live_episode_id
            live_program_id
            comment_status
            comment_role
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
    subscription SubscribeToAdminAction($live_episode_id: Int!, $push_flg: Int = 1){
        subscribeToAdminAction(live_episode_id: $live_episode_id, push_flg: $push_flg) {
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
    CREATE_COMMENT,
    SUB_CREATE_COMMENT,
    SUB_ADMIN_ACTION
}