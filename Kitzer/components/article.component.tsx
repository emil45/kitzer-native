import React from 'react';
import {NewsSite} from '../App';
import styled from 'styled-components/native';

export interface ArticleProps {
  newsSite: NewsSite;
}

const ArticleContainer = styled.View`
  height: 150px;
  border-radius: 8px;
  elevation: 4;
`;

const NewsSiteIcon = styled.Image`
  width: 18px;
  height: 18px;
`;

const NewsSiteName = styled.Text`
  color: grey;
  margin-left: 10px;
`;

const ArticleInfo = styled.View`
  flex-direction: row;
  justify-content: center;
  bottom: 10px;
  left: 15px;
  position: absolute;
`;

const Article: React.FC<ArticleProps> = (props) => {
  const icon = require('../assets/icons/bhol.png');

  return (
    <ArticleContainer>
      <ArticleInfo>
        <NewsSiteIcon source={icon} />
        <NewsSiteName>{props.newsSite.displayName}</NewsSiteName>
      </ArticleInfo>
    </ArticleContainer>
  );
};

export default Article;
