import React, {FC, useState} from 'react';
import UIContent from "../../components/UI/UIContent";
import {useTranslation} from 'react-i18next';
import UIPageTitleToggle from "../../components/UI/UIPageTitleToggle";
import TeamsPage from "../../containers/TeamsPage";
import CompanyUsersList from "../../containers/UserList";

const PeopleManagementPage: FC = () => {
    const [firstOptionActive, setFirstOptionActive] = useState(true);
    const [t] = useTranslation();
    const toggle = () => setFirstOptionActive(!firstOptionActive);

    return (
        <>
            <UIPageTitleToggle firstOption={t("Teams")} secondOption={t("Company employees")} togglePanel={toggle}/>
            <UIContent>
                {firstOptionActive &&
                <TeamsPage/>}
                {!firstOptionActive &&
                <CompanyUsersList/>}
            </UIContent>
        </>
    );
};

export default PeopleManagementPage;
