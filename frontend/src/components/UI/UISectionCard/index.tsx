import React, {FC, useState} from "react";
import styles from "./styles.module.sass";
import {SectionEntity} from "../../../reducers/formEditor/reducer";
import {useTranslation} from "react-i18next";
import {Icon, Modal} from "semantic-ui-react";
import UIButton from "../UIButton";

export interface IUISectionProps {
    section?: SectionEntity;

    onChanged?(id: string, title: string, description: string): void;

    ti?: string;

    onDelete?(action: any): void;

    main?: boolean;
    d?: string;
}

const UISection: FC<IUISectionProps> = ({section, onChanged, ti, d, onDelete, main}) => {
    const [t] = useTranslation();
    const is = !!onChanged;
    const [title, setTitle] = useState(section?.section.title);
    const [description, setDescription] = useState(section?.section.description);
    const [showConfirmationModal, setShowConfirmationModal] = useState(false);
    const confirmationModal = () => {
        return (<Modal
            size="tiny"
            open={showConfirmationModal}
            closeOnDimmerClick
            onClose={() => setShowConfirmationModal(false)}
        >
            <Modal.Header>
                {t("You can't revert this action. ")}
                {t("Are you sure you want to delete this section?")}
            </Modal.Header>
            <Modal.Actions>
                <UIButton title={t("Yes")}
                          onClick={() => {
                              setShowConfirmationModal(false);
                              onDelete(section.id);
                          }}/>
                <UIButton title={t("No")} submit onClick={() => setShowConfirmationModal(false)}/>
            </Modal.Actions>
        </Modal>);
    };

    return (
        <div className={styles.headerContainer}>
            <div className={styles.sectionCard}>
                {!main && is &&
                <div className={styles.buttonContainer}>
                  <button onClick={() => setShowConfirmationModal(true)}>
                    <Icon name='delete'/>
                  </button>
                </div>}
                <input type="text" className={styles.title}
                       value={ti || title || ''}
                       placeholder={t("Title")}
                       onChange={e => is && setTitle(e.target.value)}
                       onBlur={e => {
                           is &&
                           onChanged(section.id, title, description);
                       }}/>
                <input type="text" className={styles.description}
                       value={d || description || ''}
                       placeholder={t("Description")}
                       onChange={e => is && setDescription(e.target.value)}
                       onBlur={e => {
                           is &&
                           onChanged(section.id, title, description);
                       }}/>
            </div>
            {confirmationModal()}
        </div>
    );
};

export default UISection;
