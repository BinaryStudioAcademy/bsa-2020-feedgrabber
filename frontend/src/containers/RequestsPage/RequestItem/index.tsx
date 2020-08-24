import UICardBlock from "components/UI/UICardBlock";
import { IRequestShort } from "models/report/IReport";
import React, { FC } from "react";
import { history } from "../../../helpers/history.helper";
import { toastr } from 'react-redux-toastr';

export const RequestItem: FC<{ request: IRequestShort }> = ({ request }) => {
    const { requestId, isClosed, requestMaker, creationDate, generateReport } = request;
    function handleClick(id: string, isClosed: boolean) {
        !isClosed && history.push(`/report/${id}`);
        isClosed && toastr.warning("This request is Closed");
    }
    return <UICardBlock key={requestId} onClick={() => handleClick(requestId, isClosed)}>
        <h3>Made by {requestMaker.username}</h3>
        <h4>Created at {creationDate.substr(0, 19)}</h4>
        <h5>{generateReport && "Report will be generated automatic"}</h5>
    </UICardBlock>;
};

