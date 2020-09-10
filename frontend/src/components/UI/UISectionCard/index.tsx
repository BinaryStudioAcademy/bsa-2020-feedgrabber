import React, {FC, useState} from "react";
import styles from "./styles.module.sass";
import {SectionEntity} from "../../../reducers/formEditor/reducer";
import {useTranslation} from "react-i18next";

export interface IUISectionProps {
    section: SectionEntity;
    onChanged(id: string, title: string, description: string): void;
}

const UISection: FC<IUISectionProps> = ({section, onChanged}) => {
    const [t] = useTranslation();
    const [title, setTitle] = useState(section.section.title);
    const [description, setDescription] = useState(section.section.description);

    return (
        <div className={styles.headerContainer}>
                <div className={[styles.sectionCard].join(' ')}>
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
        </div>
        );
};

export default UISection;
