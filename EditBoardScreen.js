import React, { Component } from 'react';
import { StyleSheet, ScrollView, ActivityIndicator, View, TextInput } from 'react-native';
import { Button } from 'react-native-elements';
import firebase from '../firebasedb';

class EditBoardScreen extends Component {
 
  constructor() {
    super();
    this.ref = firebase.firestore().collection('boards');

    this.state = {
      key: '',
      isLoading: false,
      title: '',
      description: '',
      author: ''
    };
  }
  componentDidMount() {
    const { route, navigation } = this.props;
    const {boardkey } = route.params;
    
    console.log(boardkey)
    const ref = firebase.firestore().collection('boards').doc(JSON.parse(this.props.route.params.boardkey));
    ref.get().then((doc) => {
        if (doc.exists) {
        const board = doc.data();
        this.setState({
          key: doc.id,
          title: board.title,
          description: board.description,
          author: board.author,
          isLoading: false
        });      
      } else {
        console.log("¡No existe el elemento!");
      }
    });
  }
  
  updateTextInput = (text, field) => {
    const state = this.state
    state[field] = text;
    this.setState(state);
  }
  
  updateBoard() {
    this.setState({
      isLoading: false,
    });
    const { navigation } = this.props;
    // actualizar el elemento utilizando this.state.key
    const actualizar = firebase.firestore().collection('boards').doc(this.state.key);
    actualizar.set({
      title: this.state.title,
      description: this.state.description,
      author: this.state.author,
    }).then((docRef) => {
      this.setState({
        key: '',
        title: '',
        description: '',
        author: '',
        isLoading: false,
      });
      this.props.navigation.navigate('Boards');
    })
    .catch((error) => {
      console.error("Error editando elemento: ", error);
      this.setState({
        isLoading: false,
      });
    });
  }



  render() {
      if(this.state.isLoading){
        return(
          <View style={styles.activity}>
            <ActivityIndicator size="large" color="#0000ff"/>
          </View>
        )
      }
      return (
        <ScrollView style={styles.container}>
          <View style={styles.subContainer}>
            <TextInput
                placeholder={'Title'}
                value={this.state.title}
                onChangeText={(text) => this.updateTextInput(text, 'title')}
            />
          </View>
          <View style={styles.subContainer}>
            <TextInput
                multiline={true}
                numberOfLines={4}
                placeholder={'Description'}
                value={this.state.description}
                onChangeText={(text) => this.updateTextInput(text, 'description')}
            />
          </View>
          <View style={styles.subContainer}>
            <TextInput
                placeholder={'Author'}
                value={this.state.author}
                onChangeText={(text) => this.updateTextInput(text, 'author')}
            />
          </View>
          <View style={styles.button}>
            <Button
              large
              leftIcon={{name: 'update'}}
              buttonStyle={{ padding: 0, backgroundColor: 'transparent', color:'black' }}
              title='Editar'
              onPress={() => this.updateBoard()} />
          </View>
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
    marginBottom: 20,
    padding: 5,
    borderBottomWidth: 2,
    borderBottomColor: '#CCCCCC',
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
  button: {
    marginTop:20,
    backgroundColor: "pink",
    padding: 20,
    borderRadius: 5,
    fontSize: 20,
    color: 'black'
  },
})


export default EditBoardScreen;