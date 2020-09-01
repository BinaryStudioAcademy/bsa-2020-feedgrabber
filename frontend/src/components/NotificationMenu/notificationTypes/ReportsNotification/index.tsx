import React from "react";
import {INotificationProps} from "../../index";
import styles from "./styles.module.sass";
import moment from "moment";
import {Icon} from "semantic-ui-react";

const ReportsNotification: React.FC<INotificationProps> = ({
                                                                    notification,
                                                                    readNotification,
                                                                    deleteNotification,
                                                                    setShown
                                                                }) => {
    const payloadItems = notification.payload.split(',');
    const requestId = payloadItems[0];
    const excelLink = payloadItems[1];
    const pptLink = payloadItems[2];
    return (
        <div key={notification.id}
             className={styles.notification}>
            <div className={styles.text}>New reports were generated</div>
            <div className={styles.excel}>Excel report</div>
            <div className={styles.ppt}>PowerPoint report</div>
            <div className={styles.date}>{moment(notification.date).fromNow()}</div>

            <div className={styles.excel_download}
                 onClick={() => {
                     readNotification(notification.id);
                     setShown(false);
                 }}>
                <a href={excelLink}><Icon name={"download"}></Icon></a>
            </div>
            <div className={styles.ppt_download}
                 onClick={() => {
                     readNotification(notification.id);
                     setShown(false);
                 }}>
                <a href={pptLink}><Icon name={"download"}></Icon></a>
            </div>
            <div className={styles.close}>
                <Icon color={"grey"} name={"close"} onClick={() => {
                    deleteNotification(notification.id);
                }}></Icon>
            </div>
            {!notification.isRead && <div className={styles.readMark}/>}
        </div>
    );
};

export default ReportsNotification;

