import React, { useState } from 'react';
import styled from 'styled-components/native';
/* global require */

const ArticleContainer = styled.View`
  
  border-radius: 9px;
  elevation: 4;
`;

const NewsSiteIcon = styled.Image`
  width: 18px;
  height: 18px;
`;
const NewsSiteIcon2 = styled.Image`
  margin-left: 15px;
  margin-bottom: 20px;
  width: 300px;
  height: 100px;
`;

const NewsSiteName = styled.Text`
  color: grey;
  margin-left: 10px;
`;

const NewsText = styled.Text`
  color: grey;
  margin-top: 20px;
  margin-bottom: 12px;
  margin-right: 10px;
  margin-left: 10px;
  direction: rtl;
`;

const ArticleInfo = styled.View`
  flex-direction: row;
  bottom: 10px;
  left: 15px;
`;

const Article = (props) => {
	return (
		<ArticleContainer>

			<NewsText>{props.newsSite.textAll}</NewsText>
			{(props.newsSite.picture !== undefined && props.newsSite.picture !== '' ) &&
			<NewsSiteIcon2
				source={{
					uri: props.newsSite.picture
				}}
			/>}

			<ArticleInfo>
				<NewsSiteIcon source={props.newsSite.icon}/>
				<NewsSiteName>{props.newsSite.displayName}</NewsSiteName>
			</ArticleInfo>
		</ArticleContainer>
	);
};

export default Article;
