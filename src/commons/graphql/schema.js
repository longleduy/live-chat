import gql from "graphql-tag";

const GET_COMMENT_BY_POST_ID = gql`
    query MyQuery {
        getCommentsByLiveID(liveID: 1){
            comment_id
            live_id
            user_info{
                user_id
                user_name
                avatar
                avatar_color
            }
            content
            create_at
        }
    }
`;
const CREATE_COMMENT = gql`
    mutation CreateComment($live_id: Int!, $user_id: ID!, $content: String!) {
        createComment(commentData: {live_id: $live_id, user_id: $user_id, content: $content}){
            comment_id
            live_id
            user_info{
              user_id
              user_name
              avatar
              avatar_color
            }
            content
            create_at
  }
    }
`;
const SUB_CREATE_COMMENT = gql`
    subscription SubscribeToNewComments($live_id: Int!){
      subscribeToNewComments(live_id: $live_id){
        comment_id
        live_id
        user_info{
          user_id
          user_name
          avatar
          avatar_color
        }
        content
        create_at
      }
}
`;
export {
    GET_COMMENT_BY_POST_ID,
    CREATE_COMMENT,
    SUB_CREATE_COMMENT
}