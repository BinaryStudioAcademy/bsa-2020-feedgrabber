import React from 'react';
import {Input, Segment} from 'semantic-ui-react';
import './styles.sass';
import { useTranslation } from 'react-i18next';

const FreeTextQuestionUI: React.FC =
    () => {
        const [t] = useTranslation();
        return (
            <Segment>
            <Input disabled className="disabled-calendar" icon='text cursor' transparent iconPosition='left'
                   placeholder={t('Long answer text...')} />
        </Segment>
        );
    };
export default FreeTextQuestionUI;
