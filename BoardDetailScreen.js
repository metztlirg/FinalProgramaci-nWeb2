import React, { Component } from 'react';
import { StyleSheet, ScrollView, ActivityIndicator, View } from 'react-native';
import { List, ListItem, Text, Card, Button } from 'react-native-elements';
import firebase from '../firebasedb';

class BoardDetailScreen extends Component {
  
  constructor() {
    super();
    
    this.state = {
      isLoading: false,
      board: {},
      key: ''
    };
  }

  componentDidMount() {
    const { route, navigation } = this.props;
    const {boardkey } = route.params;
    
    console.log(boardkey)
    const ref = firebase.firestore().collection('boards').doc(JSON.parse(this.props.route.params.boardkey));
    ref.get().then((doc) => {
      if (doc.exists) {
        this.setState({
          board: doc.data(),
          key: doc.id,
          isLoading: false
        });
      } else {
        console.log("¡No existe el elemento!");
      }
    });
  }
  
  deleteBoard(key) {
    const { navigation } = this.props;
    this.setState({
      isLoading: false
    });
    firebase.firestore().collection('boards').doc(key).delete().then(() => {
      console.log("¡Elemento borrado correctamente!");
      this.setState({
        isLoading: false
      });
      navigation.navigate('Boards');
    }).catch((error) => {
      console.error("Error al borrar elemento: ", error);
      this.setState({
        isLoading: false
      });
    });
  }

  render() {
    if(this.state.isLoading){
      return(
        <View style={styles.activity}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      )
    }
    return (
      <ScrollView style={styles.container}>
        <Card style={styles.container}>
          <View style={styles.subContainer}>
            <View>
              <Text h3>{this.state.board.title}</Text>
            </View>
            <View>
              <Text h5>{this.state.board.description}</Text>
            </View>
            <View>
              <Text h4>{this.state.board.author}</Text>
            </View>
          </View>
          <View style={styles.detailButton}>
            <Button
              large
              leftIcon={{name: 'edit'}}
              buttonStyle={{ padding: 0, backgroundColor: 'transparent', color:'black' }}
              title='Editar'
              onPress={() => {
                this.props.navigation.navigate('EditBoard', {
                  boardkey: `${JSON.stringify(this.state.key)}`,
                });
              }} />
          </View>
          <View style={styles.detailButton}>
            <Button
              large
              leftIcon={{name: 'delete'}}
              buttonStyle={{ padding: 0, backgroundColor: 'transparent', color:'black' }}
              title='Eliminar'
              onPress={() => this.deleteBoard(this.state.key)} />
          </View>
        </Card>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#E6E6FA'
  },
  subContainer: {
    flex: 1,
    paddingBottom: 20,
    borderBottomWidth: 2,
    borderBottomColor: '#CCCCCC'
  },
  activity: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center'
  },
  detailButton: {
    marginTop:20,
    backgroundColor: "pink",
    padding: 20,
    borderRadius: 5,
    fontSize: 20,
    color: 'black'
  }
})


export default BoardDetailScreen;