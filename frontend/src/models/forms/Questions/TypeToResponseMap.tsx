import { FreeTextResponse } from "components/ResponseQuestion/FreeTextResponse";
import React from "react";

export default new Map([
    ['FREE_TEXT', Object.assign({}, <FreeTextResponse question={null} />)]
    // ,['RADIO', Object.assign({}, <RadioResponse question={null} />)]
    // ,['SCALE', Object.assign({}, <ScaleResponse question={null} />)]
    // ,['CHECKBOX', Object.assign({}, <CheckBoxResponse question={null} />)]
    // ,['MULTI_CHOICE', Object.assign({}, <MultiChoiceResponse question={null} />)]
    // ,['DATE', Object.assign({}, <DateResponse question={null} />)]
]);