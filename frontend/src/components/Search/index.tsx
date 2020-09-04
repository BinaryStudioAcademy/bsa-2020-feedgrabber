import React, {FC, useEffect, useState} from "react";
import {Header, Label, Search as SearchSemantic} from "semantic-ui-react";
import {IAppState} from "../../models/IAppState";
import {connect, ConnectedProps} from "react-redux";
import {searchOverAllEntities} from "../../sagas/search/routines";
import styles from "./styles.module.sass";
import {history} from "../../helpers/history.helper";
import {useTranslation} from "react-i18next";

interface IResult {
    count: number;
    title: string;
    route: string;
}

const Search: FC<SearchProps> = ({isLoading, result, searchAll, searchQuery}) => {

    const [options, setOptions] = useState([]);
    const [t] = useTranslation();

    useEffect(() => {
        const temp: IResult[] = [];
        if (result?.questions) {
            temp.push({
                count: result.questions.length,
                title: 'Questions',
                route: '/questions'
            });
        }
        if (result?.questionnaires) {
            temp.push({
                count: result.questionnaires.length,
                title: 'Questionnaires',
                route: '/questionnaires'
            });
        }
        if (result?.users) {
            temp.push({
                count: result.users.length,
                title: 'Users',
                route: 'people/employees'
            });
        }
        if (result?.teams) {
            temp.push({
                count: result.teams.length,
                title: 'Teams',
                route: '/people/teams'
            });
        }
        if (result?.reports) {
            temp.push({
                count: result.reports.length,
                title: 'Reports',
                route: ''
            });
        }
        setOptions(temp);
    }, [result]);

    const handleChange = (e, data) => {
        searchAll(data.value.trim());
    };

    return (
        <SearchSemantic onSearchChange={handleChange}
                        placeholder={t('Search...')}
                        size="small"
                        results={options}
                        value={searchQuery}
                        resultRenderer={result => (
                            <div
                                className={`${styles.searchItem} ${!result?.count && styles.disabled}`}
                            onClick={()=>history.push(result.route)}>
                                <Header className={styles.header} as='h3'>{result?.title}</Header>
                                <Label
                                    className={`${styles.label} ${result?.count && styles.labelActive}`}
                                    content={result?.count}/>
                            </div>)}
                        loading={isLoading}
        />
    );
};

const mapStateToProps = (state: IAppState) => ({
    isLoading: state.search.isLoading,
    result: state.search.result,
    searchQuery: state.search.searchQuery
});
const mapDispatchToProps = {
    searchAll: searchOverAllEntities
};

const connector = connect(mapStateToProps, mapDispatchToProps);
type SearchProps = ConnectedProps<typeof connector>;
export default connector(Search);
