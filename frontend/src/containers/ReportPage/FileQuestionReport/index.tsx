import { IQuestionReportFileData } from "models/report/IReport";
import React, { FC } from "react";
import { Button } from "semantic-ui-react";

export interface IFileQuestionReportProps {
    data: IQuestionReportFileData;
}

export const FileQuestionReport: FC<IFileQuestionReportProps> = ({ data }) => {
    console.log(data);
    return <div>
             {data?.values && data.values.map(link => 
               <Button style={{ marginBottom: "1em"}}>
                 <a href={link}>{link}</a>
               </Button>
             )}
           </div>;
};
