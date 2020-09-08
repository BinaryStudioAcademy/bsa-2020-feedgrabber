import React, { FC, useState } from "react";
import styles from "./styles.module.sass";
import {ISection} from "../../../reducers/formEditor/reducer";
import { useTranslation } from "react-i18next";
import { Icon } from "semantic-ui-react";

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

    return (
        <div className={styles.headerContainer}>
                <div className={["ui very padded segment", styles.sectionCard].join(' ')}>
                    {!main ? <div className={styles.buttonContainer}>
                        <button onClick={() => onDelete({sectionId: section.id, questionnaireId: questionnaireId})}>
                            <Icon name='delete'/>
                        </button>
                    </div> : null}
                    <input type="text" className={styles.title}
                    value={title}
                    placeholder={t("Title")}
                    onChange={e => setTitle(e.target.value)}
                    onBlur={e => {
                        onChanged(section.id, title, description);}}/>
                    <input type="text" className={styles.description}
                    value={description ? description : ''}
                    placeholder={t("Description")}
                    onChange={e => setDescription(e.target.value)}
                    onBlur={e => {
                        onChanged(section.id, title, description);}}/>
                </div>
        </div>
        );
};

export default UISection;
