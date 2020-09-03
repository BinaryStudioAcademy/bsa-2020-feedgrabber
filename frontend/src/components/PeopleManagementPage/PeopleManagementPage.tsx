import React, {FC, useState} from 'react';
import UIContent from "../../components/UI/UIContent";
import {useTranslation} from 'react-i18next';
import UIPageTitleToggle from "../../components/UI/UIPageTitleToggle";
import TeamsPage from "../../containers/TeamsPage";
import CompanyUsersList from "../../containers/UserList";

const PeopleManagementPage: FC<{ match }> = ({match}) => {
    const [t] = useTranslation();
    return (
        <>
            <UIPageTitleToggle
                firstOption={t("Teams")}
                firstOptionLink={"/people/teams"}
                secondOption={t("Company employees")}
                secondOptionLink={"/people/employees"}
                firstIsSelected={match.params.tab==='teams'}
            />
            <UIContent>
                {match.params.tab==='teams' &&
                <TeamsPage/>}
                {match.params.tab==='employees' &&
                <CompanyUsersList/>}
            </UIContent>
        </>
    );
};

export default PeopleManagementPage;
