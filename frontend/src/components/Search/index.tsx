import React, {FC, useEffect, useState} from "react";
import {Icon, Search as SearchSemantic} from "semantic-ui-react";
import {IAppState} from "../../models/IAppState";
import {connect, ConnectedProps} from "react-redux";
import {searchOverAllEntities} from "../../sagas/search/routines";

interface IResult {
    title: string;
    description: string;
    image?: string;
}

const Search: FC<SearchProps> = ({isLoading, result, searchAll}) => {

    const initialOptions = {
        questionnaires: {
            name: 'Questionnaires',
            results: [] as IResult[]
        },
        questions: {
            name: 'Questions',
            results: [] as IResult[]
        },
        users: {
            name: 'Users',
            results: [] as IResult[]
        },
        teams: {
            name: 'Teams',
            results: [] as IResult[]
        },
        reports: {
            name: 'Reports',
            results: [] as IResult[]
        }
    };

    const [options, setOptions] = useState(initialOptions);

    useEffect(() => {
        const tempOptions = initialOptions;
        tempOptions.questions.results = result?.questions.map(q => {
            return {
                title: q.name,
                description: q.categoryTitle
            };
        }) || [];
        tempOptions.questionnaires.results = result?.questionnaires.map(q => {
            return {
                title: q.title,
                description: q.description
            };
        }) || [];
        tempOptions.users.results = result?.users.map(q => {
            return {
                title: `${q.firstName} ${q.lastName}`,
                description: q.companyName,
                image: q.avatar
            };
        }) || [];
        tempOptions.teams.results = result?.teams.map(q => {
            return {
                title: q.name,
                description: `${q.membersId.length} members`
            };
        }) || [];
        tempOptions.reports.results = result?.reports.map(q => {
            return {
                title: `${q.questionnaire.title} report`,
                description: `${q.questions.length} questions`
            };
        }) || [];

        setOptions(tempOptions);
    }, [initialOptions, result]);

    return (
        <SearchSemantic onSearchChange={(e, {value}) => searchAll(value)}
                        placeholder='Search...'
                        size="small"
                        inverted
                        results={options}
                        icon={<Icon name='search' link loading={isLoading}/>}
                        category/>
    );
};

const mapStateToProps = (state: IAppState) => ({
    isLoading: state.searchResult?.isLoading,
    result: state.searchResult?.result
});
const mapDispatchToProps = {
    searchAll: searchOverAllEntities
};

const connector = connect(mapStateToProps, mapDispatchToProps);
type SearchProps = ConnectedProps<typeof connector>;
export default connector(Search);
