import React, { useEffect, useState } from 'react';
import { connect, ConnectedProps } from "react-redux";
import styles from './styles.module.sass';
import { IAppState } from 'models/IAppState';
import UIContent from "../../components/UI/UIContent";
import LoaderWrapper from "../../components/helpers/LoaderWrapper";
import UIPageTitle from "../../components/UI/UIPageTitle";
import {Accordion, AccordionTitleProps, Icon, Segment} from 'semantic-ui-react';
import { IUserShortInfo} from "../../models/user/types";
import { loadDashboardDataRoutine } from 'sagas/dashboard/rourines';
import {IReportShortDto} from "../../models/report/IReport";
import { useTranslation } from 'react-i18next';

interface ISearchFields {
  owners: string;
  hr: string;
  employees: string;
  teamLeads: string;
  teams: string;
  questionnaireActive: string;
  questionnaireArchive: string;
}

const defaultSearchFields = {
  owners: "",
  hr: "",
  teamLeads: "",
  employees: "",
  teams: "",
  questionnaireActive: "",
  questionnaireArchive: ""
};

const CompanyDashboard: React.FC<CompanyDashboardProps> = (
  { isLoading, loadData, teams, companyName, users, questionnaires }
) => {
  const [activePeopleIndex, setActivePeopleIndex] = useState<string | number>(0);
  const [activeQuestionnaireIndex, setActiveQuestionnaireIndex] = useState<string | number>(0);
  const [searchPatterns, setSearchPatterns] = useState<ISearchFields>(defaultSearchFields);

  const [t] = useTranslation();
  
  useEffect(() => {
    loadData();
  }, [loadData]);

  const getName = (user: IUserShortInfo) => {
    return user.firstName && user.lastName
      ? `${user.lastName} ${user.firstName}`
      : user.username;
  };

  const getUsersContent = (reports: IReportShortDto[]) => {
    return reports?.length > 0
      ? reports.map(r =>
        <div key={r.id} className={styles.reportLink}>
          <a href={`/report/${r.id}`}>{`${r.title} - ${r.closeDate}`}</a>
        </div>
      )
      : [<div className={styles.reportLink}>{t("No reviews yet")}</div>];
  };

  const getQuestionnaireContent = (reports: IReportShortDto[]) => {
    return reports?.length > 0
      ? reports.map(r =>
        <div key={r.id} className={styles.reportLink}>
          <a href={`/report/${r.id}`}>{r.closeDate}</a>
        </div>
      )
      : [<div className={styles.reportLink}>{t("No reports yet")}</div>];
  };

  const handlePeopleAccordionClick = (e, titleProps: AccordionTitleProps) => {
    const { index } = titleProps;
    const newIndex = activePeopleIndex === index ? -1 : index;
    setActivePeopleIndex(newIndex);
  };

  const handlePeopleQuestionnaireClick = (e, titleProps: AccordionTitleProps) => {
    const { index } = titleProps;
    const newIndex = activeQuestionnaireIndex === index ? -1 : index;

    setActiveQuestionnaireIndex(newIndex);
  };

  const filterByRoleAndSearchQuery = (user: IUserShortInfo, key: string, role?: string) => {
    return role
      ? user.role === role &&
        (`${user.firstName} ${user.lastName}`.toLowerCase().includes(searchPatterns[key].toLocaleLowerCase())
          || user.username.toLowerCase().includes(searchPatterns[key].toLowerCase()))
      : `${user.firstName} ${user.lastName}`.toLowerCase().includes(searchPatterns[key].toLocaleLowerCase())
          || user.username.toLowerCase().includes(searchPatterns[key].toLowerCase());
  };

  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchPatterns({...searchPatterns, [e.target.name]: e.target.value });
  };

  return (
    <>
      <UIPageTitle title={companyName} />
      <div className={styles.formDetails}>
        <LoaderWrapper loading={isLoading}>
          <UIContent>
            <div className={styles.userAccordion}>
              <Accordion styled>
                <h3>{t("People")}</h3>
                {/* owners */}
                <Accordion.Title index={0} active={activePeopleIndex === 0} onClick={handlePeopleAccordionClick}>
                  <Icon name='user' />
                  {`${t("Company owners")} - ${users.filter(u => u.role === 'Company owner').length}`}
                </Accordion.Title>
                <Accordion.Content active={activePeopleIndex === 0} className={styles.accordionContent}>
                  <input type="text"
                         name={"owners"}
                         style={{width: '100%'}}
                         placeholder={t("Search...")}
                         onChange={handleSearchInputChange}/>
                  {users.filter(u => filterByRoleAndSearchQuery(u, "owners", "Company owner"))
                    .map(u =>
                      <Accordion
                        key={u.id}
                        panels={[
                          { key: u.id,
                            title: {content: getName(u), icon: "address card outline"},
                            content: getUsersContent(u.reports)
                          }
                        ]}
                      />
                    )}
                </Accordion.Content>

                {/* hr */}
                <Accordion.Title index={1} active={activePeopleIndex === 1} onClick={handlePeopleAccordionClick}>
                  <Icon name='user' />
                  {`${t("HR managers")} - ${users.filter(u => u.role ==='HR').length}`}
                </Accordion.Title>
                <Accordion.Content active={activePeopleIndex === 1} className={styles.accordionContent}>
                  <input type="text"
                         name={"hr"}
                         style={{width: '100%'}}
                         placeholder={t("Search...")}
                         onChange={handleSearchInputChange}/>
                  {users.filter(u => filterByRoleAndSearchQuery(u, 'hr', 'HR'))
                    .map(u =>
                      <Accordion
                        key={u.id}
                        panels={[
                          { key: u.id,
                            title: {content: getName(u), icon: "address card outline"},
                            content: getUsersContent(u.reports)
                          }
                        ]}
                      />
                    )}
                </Accordion.Content>

                {/* team leads */}
                <Accordion.Title index={3} active={activePeopleIndex === 3} onClick={handlePeopleAccordionClick}>
                  <Icon name='user' />
                  {`${t("Team Leaders")} - ${users.filter(t => t.isTeamLead).length}`}
                </Accordion.Title>
                <Accordion.Content active={activePeopleIndex === 3} className={styles.accordionContent}>
                  <input type="text"
                         name={"teamLeads"}
                         style={{width: '100%'}}
                         placeholder={t("Search...")}
                         onChange={handleSearchInputChange}/>
                  {users.filter(u => u.isTeamLead && filterByRoleAndSearchQuery(u, 'teamLeads'))
                    .map(u =>
                      <Accordion
                        key={u.id}
                        panels={[
                          { key: u.id,
                            title: {content: getName(u), icon: "address card outline"},
                            content: getUsersContent(u.reports)
                          }
                        ]}
                      />
                    )}
                </Accordion.Content>

                {/* employees */}
                <Accordion.Title index={2} active={activePeopleIndex === 2} onClick={handlePeopleAccordionClick}>
                  <Icon name='user' />
                  {`${t("Employees")} - ${users.filter(u => u.role ==='Employee').length}`}
                </Accordion.Title>
                <Accordion.Content active={activePeopleIndex === 2} className={styles.accordionContent}>
                  <input type="text"
                         name={"employees"}
                         style={{width: '100%'}}
                         placeholder={t("Search...")}
                         onChange={handleSearchInputChange}/>
                  {users.filter(u => filterByRoleAndSearchQuery(u, "employees", "Employee"))
                    .map(u =>
                      <Accordion
                        key={u.id}
                        panels={[
                          { key: u.id,
                            title: {content: getName(u), icon: "address card outline"},
                            content: getUsersContent(u.reports)
                          }
                        ]}
                      />
                    )}
                </Accordion.Content>

                {/* Teams */}
                <Accordion.Title index={4} active={activePeopleIndex === 4} onClick={handlePeopleAccordionClick}>
                  <Icon name='users' />
                  {`${t("Teams")} - ${teams.length}`}
                </Accordion.Title>
                <Accordion.Content active={activePeopleIndex === 4} className={styles.accordionContent}>
                  <input type="text"
                         name={'teams'}
                         style={{width: '100%'}}
                         placeholder={t("Search...")}
                         onChange={handleSearchInputChange}/>
                  {teams.filter(t => t.name.toLowerCase().includes(searchPatterns.teams.toLowerCase()))
                    .map(t =>
                      <Segment fluid key={t.id} className={styles.teamCard}>
                        <div className={styles.teamName}>{`${t.name} - ${t.membersAmount}`} </div>
                        <a href={`/people/teams/${t.id}`}>edit</a>
                      </Segment>
                    )}
                </Accordion.Content>

              </Accordion>
            </div>
            {/* Questionnaires */}
            <div >
              <Accordion styled>
                <h3>{t("Questionnaires")}</h3>
                {/* active */}
                <Accordion.Title
                  index={0}
                  active={activeQuestionnaireIndex === 0}
                  onClick={handlePeopleQuestionnaireClick}
                >
                  {`${t("Active questionnaires")} - ${questionnaires.filter(q => !q.archived).length}`}
                </Accordion.Title>
                <Accordion.Content active={activeQuestionnaireIndex === 0} className={styles.accordionContent}>
                  <input 
                    type="text"
                    name={'questionnaireActive'}
                    style={{ width: '100%' }}
                    placeholder={t("Search...")}
                    onChange={handleSearchInputChange} 
                  />
                  {questionnaires.filter(q => !q.archived 
                    && q.title.toLowerCase().includes(searchPatterns.questionnaireActive.toLowerCase()))
                    .map(q =>
                      <Accordion
                        key={q.id}
                        panels={[
                          { key: q.id,
                            title: {content: q.title , icon: "file alternate"},
                            content: getQuestionnaireContent(q.reports)
                          }
                        ]}
                      />
                    )}
                </Accordion.Content>
                {/* archived */}
                <Accordion.Title
                  index={1}
                  active={activeQuestionnaireIndex === 1}
                  onClick={handlePeopleQuestionnaireClick}
                >
                  {`${t("Archived questionnaires")} - ${questionnaires.filter(q => q.archived).length}`}
                </Accordion.Title>
                <Accordion.Content active={activeQuestionnaireIndex === 1}>
                  <input
                    type="text"
                    name={'questionnaireArchive'}
                    style={{ width: '100%' }}
                    placeholder={t("Search...")}
                    onChange={handleSearchInputChange}
                  />
                  {questionnaires.filter(q => q.archived
                    && q.title.toLowerCase().includes(searchPatterns.questionnaireArchive.toLowerCase()))
                    .map(q =>
                      <Accordion
                        panels={[
                          { key: q.id,
                            title: {content: q.title , icon: "file alternatee"},
                            content: getQuestionnaireContent(q.reports)
                          }
                        ]}
                      />
                    )}
                </Accordion.Content>
              </Accordion>
            </div>
          </UIContent>
        </LoaderWrapper>
      </div>
    </>
  );
};

const mapStateToProps = (rootState: IAppState) => ({
  users: rootState.dashboard.users,
  questionnaires: rootState.dashboard.questionnaires,
  isLoading: rootState.dashboard.isLoading,
  teams: rootState.dashboard.teams,
  companyName: rootState.dashboard.companyName
});

const mapDispatchToProps = {
  loadData: loadDashboardDataRoutine
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type CompanyDashboardProps = ConnectedProps<typeof connector>;

export default connector(CompanyDashboard);