import React from "react";
import * as yup from 'yup';
import UIColumn from "../../components/UI/UIColumn";
import LoaderWrapper from "../../components/LoaderWrapper";
import UICard from "../../components/UI/UICard";
import UICardBlock from "../../components/UI/UICardBlock";
import {Formik} from "formik";
import UIButton from "../../components/UI/UIButton";
import {ITeam, ITeamCreate, ITeamUpdate} from "../../models/teams/ITeam";
import { useTranslation } from "react-i18next";

interface ITeamMetadataBlockProps {
  isNew: boolean;
  currentTeamError?: string;
  currentTeam?: ITeam;
  isLoadingTeam?: boolean;
  isLoadingRequest?: boolean;

  updateTeam(team: ITeamUpdate): void;
  createTeam(team: ITeamCreate): void;
}

const validationSchema = yup.object().shape({
  name: yup
    .string()
    .required()
});

const TeamMetadataBlock: React.FunctionComponent<ITeamMetadataBlockProps> = (
  {
    isNew,
    currentTeamError,
    currentTeam,
    isLoadingTeam,
    isLoadingRequest,
    createTeam,
    updateTeam
  }
) => {
  const onSubmit = values => {
    if (isNew) {
      createTeam({name: values.name});
    } else {
      updateTeam({id: currentTeam?.id, name: values.name});
    }
  };

  const [t] = useTranslation();

  return (
    <UIColumn wide>
      <LoaderWrapper loading={!isNew && (!currentTeam || isLoadingTeam)}>
        <UICard>
          <UICardBlock>
            <h3>{t("Metadata")}</h3>
          </UICardBlock>
          <UICardBlock>
            <Formik
              initialValues={{name: (currentTeam?.name || "")}}
              validationSchema={validationSchema}
              onSubmit={onSubmit}
            >
              {({
                  values,
                  errors,
                  handleChange,
                  handleBlur,
                  handleSubmit
                }) => {
                const error = errors.name || currentTeamError;
                return (
                  <form onSubmit={handleSubmit}>
                    <label>{t("Team name")}</label>
                    <input
                      id="name"
                      name="name"
                      placeholder={t("Team name")}
                      type="text"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.name}
                    />
                    {error && <div>{error}<br/><br/></div>}
                    <UIButton
                      title={isNew ? t("Add") : t("Update")}
                      onClick={handleSubmit}
                      submit
                      loading={isLoadingRequest}
                      disabled={isLoadingRequest}
                    />
                  </form>
                );
              }}
            </Formik>
          </UICardBlock>
        </UICard>
      </LoaderWrapper>
    </UIColumn>
  );
};

export default TeamMetadataBlock;
