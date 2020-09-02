import React, {FC, useEffect, useState} from "react";
import {Header, Icon, Label, Search as SearchSemantic} from "semantic-ui-react";
import {IAppState} from "../../models/IAppState";
import {connect, ConnectedProps} from "react-redux";
import {searchOverAllEntities} from "../../sagas/search/routines";
import styles from "./styles.module.sass";

interface IResult {
    count: number;
    title: string;
}

const Search: FC<SearchProps> = ({isLoading, result, searchAll}) => {

    const [options, setOptions] = useState([]);

    useEffect(() => {
        const temp: IResult[] = [];
        if (result?.questions) {
            temp.push({
                count: result.questions.length,
                title: 'Questions'
            });
        }
        if (result?.questionnaires) {
            temp.push({
                count: result.questionnaires.length,
                title: 'Questionnaires'
            });
        }
        if (result?.users) {
            temp.push({
                count: result.users.length,
                title: 'Users'
            });
        }
        if (result?.teams) {
            temp.push({
                count: result.teams.length,
                title: 'Teams'
            });
        }
        if (result?.reports) {
            temp.push({
                count: result.reports.length,
                title: 'Reports'
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
                        results={options}
                        resultRenderer={result => (
                            <div className={styles.searchItem}>
                                <Header className={styles.header} as='h3'>{result?.title}</Header>
                                <Label content={result?.count}/>
                            </div>)}
                        icon={<Icon name='search' link loading={isLoading}/>}
        />
    );
};

const mapStateToProps = (state: IAppState) => ({
    isLoading: state.search.isLoading,
    result: state.search.result
});
const mapDispatchToProps = {
    searchAll: searchOverAllEntities
};

const connector = connect(mapStateToProps, mapDispatchToProps);
type SearchProps = ConnectedProps<typeof connector>;
export default connector(Search);
