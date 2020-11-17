import React from 'react';
import {IArticle} from '../App';
import styled from 'styled-components/native';

export interface ArticleProps {
  article: IArticle;
  key: number;
}

const ArticleContainer = styled.View`
  height: 150px;
  border-radius: 8px;
  elevation: 4;
  margin-bottom: 20px;
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

const ArticleImage = styled.Image`
  margin-left: 15px;
  margin-bottom: 20px;
  width: 300px;
  height: 100px;
`;

const ArticleText = styled.Text`
  color: grey;
  margin-top: 20px;
  margin-bottom: 12px;
  margin-right: 10px;
  margin-left: 10px;
  direction: rtl;
`;

const Article: React.FC<ArticleProps> = (props) => {
  // const icon = require('../assets/icons/bhol.png');

  return (
    <ArticleContainer>
      <ArticleText>{props.article.textAll}</ArticleText>
      {props.article.picture !== undefined && props.article.picture !== '' && (
        <ArticleImage source={props.article.picture} />
      )}

      <ArticleInfo>
        <NewsSiteIcon source={props.article.icon} />
        <NewsSiteName>{props.article.displayName}</NewsSiteName>
      </ArticleInfo>
    </ArticleContainer>
  );
};

export default Article;
