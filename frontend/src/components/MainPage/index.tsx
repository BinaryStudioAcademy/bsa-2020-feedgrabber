import React, {FunctionComponent} from 'react';

import styles from './styles.module.sass';

interface IItem {
    id: string;
    header?: string;
    content?: string;
    author?: string;
}

interface IMainPageProps {
    questionnaireList: IItem[];
    reportsList: IItem[];
    newsList: IItem[];
}

const MainPage: FunctionComponent<IMainPageProps> =
    ({questionnaireList = [], reportsList = [], newsList = []}) => (
        <>
            <main className={styles.contentMain}>
                <div className={styles.cardContainer}>
                    <div className={styles.card}>
                        <h2>Pending Questionnaires</h2>
                        <ul className={styles.questionnaireList}>
                            {questionnaireList.map(item => (
                                <li key={item.id}>
                                    <div>
                                        {item.header && <h3>{item.header}</h3>}
                                        {item.content && <p className={styles.description}>{item.content}</p>}
                                        {item.author && <p className={styles.author}>{item.author}</p>}
                                    </div>
                                    <div className={styles.centerContent}>
                                        <button className={styles.centerContent}>Answer</button>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className={styles.card}>
                        <h2>My Reports</h2>
                        <ul className={styles.reportsList}>
                            {reportsList.map(item => (
                                <li key={item.id}>
                                    <div>
                                        {item.header && <h3>{item.header}</h3>}
                                        {item.content && <p className={styles.description}>{item.content}</p>}
                                        {item.author && <p className={styles.author}>{item.author}</p>}
                                    </div>
                                    <div className={styles.centerContent}>
                                        <button className={styles.centerContent}>Details</button>
                                    </div>
                                </li>
                            ))}
                        </ul>

                    </div>

                    <div className={styles.card}>
                        <h2>Company NewsFeed</h2>
                        <div className={styles.newsContainer}>
                            {newsList.map(item => (
                                <div key={item.id} className={styles.newsItem}>
                                    {item.header && <h3>{item.header}</h3>}
                                    {item.content && <p className={styles.description}>{item.content}</p>}
                                    {item.author && <p className={styles.author}>{item.author}</p>}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </main>
            <footer className={[styles.primaryFooter, styles.centerContent].join(" ")}>
                Binary Studio Academy
            </footer>
        </>
    );

// Mock data
MainPage.defaultProps = {
    questionnaireList: [
        {
            id: "1",
            header: "Important Questions",
            content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit," +
                " sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad" +
                " minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea",
            author: "Donald Trump"
        },
        {id: "2", header: "Very Important Questions"},
        {id: "3", header: "Questionnaire123", content: "Hey!", author: "Donald Trump"}
    ],
    reportsList: [
        {
            id: "1",
            header: "Important Report",
            content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit," +
                " sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad" +
                " minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea",
            author: "Donald Trump"
        },
        {id: "2", header: "Very Important Report"},
        {id: "3", header: "Report123", content: "Hey!", author: "Donald Trump"}
    ],
    newsList: [
        {
            id: "1",
            header: "News",
            content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit," +
                " sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad" +
                " minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea",
            author: "Donald Trump"
        },
        {
            id: "11",
            header: "News",
            content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit," +
                " sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad" +
                " minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea"
        },
        {id: "2", header: "Very Important News", author: ""},
        {id: "3", header: "News123", content: "Hey!", author: "Donald Trump"},
        {
            id: "4",
            header: "Very Important News",
            content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit," +
                " sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad" +
                " minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea",
            author: "Donald Trump"
        },
        {id: "5", header: "News123", content: "Hey!", author: "Donald Trump"}
    ]
};

export default MainPage;