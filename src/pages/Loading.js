import React from 'react';
import { css } from "@emotion/react";
import SyncLoader from "react-spinners/SyncLoader";

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

const Loading = () => {
    return <div style={{
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'center',
        flexGrow: 1
    }}>
        <SyncLoader color={"#E60012"} loading={true} css={override} size={10} margin={2} />
    </div>
};
export { Loading }