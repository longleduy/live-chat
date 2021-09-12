import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Button, TextField } from "@material-ui/core";

const useStyles = makeStyles(() => {
    return {
        containerSettingUsername: {
            padding: "0 12px",
            paddingTop: "40px",
            marginBottom: "16px",
            textAlign: "center",
        },
        btnOK: {
            marginTop: "32px",
            width: "100%",
            fontSize: "0.9375rem",
            lineHeight: 1.2,
            color: "#FFFFFF",
            fontWeight: "bold",
            backgroundColor: "#E60012",
            height: 34,
            border: "none",
            borderRadius: 3,
            cursor: "pointer",
            "&:hover": {
                backgroundColor: "#333333",
            },
        },
        btnCancle: {
            marginTop: "16px",
            fontSize: "0.8125rem",
            width: "100%",
            lineHeight: 1.86,
            color: "#333333",
            backgroundColor: "unset",
            height: 34,
            border: "none",
            cursor: "pointer",
        },
        helperText: {
            marginTop: 6,
            textAlign: "right",
            color: "#999999",
            fontSize: "0.75rem",
            lineHeight: "14px",
            fontFamily: "Roboto",
        },
        label: {
            color: "#333333",
            fontSize: "0.875rem",
            lineHeight: "16px",
            fontWeight: "bold",
        },
        labelFocus: {
            color: "#333333 !important",
        },
        input: {
            padding: "13px 0",
            color: "#333333",
            fontSize: "0.875rem",
            lineHeight: "16px",
            "&:focus": {
              color: "#333333",
              "&::placeholder": {
                color: "#999999",
                opacity: 0.6,
              },
            },
        },
        inputUnderline: {
            "&::after": {
                borderBottom: "2px solid #333333 !important",
            },
        },
    };
});

export default function SettingUsername(props) {
    const classes = useStyles();
    const { username, submitUsername, cancelSettingUsername} = props;
    const [usernameTempt, setUsernameTempt] =  React.useState(username);

    const enterUsernameTempt = (event) => {
      if (event.target.value.length <= 10) {
        setUsernameTempt(event.target.value);
      }
    }

    const submit = () => { submitUsername(usernameTempt) }

    return (
        <div className={classes.containerSettingUsername}>
            <TextField
                id="standard-full-width"
                label="ユーザー名"
                style={{ margin: 8 }}
                value={usernameTempt}
                onChange={enterUsernameTempt}
                placeholder="田中太郎"
                helperText="0/10文字"
                fullWidth
                margin="normal"
                FormHelperTextProps={{
                    classes: {
                        root: classes.helperText,
                    },
                }}
                InputLabelProps={{
                    shrink: true,
                    classes: {
                        root: classes.label,
                        focused: classes.labelFocus,
                    },
                }}
                InputProps={{
                    classes: {
                        input: classes.input,
                        underline: classes.inputUnderline,
                    },
                }}
            />
            <Button
                classes={{
                    root: classes.btnOK,
                }}
                onClick={submit}
            >
                チャットを始める
            </Button>
            <Button
                classes={{
                    root: classes.btnCancle,
                }}
                onClick={cancelSettingUsername}
            >
                キャンセル
            </Button>
        </div>
    );
}
