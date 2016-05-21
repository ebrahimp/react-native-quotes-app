/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
} from 'react-native';

var REQUEST_URL = 'http://quotes.stormconsultancy.co.uk/random.json';


class Quotes extends Component {

  constructor(props) {
   super(props);
   this.state = {
     quotes: null,
   };
  }

  componentDidMount() {
   this.fetchData();
  }

  fetchData() {
  fetch(REQUEST_URL)
    .then((response) => response.json())
    .then((responseData) => {
      var filteredData;
      console.log(responseData);
      this.setState({
        quotes: responseData,
      });
    })
    .catch((error) => {
      console.warn(error);
    })
    .done();
  }

  fetchRandomQuote() {
     this.fetchData();
  }

  render() {
      if (!this.state.quotes) {
        return this.renderLoadingView();
      }

      var quote = this.state.quotes;
      return this.renderQuote(quote);
    }

    renderLoadingView() {
      return (
        <View style={styles.container}>
          <Text>
            Loading quotes...
          </Text>
        </View>
      );
    }

    renderQuote(quote) {
      return (
        <View style={styles.container}>
            <Text style={styles.quoteText}>{quote.quote}</Text>
            <Text style={styles.quoteAuthor}>{quote.author}</Text>
            <TouchableHighlight style={styles.button} underlayColor='#99d9f4' onPress={this.fetchRandomQuote.bind(this)}>
            <Text style={styles.buttonText}>Get another quote</Text>
            </TouchableHighlight>
        </View>
      );
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#F5FCFF',
    },
    quoteText: {
      fontSize: 20,
      marginBottom: 8,
      textAlign: 'center',
      padding: 25,
    },
    quoteAuthor: {
      textAlign: 'center',
      marginBottom: 25,
    },
    buttonText: {
      fontSize: 18,
      color: 'white',
      alignSelf: 'center'
    },
    button: {
      backgroundColor: '#48BBEC',
      borderColor: '#48BBEC',
      borderWidth: 1,
      borderRadius: 8,
      marginBottom: 10,
      justifyContent: 'center',
      padding: 10,
    },
  });


AppRegistry.registerComponent('Quotes', () => Quotes);
