import { IQuestionResponse } from "models/IQuestionResponse";
import React, { FC, useState } from "react";
import { Input, InputOnChangeData } from "semantic-ui-react";

export const FreeTextResponse: FC<IQuestionResponse> = ({ question, answerHandler }) => {
    const [val, setVal] = useState("");
    const handleChange = (e, v: InputOnChangeData) => {
        setVal(v.value);
        answerHandler?.(question.id, { payload: v });
    };
    return <Input
        value={val}
        onChange={handleChange}
    />;
};