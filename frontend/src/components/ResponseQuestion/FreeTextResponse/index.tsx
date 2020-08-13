import { IQuestionResponse } from "models/IQuestionResponse";
import React, { FC, useState } from "react";
import { Button, Input, InputOnChangeData } from "semantic-ui-react";
import styles from "./styles.module.sass";

export const FreeTextResponse: FC<IQuestionResponse> = ({ question, answerHandler }) => {
    const [val, setVal] = useState("");
    const handleChange = (e, v: InputOnChangeData) => {
        setVal(v.value);
    };
    return <><Input
        value={val}
        onChange={handleChange}
        placeholder='Answer field'
        className={styles.input}
    />
        <Button
            content='Submit'
            disabled={!val}
            onClick={() => answerHandler?.(question.id, { payload: val })} />
    </>;
};