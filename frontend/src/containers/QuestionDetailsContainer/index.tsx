import React, {FC} from "react";
import QuestionDetailsPage from "../QuestionDeatilsPage";
import UIPageTitle from "../../components/UI/UIPageTitle";
import {useTranslation} from "react-i18next";
import UIContent from "../../components/UI/UIContent";

const QuestionDetailsContainer: FC<{ match }> = (
    {
        match
    }) => {
    const [t] = useTranslation();

    return(
      <>
          <UIPageTitle title={t("Question details")}/>
          <UIContent >
            <QuestionDetailsPage />
          </UIContent>
      </>
    );
};

export default QuestionDetailsContainer;
