import React, { FC, useState } from "react";
import styles from "./styles.module.sass";
import {ISection} from "../../../reducers/formEditor/reducer";
import { useTranslation } from "react-i18next";
import { Icon, Modal } from "semantic-ui-react";
import UIButton from "../UIButton";

export interface IUISectionProps {
    section: ISection;
    onChanged(id: string, title: string, description: string): void;
    onDelete(action: any): void;
    main?: boolean;
    questionnaireId: string;
}

const UISection: FC<IUISectionProps> = ({
        section, 
        main, 
        questionnaireId, 
        onChanged, 
        onDelete
    }) => {
    const [t] = useTranslation();
    const [title, setTitle] = useState(section.title);
    const [description, setDescription] = useState(section.description);
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
                            onDelete({sectionId: section.id, questionnaireId: questionnaireId});
                        }}/>
                <UIButton title={t("No")} submit onClick={() => setShowConfirmationModal(false)}/>
            </Modal.Actions>
        </Modal>);
    };

    return (
        <div className={styles.headerContainer}>
                <div className={styles.sectionCard}>
                    {!main ? <div className={styles.buttonContainer}>
                        <button onClick={() => setShowConfirmationModal(true)}>
                            <Icon name='delete'/>
                        </button>
                    </div> : null}
                    <input type="text" className={styles.title}
                    value={title || ''}
                    placeholder={t("Title")}
                    onChange={e => setTitle(e.target.value)}
                    onBlur={e => {
                        onChanged(section.id, title, description);}}/>
                    <input type="text" className={styles.description}
                    value={description || ''}
                    placeholder={t("Description")}
                    onChange={e => setDescription(e.target.value)}
                    onBlur={e => {
                        onChanged(section.id, title, description);}}/>
                </div>
                {confirmationModal()}
        </div>
        );
};

export default UISection;
