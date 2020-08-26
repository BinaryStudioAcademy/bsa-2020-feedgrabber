export enum Credentials {
    managingQuestions = "Managing questions(CRUD) via question editor",
    managingQuestionnaires = "Managing questionnaires  via form editor",
    createQuestionnaireRequest = "Creating a questionnaire request",
    createPostsAndPolls = "Create posts and polls on company feed",
    createTeams = "Crate teams",
    manageTeams = "Manage teams",
    manageCompanySettings = "Manage company settings",
    signUpViaCorporateEmail = "Enable sign up via the corporate email",
    generateInviteLinks = "Generate invite links",
    blockUserAccount = "Block user account"
}

const employee = {
    static:[]
};

const hr = {
    static: [
        ...employee.static,
        Credentials.managingQuestions,
        Credentials.managingQuestionnaires,
        Credentials.createQuestionnaireRequest,
        Credentials.createPostsAndPolls,
        Credentials.createTeams,
        Credentials.manageTeams
    ]
};

const companyOwner = {
    static: [
        ...hr.static,
        Credentials.manageCompanySettings,
        Credentials.signUpViaCorporateEmail,
        Credentials.generateInviteLinks,
        Credentials.blockUserAccount
    ]
};

export const rolesRules = {
    employee,
    hr,
    "company_owner": companyOwner
};
