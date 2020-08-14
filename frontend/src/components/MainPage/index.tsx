import React, {FunctionComponent} from 'react';

import UIPageTitle from "../UI/UIPageTitle";
import UIButton from "../UI/UIButton";
import UICard from "../UI/UICard";
import UIContent from "../UI/UIContent";
import UICardBlock from "../UI/UICardBlock";

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
      <UIPageTitle title="Home"/>
      <UIContent>
        <UICard>
          <UICardBlock>
            <h3>Pending Questionnaires</h3>
          </UICardBlock>
          {questionnaireList.map(item => (
            <UICardBlock key={item.id}>
              {item.header && <h4>{item.header}</h4>}
              {item.content && <p>{item.content}</p>}
              {item.author && <p><b>{item.author}</b></p>}
              <UIButton title="Answer"/>
            </UICardBlock>
          ))}
        </UICard>

        <UICard>
          <UICardBlock>
            <h3>My Reports</h3>
          </UICardBlock>
          {reportsList.map(item => (
            <UICardBlock key={item.id}>
              {item.header && <h4>{item.header}</h4>}
              {item.content && <p>{item.content}</p>}
              {item.author && <p><b>{item.author}</b></p>}
              <UIButton title="Details"/>
            </UICardBlock>
          ))}
        </UICard>

        <UICard>
          <UICardBlock>
            <h3>Company NewsFeed</h3>
          </UICardBlock>
          {newsList.map(item => (
            <UICardBlock key={item.id}>
              {item.header && <h4>{item.header}</h4>}
              {item.content && <p>{item.content}</p>}
              {item.author && <p><b>{item.author}</b></p>}
            </UICardBlock>
          ))}
        </UICard>
      </UIContent>

      <footer>
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
