import gql from "graphql-tag";

const GET_COMMENT_BY_POST_ID = gql`
    query MyQuery($live_episode_id: Int!,$limit: Int = 10,$nextToken: String) {
        getCommentsByLiveID(live_episode_id: $live_episode_id,limit: $limit,nextToken: $nextToken){
            comments {
                comment_id
                live_episode_id
                live_program_id
                block_comment_flg
                block_comment_badword_flg
                block_comment_user_flg
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
            block_comment_flg
            block_comment_badword_flg
            block_comment_user_flg
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
    subscription SubscribeToNewComments($live_episode_id: Int!){
      subscribeToNewComments(live_episode_id: $live_episode_id){
          comment_id
          live_episode_id
          live_program_id
          block_comment_flg
          block_comment_badword_flg
          block_comment_user_flg
          content
          user_info {
              user_id
              user_name
          }
          create_at
      }
}
`;
export {
    GET_COMMENT_BY_POST_ID,
    CREATE_COMMENT,
    SUB_CREATE_COMMENT
}