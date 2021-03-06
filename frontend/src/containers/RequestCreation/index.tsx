import React, {useEffect, useState} from "react";
import UIPageTitle from "../../components/UI/UIPageTitle";
import UIContent from "../../components/UI/UIContent";
import UIColumn from "../../components/UI/UIColumn";
import UICard from "../../components/UI/UICard";
import UIButton from "../../components/UI/UIButton";
import UICardBlock from "../../components/UI/UICardBlock";
import {IAppState} from "../../models/IAppState";
import {connect, ConnectedProps} from "react-redux";
import {loadCompanyUsersRoutine, loadTeamsRoutine, setTeamPaginationRoutine} from "../../sagas/teams/routines";
import UIUserItemCard from "../../components/UI/UIUserItemCard";
import {Formik} from "formik";
import DatePicker from "react-datepicker";
import styles from './styles.module.sass';
import "react-datepicker/dist/react-datepicker.css";
import {Dimmer, Header, Message} from "semantic-ui-react";
import {sendQuestionnaireRequestRoutine} from "../../sagas/request/routines";
import {history} from '../../helpers/history.helper';
import {IUserShort} from "../../models/user/types";
import {ITeamShort} from "../../models/teams/ITeam";
import UITeamItemCard from "../../components/UI/UITeamItemCard";
import LoaderWrapper from "../../components/helpers/LoaderWrapper";
import {RouteComponentProps} from "react-router-dom";
import Form from "../../components/Form";
import UISwitch from "../../components/UI/UIInputs/UISwitch";
import {useTranslation} from "react-i18next";
import QuestionnaireList from "../QuestionnaireList";
import GenericPagination from "../../components/helpers/GenericPagination";
import {
    clearFormEditor,
    deleteSectionRoutine,
    loadFormRoutine,
    setCurrentQInForm,
    updateOrderInForm,
    updateOrderInFormRoutine,
    updateSectionRoutine
} from "../../sagas/sections/routines";

const initialValues = {
    chosenUsers: new Array<IUserShort>(),
    chosenTeams: new Array<ITeamShort>(),
    targetUserId: null,
    includeTargetUser: false,
    sendToTargetUser: false,
    withDeadline: false,
    expirationDate: null,
    notifyUsers: false,
    generateReport: false,
    changeable: false
};

