import UICardBlock from "components/UI/UICardBlock";
import {IRequestShort} from "models/report/IReport";
import React, {FC} from "react";
import {history} from "../../../helpers/history.helper";
import {toastr} from 'react-redux-toastr';
import styles from './styles.module.sass';

export const RequestItem: FC<{ request: IRequestShort }> = ({request}) => {
    const {requestId, closeDate, requestMaker, creationDate, generateReport} = request;

    function handleClick(id: string, closeDate: string) {
        !closeDate && history.push(`/report/${id}`);
        closeDate && toastr.warning("This request is Closed");
    }

    return <UICardBlock key={requestId} onClick={() => handleClick(requestId, closeDate)}>
        <h3>Made by {requestMaker.username}</h3>
        <h4>Created at {creationDate.substr(0, 19)}</h4>
        <h5>{generateReport && "Report will be generated automatic"}</h5>
    </UICardBlock>;
};

