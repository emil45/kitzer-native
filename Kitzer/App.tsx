import styled from 'styled-components/native';
import React, {useState} from 'react';
import Article from './components/article.component';

export interface NewsSite {
  name: string;
  displayName: string;
  rssUrl: string;
  icon: {};
}

const newsSitesList: NewsSite[] = [
  {
    name: 'n12',
    displayName: 'N12 – אתר החדשות של ישראל',
    rssUrl:
      'https://rcs.mako.co.il/rss/31750a2610f26110VgnVCM1000005201000aRCRD.xml',
    icon: require('./assets/icons/mako.png'),
  },
  {
    name: 'bhol',
    displayName: 'בחדרי חרדים',
    rssUrl: 'https://www.bhol.co.il/rss/index.xml',
    icon: require('./assets/icons/bhol.png'),
  },
];

export interface NewsSitesContainerProps {
  newsSites: NewsSite[];
}

const Container = styled.ScrollView`
  margin: 15px;
`;

const NewsSiteContainer = styled.View`
  margin-bottom: 20px;
`;

const App: React.FC = () => {
  const [newsSites, setNewsSites] = useState(newsSitesList);

  const renderNewsSiteArticles = (newsSite: NewsSite) => {
    return <Article newsSite={newsSite} />;
  };

  const renderNewsSitesContainers = (newsSites: NewsSite[]) => {
    return newsSites.map((newsSite) => {
      return (
        <NewsSiteContainer>
          {renderNewsSiteArticles(newsSite)}
        </NewsSiteContainer>
      );
    });
  };

  return <Container>{renderNewsSitesContainers(newsSites)}</Container>;
};

export default App;
