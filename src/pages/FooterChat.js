import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { InputBase, InputAdornment } from "@material-ui/core";

const useStyles = makeStyles(() => {
  return {
    containerFooterChat: {
      marginBottom: "16px",
    },
    title: {
      fontFamily: "Hiragino Sans",
      fontSize: "0.8125rem",
      lineHeight: 1.25,
      color: "#999999",
      marginBottom: "12px",
    },
    containerUsername: {
      display: "flex",
      alignItems: "center",
    },
    username: {
      fontSize: "0.8125rem",
      fontWeight: "bold",
      lineHeight: 1.25,
      color: "#333333",
      marginBottom: "12px",
    },
    iconEditUsername: {
      marginBottom: "12px",
      marginLeft: "8px",
      cursor: "pointer",
    },
    inputRoot: {
      height: 42,
      padding: "11px 13px",
      backgroundColor: "#F0F0F0",
      borderRadius: 3,
      width: "100%",
    },
    input: {
      fontSize: "0.875rem",
      lineHeight: "21px",
      color: "#333333",
      "&:focus": {
        "&::placeholder": {
          color: "#6B6B6B",
        },
      },
      "&:hover": {
        cursor: "pointer",
      },
    },
    titleRemindSettingUsermame: {
      fontSize: "0.75rem",
      lineHeight: 1.25,
      color: "#999999",
      marginBottom: "12px",
    },
    linkToSettingUsername: {
      fontSize: "0.8125rem",
      lineHeight: 1.25,
      color: "#C1272D",
      cursor: "pointer",
      "&:hover": {
        textDecoration: "underline",
      },
    },
    defaultNoSettingUsernameYet: {},
    remindSettingUsername: {
      textAlign: "center",
    },
    iconAdorment: {
      cursor: "pointer"
    }
  };
});


export default function FooterChat(props) {
  const classes = useStyles();
  const { handleShowSettingUsername, username, content, handleChange, submitComment } = props;
  const [isShowRemind, setIsShowRemind] = useState(false);
 
  const handleHoverSectionDefault = () => {
    setIsShowRemind(true);
  };

  const handleLeaveSectionDefault = () => {
    setIsShowRemind(false);
  };

  return (
    <div className={classes.containerFooterChat}>
      {!username && !isShowRemind && (
        // eslint-disable-next-line jsx-a11y/mouse-events-have-key-events
        <div
          className={classes.defaultNoSettingUsernameYet}
          onMouseOver={handleHoverSectionDefault}
          role="presentation"
        >
          {username ? (
            <div className={classes.username}>{username}</div>
          ) : (
            <div className={classes.title}>ユーザー名未設定</div>
          )}
          <InputBase
            classes={{
              root: classes.inputRoot,
              input: classes.input,
            }}
            placeholder="コメントを入力..."
            id="standard-adornment-weight"
            endAdornment={
              <InputAdornment position="end">
                <img
                  src={"/iconSend.png"}
                  alt="icon-Send-Comment"
                />
              </InputAdornment>
            }
            aria-describedby="standard-weight-helper-text"
          />
        </div>
      )}
      {!username && isShowRemind && (
        <div
          className={classes.remindSettingUsername}
          onMouseLeave={handleLeaveSectionDefault}
        >
          <div className={classes.titleRemindSettingUsermame}>
            チャットにコメントするにはユーザー名を設定する必要があります。
          </div>
          <div
            className={classes.linkToSettingUsername}
            onClick={handleShowSettingUsername}
            role="presentation"
          >
            ユーザー名を設定する
          </div>
        </div>
      )}
      {username && (
        // eslint-disable-next-line jsx-a11y/mouse-events-have-key-events
        <div
          className={classes.defaultNoSettingUsernameYet}
          role="presentation"
        >
          <div className={classes.containerUsername}>
            <div className={classes.username}>{username}</div>
            <div
              className={classes.iconEditUsername}
              onClick={handleShowSettingUsername}
              role="presentation"
            >
              <img
                src={"/iconEdit.png"}
                alt="icon-Edit-Username"
              />
            </div>
          </div>
          <InputBase
            classes={{
              root: classes.inputRoot,
              input: classes.input,
            }}
            placeholder="コメントを入力..."
            id="standard-adornment-weight"
            value={content}
            onChange={handleChange}
            onKeyUp={submitComment}
            endAdornment={
              <InputAdornment position="end" on>
                <img
                  className={classes.iconAdorment}
                  onClick={submitComment}
                  src={"/iconSend.png"}
                  alt="icon-Send-Comment"
                />
              </InputAdornment>
            }
            aria-describedby="standard-weight-helper-text"
          />
        </div>
      )}
    </div>
  );
}
