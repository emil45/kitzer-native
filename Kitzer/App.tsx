import styled from 'styled-components/native';
import React, {useEffect, useState} from 'react';
import Article from './components/article.component';
import {parse} from 'fast-xml-parser';

interface INewsSite {
  id: number;
  name: string;
  displayName: string;
  rssUrl: string;
  icon: {};
  articles: IArticle[];
}

export interface IArticle {
  textAll: string;
  time: string;
  fuuTime: string;
  picture: {};
  text: string;
  icon: {};
  displayName: INewsSite['displayName'];
}

const newsSitesList: INewsSite[] = [
  {
    id: 1,
    name: 'n12',
    displayName: 'N12 – אתר החדשות של ישראל',
    rssUrl:
      'https://rcs.mako.co.il/rss/31750a2610f26110VgnVCM1000005201000aRCRD.xml',
    icon: require('./assets/icons/mako.png'),
    articles: [],
  },
  {
    id: 2,
    name: 'bhol',
    displayName: 'בחדרי חרדים',
    rssUrl: 'https://www.bhol.co.il/rss/index.xml',
    icon: require('./assets/icons/bhol.png'),
    articles: [],
  },
];

export interface NewsSitesContainerProps {
  newsSites: INewsSite[];
}

const Title = styled.Text`
  margin-top: 15px;
  text-align: center;
  font-size: 30px;
  color: darkblue;
`;

const Container = styled.ScrollView`
  margin: 15px;
`;

const NewsSiteContainer = styled.View`
  margin-top: 30px;
`;

const App: React.FC = () => {
  const [newsSites, setNewsSites] = useState(newsSitesList);
  // const [articles, setArticles] = useState([]);

  useEffect(() => {
    getArticles();
  }, [newsSites]);

  const getArticles = async () => {
    let newNewsSites: INewsSite[] = [];

    for (const newsSite of newsSites) {
      await fetch(newsSite.rssUrl)
        .then((response) => response.text())
        .then((textResponse) => {
          let obj = parse(textResponse);
          let allItems = obj.rss.channel.item.slice(0, 10);
          for (const item of allItems) {
            let latest = item.title
              .toString()
              .replace(/&quot;/g, '"')
              .replace(/&#39;/g, "'");
            let time = item.pubDate.match(/([01][0-9]|2[0-3]):[0-5][0-9]/g);
            newsSite.articles.push({
              textAll: `${time} - ${latest}`,
              time: time[0].replace(':', ''),
              fuuTime: item.pubDate,
              picture: item.picture,
              text: latest,
              icon: newsSite.icon,
              displayName: newsSite.displayName,
            });
          }
        });
      newNewsSites.push(newsSite);
    }
    setNewsSites(newNewsSites);
  };

  // async function getArticles() {
  //   for (const newsSite of newsSites) {
  //     const response = await fetch(newsSite.rssUrl);
  //     response.json().then((res) => console.log(res));
  //   }
  // }
  // for (const site of newsSites) {
  //   const result = await getArticles(site);
  //   console.log(result[0]);
  //   allResults = [...allResults, ...result];
  // }
  // allResults.sort(function (a, b) {
  //   return b.time - a.time;
  // });
  // setArticles(allResults);
  // }


  const renderNewsSiteArticles = (newsSite: INewsSite) => {
    return newsSite.articles.map((article, index) => {
      return <Article article={article} key={index} />;
    });
  };

  const renderNewsSites = () => {
    return newsSites.map((newsSite) => {
      return (
        <NewsSiteContainer key={newsSite.id}>
          {renderNewsSiteArticles(newsSite)}
        </NewsSiteContainer>
      );
    });
  };

  return (
    <Container>
      <Title>Kitzer</Title>
      {renderNewsSites()}
    </Container>
  );
};

export default App;
