import React from 'react';
import { Input, Segment } from 'semantic-ui-react';
import { getValidAnswer } from '../helper';
import { IComponentProps }  from '../IComponentProps';

// TODO: Add validation
const FreeTextQuestionUI: React.FC<IComponentProps> = ({question, handleChange}) => (
    <Segment>
        <Input name="text" type="text"
                onChange={event=> {handleChange(getValidAnswer(question, event.target.value));}}/>
    </Segment>
);

export default FreeTextQuestionUI;