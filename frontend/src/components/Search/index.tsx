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

    const [options, setOptions] = useState([]);

    useEffect(() => {
        const temp: { name: string; results: IResult[] }[] = [];
        if (result?.questions) {
            temp.push({
                name: 'Questions', results: result.questions.map(q => {
                    return {
                        title: q.name,
                        description: q.categoryTitle
                    };
                })
            });
        }
        if (result?.questionnaires) {
            temp.push({
                name: 'Questionnaires', results: result.questionnaires.map(q => {
                    return {
                        title: q.title,
                        description: q.description
                    };
                })
            });
        }
        if (result?.users) {
            temp.push({
                name: 'Users', results: result.users.map(q => {
                    return {
                        title: `${q.firstName} ${q.lastName}`,
                        description: q.companyName,
                        image: q.avatar
                    };
                })
            });
        }
        if (result?.teams) {
            temp.push({
                name: 'Teams', results: result.teams.map(q => {
                    return {
                        title: q.name,
                        description: `${q.membersId.length} members`
                    };
                })
            });
        }
        if (result?.reports) {
            temp.push({
                name: 'Reports', results: result.reports.map(q => {
                    return {
                        title: `${q.questionnaire.title} report`,
                        description: `${q.questions.length} questions`
                    };
                })
            });
        }
        setOptions(temp);
    }, [result]);

    const handleChange = (e, data) => {
        data.value.trim() ? searchAll(data.value.trim()) : setOptions([]);
    };

    return (
        <SearchSemantic onSearchChange={handleChange}
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
