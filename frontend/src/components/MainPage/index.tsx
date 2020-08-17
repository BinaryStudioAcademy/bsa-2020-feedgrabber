import React, {FunctionComponent} from 'react';

import UIPageTitle from "../UI/UIPageTitle";
import UIButton from "../UI/UIButton";
import UICard from "../UI/UICard";
import UIContent from "../UI/UIContent";
import UICardBlock from "../UI/UICardBlock";
import UIColumn from "../UI/UIColumn";

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
        <UIColumn>
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
        </UIColumn>

        <UIColumn>
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
        </UIColumn>

        <UIColumn wide>
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
        </UIColumn>
      </UIContent>
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
    {
      id: "2",
      header: "Very Important Questions",
      content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor " +
        "incididunt ut labore et dolore magna aliqua. Lectus quam id leo in vitae. Sit amet " +
        "consectetur adipiscing elit ut. Id nibh tortor id aliquet. Nisi est sit amet facilisis " +
        "magna. Sed lectus vestibulum mattis ullamcorper velit sed ullamcorper morbi tincidunt. " +
        "Pulvinar elementum integer enim neque. Neque egestas congue quisque egestas diam in. " +
        "Nisi scelerisque eu ultrices vitae auctor eu augue ut. Massa placerat duis ultricies " +
        "lacus sed turpis tincidunt. Viverra tellus in hac habitasse platea dictumst vestibulum." +
        " Sit amet nisl purus in mollis nunc sed id. Facilisis sed odio morbi quis commodo odio aenean."
    },
    {
      id: "3",
      header: "Questionnaire123",
      content: "Nunc scelerisque viverra mauris in aliquam. Etiam tempor orci eu " +
        "lobortis elementum nibh tellus molestie nunc. Vestibulum lectus mauris ultrices " +
        "eros in. Dui accumsan sit amet nulla facilisi morbi tempus iaculis urna. Enim " +
        "praesent elementum facilisis leo. Scelerisque in dictum non consectetur. Tempor " +
        "orci eu lobortis elementum nibh tellus molestie. Fermentum posuere urna nec tincidunt " +
        "praesent semper feugiat nibh.",
      author: "Donald Trump"
    }
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
    {
      id: "2",
      header: "Very Important Report",
      content: "Diam maecenas sed enim ut sem viverra aliquet. Quam lacus suspendisse faucibus " +
        "interdum posuere lorem ipsum dolor sit. Lectus quam id leo in vitae turpis. Et ligula " +
        "ullamcorper malesuada proin. Nulla facilisi morbi tempus iaculis urna id volutpat. " +
        "Non blandit massa enim nec. Habitasse platea dictumst quisque sagittis. "
    },
    {
      id: "3",
      header: "Report123",
      content: "Elementum tempus egestas sed sed. Turpis egestas maecenas pharetra convallis " +
        "posuere morbi leo. Nulla pharetra diam sit amet nisl suscipit adipiscing " +
        "bibendum. Ultricies mi eget mauris pharetra et ultrices neque ornare aenean. " +
        "Arcu dictum varius duis at. ",
      author: "Donald Trump"
    }
  ],
  newsList: [
    {
      id: "1",
      header: "News",
      content: "Diam maecenas sed enim ut sem viverra aliquet. Quam lacus suspendisse faucibus " +
        "interdum posuere lorem ipsum dolor sit. Lectus quam id leo in vitae turpis. Et ligula " +
        "ullamcorper malesuada proin. Nulla facilisi morbi tempus iaculis urna id volutpat. " +
        "Non blandit massa enim nec. Habitasse platea dictumst quisque sagittis. ",
      author: "Donald Trump"
    },
    {
      id: "2",
      header: "News",
      content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit," +
        " sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad" +
        " minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea"
    },
    {
      id: "3",
      header: "Very Important News",
      content: "Elementum tempus egestas sed sed. Turpis egestas maecenas pharetra convallis " +
        "posuere morbi leo. Nulla pharetra diam sit amet nisl suscipit adipiscing " +
        "bibendum. Ultricies mi eget mauris pharetra et ultrices neque ornare aenean. " +
        "Arcu dictum varius duis at. ",
      author: ""
    },
    {id: "4", header: "News123", content: "Hey!", author: "Donald Trump"},
    {
      id: "5",
      header: "Very Important News",
      content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit," +
        " sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad" +
        " minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea",
      author: "Donald Trump"
    },
    {id: "6", header: "News123", content: "Hey!", author: "Donald Trump"}
  ]
}
;

export default MainPage;
