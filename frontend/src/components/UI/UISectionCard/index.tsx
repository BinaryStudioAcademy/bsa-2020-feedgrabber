import React, {FC, useState} from "react";
import styles from "./styles.module.sass";
import {SectionEntity} from "../../../reducers/formEditor/reducer";
import {useTranslation} from "react-i18next";

export interface IUISectionProps {
    section?: SectionEntity;
    onChanged?(id: string, title: string, description: string): void;
    ti?: string;
    d?: string;
}

const UISection: FC<IUISectionProps> = ({section, onChanged, ti, d}) => {
    const [t] = useTranslation();
    const is = !!onChanged;
    const [title, setTitle] = useState(section?.section.title);
    const [description, setDescription] = useState(section?.section.description);

    return (
        <div className={styles.headerContainer}>
                <div className={[styles.sectionCard].join(' ')}>
                    <input type="text" className={styles.title}
                    value={ti || title || ''}
                    placeholder={t("Title")}
                    onChange={e => is && setTitle(e.target.value)}
                    onBlur={e => { is &&
                        onChanged(section.id, title, description);}}/>
                    <input type="text" className={styles.description}
                    value={d || description || ''}
                    placeholder={t("Description")}
                    onChange={e => is && setDescription(e.target.value)}
                    onBlur={e => { is &&
                        onChanged(section.id, title, description);}}/>
                </div>
        </div>
        );
};

export default UISection;
