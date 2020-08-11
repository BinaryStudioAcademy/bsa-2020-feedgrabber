import React from 'react';
import {Input, Segment} from 'semantic-ui-react';
import './styles.sass';

const FreeTextQuestionUI: React.FC =
    () => (
        <Segment>
            <Input disabled className="disabled-calendar"
                   icon='text cursor' transparent iconPosition='left' placeholder='Long answer text...' />
        </Segment>
    );
export default FreeTextQuestionUI;