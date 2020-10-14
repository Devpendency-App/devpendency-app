import React from 'react';
import { StyleSheet, View, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import { Title, Paragraph, Text, Card, DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import Constants from 'expo-constants';

import Icon from 'react-native-vector-icons/FontAwesome';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Constants.statusBarHeight,
  },
  scrollView: {
    marginHorizontal: 20,
  },
  cards: {
    flex: 1,
    padding: 20,
  }
  // buttonContainer: {
  //   flexDirection: 'row',
  //   justifyContent: 'left',
  //   alignContent: 'center',
  // }
});

const theme = {
  ...DefaultTheme,
  dark: true,
  roundness: 5,
  colors: {
    ...DefaultTheme.colors,
    primary: '#EEF1E6',
    accent: '#F9665E',
    background: '#A2A2A2',
    text: '#2E373E',
  },
};

const peopleObjects = [
  {
    id: 1,
    name: 'Blake', 
    subtitle: 'Software Developer',
    content: 'Card content 1',
    uri: 'https://picsum.photos/700',
    githubURL: 'url for github 1',
    linkedinURL: 'url for linkedin 1'
  },
  {
    id: 2,
    name: 'Tia', 
    subtitle: 'Software Developer',
    content: 'Card content 2',
    uri: 'https://picsum.photos/700',
    githubURL: 'url for github 2',
    linkedinURL: 'url for linkedin 2'
  }, 
  {
    id: 3,
    name: 'Matt', 
    subtitle: 'Software Developer',
    content: 'Card content 3',
    uri: 'https://picsum.photos/700',
    githubURL: 'url for github 3',
    linkedinURL: 'url for linkedin 3'
  }, 
  {
    id: 4,
    name: 'Stephen', 
    subtitle: 'Software Developer',
    content: 'Card content 4',
    uri: 'https://picsum.photos/700',
    githubURL: 'url for github 4',
    linkedinURL: 'url for linkedin 4'
  }
];

const gotoGithub = (url) => {
  console.log(`clicked on Github ${url}`);
  return;
}

const gotoLinkedin = (url) => {
  console.log(`clicked on linkedin ${url}`);
  return;
}

const RenderDevCard = props => {
  return (
    <View>
      <Card style={styles.cards}>
        <Card.Title title={props.people.name} subtitle={props.people.subtitle} />
        <Card.Cover source={{ uri: props.people.uri }} />
          <Paragraph>{props.people.content}</Paragraph>

          <Card.Actions>

            <TouchableOpacity onPress={() => gotoGithub(props.people.githubURL)}>
            <Icon
              name='github'
              size={25}
              color='#2b3137'
              style={{height:25,width:25}}/>
            </TouchableOpacity>

            <TouchableOpacity style={{marginHorizontal: 5}} onPress={() => gotoLinkedin(props.people.linkedinURL)}>
            <Icon
              name='linkedin'
              size={25}
              color='#0e76a8'
              style={{height:25,width:25}}/>
            </TouchableOpacity>

          </Card.Actions>
      </Card>
    </View>
  );
};

const DevCardList = () => {
  return (
      peopleObjects.map(people => {
        return <RenderDevCard people={people} key={people.id} />;
      })
  );
};


export default function DevList() {
  return (
    <PaperProvider theme={theme}>
      <SafeAreaView style={styles.container}>
        <ScrollView style={styles.scrollView}>

        <Title>Meet the Devs</Title>
        <DevCardList />
        
        </ScrollView>
      </SafeAreaView>
    </PaperProvider>
  );
}

//Thanks to this guide, it helped out a lot!! https://dev.to/britneys/creating-reusable-react-components-with-map-4823