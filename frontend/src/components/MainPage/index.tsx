import React, { FunctionComponent } from 'react';

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
  ({ questionnaireList = [], reportsList = [], newsList = [] }) => (
    <>
      <main className={styles.contentMain}>
        <div className={styles.cardContainer}>
          <div className={styles.card}>
            <h2>My Reports</h2>
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
export default MainPage;