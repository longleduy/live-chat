import '../App.css';
import React, {Fragment} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import LiveSidebar from "./LiveSidebar";
import {ApolloProvider, InMemoryCache} from '@apollo/react-hooks';
import {ApolloLink} from 'apollo-link';
import {createAuthLink} from 'aws-appsync-auth-link';
import ApolloClient from 'apollo-client';
import { createSubscriptionHandshakeLink } from 'aws-appsync-subscription-link';

const config = {
    url: process.env.REACT_APP_AWS_APPSYNC_GRAPHQLENDPOINT,
    region: process.env.REACT_APP_AWS_APPSYNC_REGION,
    auth: {
        type: process.env.REACT_APP_AWS_APPSYNC_AUTHENTICATIONTYPE,
        apiKey: process.env.REACT_APP_AWS_APPSYNC_APIKEY,
    }
};
const link = ApolloLink.from([
    createAuthLink(config),
    createSubscriptionHandshakeLink(config)
]);
const client = new ApolloClient({
    link,
    cache: new InMemoryCache({
        typePolicies: {
            Comment: {
                keyFields: ['comment_id']
            }
        }
    })
});
const WithProvider = ({userId}) => (
    <ApolloProvider client={client}>
        <LiveSidebar userId={userId}/>
    </ApolloProvider>
);

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        background: 'rgb(238, 238, 238)',
        minHeight: '100vh',
    },
    liveDiv: {
        maxWidth: '1300px',
        padding: '0 40px',
        margin: '0 auto'
    },
    liveContentMain: {
        display: 'flex',
        flexDirection: 'column'
    },
    liveThumbnail: {
        maxWidth: '100%'
    },
    liveContent: {
        display: 'flex',
        flexGrow: 1,
        flexDirection: 'column'
    },
    liveTitle: {
        fontSize: '1.5em',
        fontWeight: 'bold',
        padding: '15px 0px 30px 0px'
    },
    liveDetail: {
        backgroundColor: 'white',
        flexGrow: 1,
        padding: '30px 15px',
        borderRadius: '3px'
    },
    commentMainDiv: {
        display: 'flex',
        flexDirection: 'column',
        margin: '12px 0px',
        borderRadius: '3px',
        maxHeight: '100vh',
        position: 'relative',
    }
}));

const Live = ((props) => {
    console.log('Live');
    const classes = useStyles();
    const userId = localStorage.getItem("user_id");
    return (
        <Fragment>
            <div className={classes.root}>
                <Grid container spacing={3} className={classes.liveDiv}>
                    <Grid item xs={8} className={classes.liveContentMain}>
                        <div>
                            <img
                                alt="thumb_video_live"
                                src={'/thumb_live_livenms_online.png'} 
                                className={classes.liveThumbnail}
                            />
                        </div>
                        <div className={classes.liveContent}>
                            <label className={classes.liveTitle}>
                                【モーサテ】ライブ＆朝活Online（月･水）
                            </label>
                            <div className={classes.liveDetail}>
                                <label>
                                    モーサテが誇るスペシャリストが投資のヒントを提案！<br/><br/>

                                    ※ご視聴いただくにはテレ東BIZの有料会員登録・ログインが必要です。！<br/><br/>
                                    ※ログインすると「追っかけ再生」が可能です。！<br/><br/>
                                    ※月曜・水曜に配信します（月曜祝日で放送休止の場合は火曜に配信）！<br/><br/>
                                </label>
                            </div>
                        </div>
                    </Grid>
                    <Grid item xs={3} className={classes.commentMainDiv}>
                        <WithProvider userId={userId}/>
                    </Grid>
                </Grid>
            </div>
        </Fragment>
    );
});
export default Live;
