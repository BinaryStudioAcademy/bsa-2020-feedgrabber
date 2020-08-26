export enum Credentials {
    managingQuestions = "Managing questions(CRUD) via question editor",
    managingQuestionnaires = "Managing questionnaires  via form editor",
    createQuestionnaireRequest = "Creating a questionnaire request",
    createPostsAndPolls = "Create posts and polls on company feed",
    manageCompanySettings = "Manage company settings",
    signUpViaCorporateEmail = "Enable sign up via the corporate email",
    generateInviteLinks = "Generate invite links"
}

const getRules = () => {
    const employee = {
        static:[]
    };

    const hr = {
            static: [
                ...employee.static,
                Credentials.managingQuestions,
                Credentials.managingQuestionnaires,
                Credentials.createQuestionnaireRequest,
                Credentials.createPostsAndPolls
            ]
        };

    const companyOwner = {
        static: [
            ...hr.static,
            Credentials.manageCompanySettings,
            Credentials.signUpViaCorporateEmail,
            Credentials.generateInviteLinks
        ]
    };

    return {
        employee,
        hr,
        "company_owner": companyOwner
    };
};

export const rolesRules = getRules();
