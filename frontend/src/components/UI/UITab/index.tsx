import React from 'react';
import { Tab } from 'semantic-ui-react';

export interface ITabProps {
  menuPosition?: "left" | "right";
  panes?: Array<any>;
}

const UITab: React.FC<ITabProps> = ({ menuPosition, panes }) => {
  return (
    <Tab menuPosition={menuPosition} panes={panes} />
  );
};

export default UITab;