const RequestCreation: React.FC<ConnectedRequestCreationProps & { match }> =
    ({
         match,
         teamsPagination,
         setTeamPagination,
         users,
         loadTeams,
         loadUsers,
         updateSection,
        loadForm,
        questions,
        updateOrderApi,
         updateOrder,
         sendRequest,
         isLoadingUsers,
         setCurrentQuestion,
         isLoadingTeams,
         sections,
         deleteSection,
         setNoSections,
         questionnaireId
     }) => {
        const [t] = useTranslation();
        // load users
        useEffect(() => {
            loadUsers();
        }, [loadUsers]);

    // load teams
    useEffect(() => {
        loadTeams({notBlank: 'notBlank'});
    }, [loadTeams]);

    // load questionnaire
    useEffect(() => {
        match.params?.id && loadForm(match.params.id);
    }, [loadForm, match.params]);

    const [targetUserPattern, setTargetUserPattern] = useState('');
    const [respondentPattern, setRespondentPattern] = useState('');
    const [selectTeams, setSelectTeams] = useState(true);
    const [error, setError] = useState(null);

    const isUserFind = user => {
        const pattern = targetUserPattern.toLowerCase();
        const name = user.firstName?.toLowerCase();
        const surname = user.lastName?.toLowerCase();

        return user.username?.toLowerCase().includes(pattern)
            || `${name} ${surname}`.includes(pattern);
    };

    const handleSearchChange = value => {
        setRespondentPattern(value);
        loadTeams({query: value, notBlank: 'notBlank'});
    };

    return (
        <>
            <UIPageTitle title={t("Send Request")}/>
            <UIContent>
                <UIColumn>
                    <UICard>
                        <UICardBlock>
                            {!sections.ids.length
                                ? <QuestionnaireList muteActions/>
                                : <>
                                    <Header
                                        as='h5'
                                        onClick={setNoSections}
                                        className={styles.changeQuest}>
                                        Use another questionnaire
                                    </Header>
                                    <Form
                                        updateSection={updateSection}
                                        setCurrentQuestion={setCurrentQuestion}
                                        updateOrderApi={updateOrderApi}
                                        updateOrder={updateOrder}
                                        deleteSection={deleteSection}
                                        sections={sections}
                                        questions={questions}
                                    />
                                </>}
                        </UICardBlock>
                    </UICard>
                </UIColumn>
                <UIColumn>
                    <LoaderWrapper loading={!users || isLoadingUsers || !teamsPagination.items}>
                        <Dimmer.Dimmable
                            blurring
                            dimmed={!sections.ids.length}
                            className={!sections.ids.length && styles.dimmer}>
                            <UICard>
                                <Formik
                                    initialValues={initialValues}
                                    onSubmit={values => {
                                        if (values.withDeadline && !values.expirationDate) {
                                            setError(t("Select deadline date!"));
                                            return;
                                        }
                                        if (values.chosenUsers.length === 0 && values.chosenTeams.length === 0) {
                                            setError(t("Select at least one user or team"));
                                            return;
                                        }
                                        setError(null);

                                        const data = {
                                            expirationDate: values.withDeadline
                                                ? values.expirationDate.toISOString() : null,
                                            generateReport: values.generateReport,
                                            notifyUsers: values.notifyUsers,
                                            questionnaireId: questionnaireId,
                                            targetUserId: values.targetUserId,
                                            includeTargetUser: !!values.targetUserId && values.includeTargetUser,
                                            sendToTargetUser: !!values.sendToTargetUser && values.sendToTargetUser,
                                            respondentIds: values.chosenUsers.map(user => user.id),
                                            teamIds: values.chosenTeams.map(team => team.id),
                                            changeable: values.changeable
                                        };
                                        sendRequest(data);
                                        history.goBack();
                                    }}
                                >
                                    {
                                        formik => (
                                            <form onSubmit={formik.handleSubmit}>

                                                <UICardBlock>
                                                    <h4>{t("Assign target user")}:</h4>
                                                    <p>{t("This user will receive report")}</p>
                                                    <input type="text"
                                                           style={{width: '100%'}}
                                                           placeholder={t("Search...")}
                                                           onChange={e => setTargetUserPattern(e.target.value)}/>
                                                    <div className={styles.targetUserContainer}>
                                                        {
                                                            users
                                                                .filter(user => targetUserPattern
                                                                    ? isUserFind(user) : true)
                                                                .map(user => (
                                                                    <UIUserItemCard
                                                                        key={user.id}
                                                                        firstName={user.firstName}
                                                                        lastName={user.lastName}
                                                                        userInfo={t('username') + ': ' + user.username}
                                                                        avatar={user.avatar}
                                                                        onClick={() => {
                                                                            formik.setFieldValue('targetUserId',
                                                                                formik
                                                                                    .values
                                                                                    .targetUserId === user.id
                                                                                    ? null : user.id);
                                                                        }}
                                                                        selected={formik
                                                                            .values
                                                                            .targetUserId === user.id}
                                                                    />
                                                                ))
                                                        }
                                                    </div>
                                                </UICardBlock>

                                                {formik.values.targetUserId && (<UICardBlock>
                                                    <h4 className={styles.yesNoHeader}>
                                                        {t("Include target user to request?")}
                                                        <span>
                                                        <UISwitch
                                                            name='includeTargetUser'
                                                            checked={formik.values.includeTargetUser}
                                                            onChange={formik.handleChange}
                                                        /></span>
                                                    </h4>
                                                    <p>{t("If yes, this user will also receive request")}</p>
                                                </UICardBlock>)}
                                                {formik.values.targetUserId && (<UICardBlock>
                                                    <h4 className={styles.yesNoHeader}>
                                                        {t("Send report to target user?")}
                                                        <span>
                                                        <UISwitch
                                                            name='sendToTargetUser'
                                                            checked={formik.values.sendToTargetUser}
                                                            onChange={formik.handleChange}
                                                        /></span>
                                                    </h4>
                                                    <p>{t("If yes, this user will also receive report")}</p>
                                                </UICardBlock>)}
                                                <UICardBlock>
                                                    <h4 className={styles.yesNoHeader}>
                                                        {t("Set Deadline for this request?")}
                                                        <span>
                                                        <UISwitch
                                                            name='withDeadline'
                                                            checked={formik.values.withDeadline}
                                                            onChange={formik.handleChange}
                                                        /></span>
                                                    </h4>
                                                    <p>{t("Users will be notified before the deadline")}</p>

                                                    {formik.values.withDeadline &&
                                                    <>
                                                      <p className={styles.deadlineDate}>
                                                          {formik.values.expirationDate
                                                              ? formik.values.expirationDate.toLocaleString()
                                                              : ' '}
                                                      </p>
                                                      <DatePicker name='expirationDate'
                                                                  minDate={new Date()}
                                                                  selected={formik.values.expirationDate}
                                                                  onChange={date => formik
                                                                      .setFieldValue('expirationDate', date)}
                                                                  showTimeSelect
                                                                  inline
                                                      />
                                                    </>
                                                    }
                                                </UICardBlock>

                                                <UICardBlock>
                                                    <h4 className={styles.yesNoHeader}>{t("Notify Users?")}
                                                        <span>
                                                        <UISwitch
                                                            name='notifyUsers'
                                                            checked={formik.values.notifyUsers}
                                                            onChange={formik.handleChange}
                                                        /></span>
                                                    </h4>
                                                    <p>{t("Users will be notified after sending the request")}</p>
                                                </UICardBlock>

                                                <UICardBlock>
                                                    <h4 className={styles.yesNoHeader}>
                                                        {t("Automatically Generate Report?")}
                                                        <span>
                                                        <UISwitch
                                                            name='generateReport'
                                                            checked={formik.values.generateReport}
                                                            onChange={formik.handleChange}
                                                        /></span>
                                                    </h4>
                                                </UICardBlock>

                                                <UICardBlock>
                                                    <h4 className={styles.yesNoHeader}>{t("Can users change answers?")}
                                                        <span>
                                                        <UISwitch
                                                            name="changeable"
                                                            checked={formik.values.changeable}
                                                            onChange={formik.handleChange}
                                                        />
                                                    </span>
                                                    </h4>
                                                </UICardBlock>

                                                <UICardBlock>
                                                    <div className={styles.selectHeader}>
                                                        <h4>
                                                        <span className={[styles.option
                                                            , selectTeams && styles.selected].join(' ')}
                                                              onClick={() => {
                                                                  if (!selectTeams) {
                                                                      setSelectTeams(true);
                                                                      formik.setFieldValue('chosenUsers'
                                                                          , []);
                                                                  }
                                                              }}>
                                                            {t("Select Teams")}
                                                        </span>
                                                            <span className={styles.separator}>{t("or")}</span>
                                                            <span
                                                                className={[styles.option
                                                                    , !selectTeams && styles.selected].join(' ')}
                                                                onClick={() => {
                                                                    if (selectTeams) {
                                                                        setSelectTeams(false);
                                                                        formik.setFieldValue('chosenTeams', []);
                                                                    }
                                                                }}>
                                                            {t("Select Users")}
                                                        </span>
                                                        </h4>
                                                    </div>
                                                    <input type="text"
                                                           style={{width: '100%'}}
                                                           placeholder={t("Search...")}
                                                           onChange={e => handleSearchChange(e.target.value)}
                                                           value={respondentPattern}
                                                    />
                                                    {selectTeams && <GenericPagination
                                                      isLoading={isLoadingTeams}
                                                      unmutedLoading={false}
                                                      pagination={teamsPagination}
                                                      setPagination={setTeamPagination}
                                                      loadItems={() =>
                                                          loadTeams({query: respondentPattern, notBlank: true})}
                                                      mapItemToJSX={(team: ITeamShort) =>
                                                          <UITeamItemCard
                                                              key={team.id}
                                                              team={team}
                                                              selected={formik.values.chosenTeams.includes(team)}
                                                              onClick={() => {
                                                                  let newTeams: any[];
                                                                  if (formik.values.chosenTeams.includes(team)) {
                                                                      newTeams = formik.values.chosenTeams
                                                                          .filter(t => t !== team);
                                                                  } else {
                                                                      newTeams = [...formik.values.chosenTeams, team];
                                                                  }
                                                                  formik.setFieldValue('chosenTeams', newTeams);
                                                              }}
                                                          />}
                                                    />}
                                                    {!selectTeams && users
                                                        .filter(user => respondentPattern
                                                            ? user.username.includes(respondentPattern)
                                                            || `${user.firstName} ${user.lastName}`
                                                                .includes(respondentPattern)
                                                            : true)
                                                        .map(user => (
                                                            <UIUserItemCard
                                                                key={user.id}
                                                                avatar={user.avatar}
                                                                username={user.username}
                                                                firstName={user.firstName}
                                                                lastName={user.lastName}
                                                                userInfo={'Username: ' + user.username}
                                                                selected={formik.values.chosenUsers.includes(user)}
                                                                onClick={() => {
                                                                    let newUsers: any[];
                                                                    if (formik.values.chosenUsers.includes(user)) {
                                                                        newUsers = formik.values.chosenUsers
                                                                            .filter(u => u !== user);
                                                                    } else {
                                                                        newUsers = [...formik.values.chosenUsers, user];
                                                                    }
                                                                    formik.setFieldValue('chosenUsers', newUsers);
                                                                }}/>
                                                        ))}
                                                </UICardBlock>

                                                <UICardBlock>
                                                    <UIButton title={t('Send')} submit/>
                                                    {error && <Message color='red'>{error}</Message>}

                                                </UICardBlock>
                                            </form>
                                        )}
                                </Formik>
                            </UICard>
                        </Dimmer.Dimmable>
                    </LoaderWrapper>
                </UIColumn>
            </UIContent>
        </>
    );
};

const mapStateToProps = (state: IAppState, ownProps: RouteComponentProps) => ({
    domProps: ownProps,
    isLoadingTeams: state.teams.isLoading,
    users: state.teams.companyUsers,
    teamsPagination: state.teams.pagination,
    isLoadingUsers: state.teams.isLoadingUsers,
    sections: state.formEditor.sections,
    questions: state.formEditor.questions,
    questionnaireId: state.formEditor.questionnaire.id
});

const mapDispatchToProps = {
    loadTeams: loadTeamsRoutine,
    loadUsers: loadCompanyUsersRoutine,
    updateOrder: updateOrderInForm,
    updateOrderApi: updateOrderInFormRoutine,
    updateSection: updateSectionRoutine,
    setCurrentQuestion: setCurrentQInForm,
    deleteSection: deleteSectionRoutine,
    setTeamPagination: setTeamPaginationRoutine,
    setNoSections: clearFormEditor,
    sendRequest: sendQuestionnaireRequestRoutine,
    loadForm: loadFormRoutine
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type ConnectedRequestCreationProps = ConnectedProps<typeof connector>;

export default connector(RequestCreation);
