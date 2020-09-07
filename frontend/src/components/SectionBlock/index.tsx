import React from 'react';
import styles from "./styles.module.scss";
import { useDrop } from 'react-dnd';
import { DraggableItemTypes } from 'models/forms/Questions/IQuesion';
import { Header } from 'semantic-ui-react';
import { useTranslation } from "react-i18next";

interface ISectionProps {
    id: string;
}

const SectionBlock: React.FC<ISectionProps> = ({id, children}) => {
    const [t] = useTranslation();
    const [{ canDrop, isOver }, drop] = useDrop({
        accept: DraggableItemTypes.QUESTION_CARD,
        drop: () => ({
            id: id
        }),
        collect: monitor => ({
          isOver: monitor.isOver(),
          canDrop: monitor.canDrop()
        })
      });

    const isActive = canDrop && isOver;

    return (
        <div id={id}
            className={[styles.section, styles.backgroundColor].join(' ')}
            ref={drop}>
            {children}
            {isActive
              ? <Header as='h3'>{t("Drop Question here")}</Header>
              : null
            }
        </div>
    );
};

export default SectionBlock;
