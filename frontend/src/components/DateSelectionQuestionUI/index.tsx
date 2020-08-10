import React from 'react';
import {Input, Segment} from 'semantic-ui-react';
import './styles.sass';

const DateSelectionQuestionUI: React.FC =
    () => (
        <Segment>
            <Input disabled className="disabled-calendar"
                   icon='calendar alternate outline' transparent iconPosition='left' placeholder='09.08.2020' />
        </Segment>
    );
export default DateSelectionQuestionUI;