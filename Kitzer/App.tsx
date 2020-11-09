import styled from 'styled-components/native';
import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import Article from './components/article.component';
import { parse } from 'fast-xml-parser';
/* global require */
const newsSitesList = [
	{
		name: 'n12',
		displayName: 'N12 – אתר החדשות של ישראל',
		rssUrl:
			'https://rcs.mako.co.il/rss/31750a2610f26110VgnVCM1000005201000aRCRD.xml',
		icon: require('./assets/icons/mako.png')
	},
	{
		name: 'bhol',
		displayName: 'בחדרי חרדים',
		rssUrl: 'https://www.bhol.co.il/rss/index.xml',
		icon: require('./assets/icons/bhol.png')
	}
];

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

export default function App() {
	const [newsSites, setNewsSites] = useState(newsSitesList);
	const [myNews, setMyNews] = useState([]);

	async function test() {
		let allResults = []
		for (const site of newsSites) {
			const result = await getNews(site)
			console.log(result[0])
			allResults =[...allResults,  ...result]
		}
		allResults.sort(function(a,b){
			return b.time-a.time
		})
		setMyNews(allResults)
	}

	const getNews = (site) => {
		let gg = []
		return fetch(site.rssUrl)
			.then((response) => response.text())
			.then((textResponse) => {
				let obj = parse(textResponse);
				let allItems = obj.rss.channel.item.slice(0, 10)
				for (const item of allItems) {
					let latest = item.title.toString().replace(/&quot;/g, '"').replace(/&#39;/g, '\'');
					let time = item.pubDate.match(/([01][0-9]|2[0-3]):[0-5][0-9]/g);
					gg.push({
						textAll: `${time} - ${latest}`,
						time: time[0].replace(':',''),
						fuuTime:item.pubDate,
						picture:item.picture,
						text: latest,
						icon: site.icon,
						displayName: site.displayName
					})
				}
				return gg
			})
	};
	useEffect(() => {
		test()
		// setInterval(() => {
		// 	test()
		// 	console.log('This will run after 5 second!')
		// }, 5000);
	}, []);
	const renderNewsSitesContainers = (newsSites) => {
		return myNews.map((newsSite) => {
			return (
				<NewsSiteContainer key={newsSite.text}>
					<Article newsSite={newsSite}/>
				</NewsSiteContainer>
			);
		});
	};
	return (
		<Container>
			<Title>Kitzer</Title>
			{renderNewsSitesContainers()}
		</Container>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center'
	}
});
