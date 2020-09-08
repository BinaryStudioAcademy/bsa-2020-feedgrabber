import React, {FC} from "react";
import UIPageTitle from "../../components/UI/UIPageTitle";
import {useTranslation} from "react-i18next";
import UIContent from "../../components/UI/UIContent";
import QuestionForm from "../../components/QuestionForm";

const QuestionDetailsContainer: FC<{ match }> = (
    {
        match
    }) => {
    const [t] = useTranslation();

    return(
      <>
          <UIPageTitle title={t("Question details")}/>
          <UIContent >
            <QuestionForm />
          </UIContent>
      </>
    );
};

export default QuestionDetailsContainer;
