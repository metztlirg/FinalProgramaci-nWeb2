
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { YellowBox } from 'react-native';
import _ from 'lodash';
//import EditBoardScreen from './components/EditBoardScreenRxdb';
import {decode, encode} from 'base-64';
import libro from './libro.png'; 

import BoardScreen from './components/BoardScreen';
import BoardDetailScreen from './components/BoardDetailScreen';
import AddBoardScreen from './components/AddBoardScreen';
import EditBoardScreen from './components/EditBoardScreen';
import {Button } from 'react-native-elements';


// este código es por un bug que tiene la librería para conectarse a firestore
if (!global.btoa) {  global.btoa = encode }
if (!global.atob) { global.atob = decode }

// este código es para eliminar una advertencia que aparece en la aplicación
YellowBox.ignoreWarnings(['Setting a timer']);
const _console = _.clone(console);
console.warn = message => {
  if (message.indexOf('Setting a timer') <= -1) {
    _console.warn(message);
  }
}; 

const Stack = createStackNavigator();

function uno({ navigation }){
  return (
    <View style={styles.container}>
      <Text style={styles.instructions}>
        ¡Bienvenido!
        </Text>
        <Image source={libro} />
            <TouchableOpacity  style={styles.button} onPress={() => 
              navigation.navigate('Boards')}>  
            <Text style={styles.buttonText}>Siguiente</Text>
            </TouchableOpacity> 
    </View>
   
);
}
export default function App() { 
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Inicio">
        <Stack.Screen name="Inicio" component={uno} />
        <Stack.Screen name="Boards" component={BoardScreen} options={({ navigation }) => ({ 
                          title: 'Boards', 
                          headerRight: () => (
                            <Button
                              buttonStyle={{ padding: 0, backgroundColor: 'transparent' }}
                              icon={{ name: 'add-circle', style: { marginRight: 0, fontSize: 28 } }}
                              onPress={() => { navigation.push('AddBoard') }}
                            />
                          ),
                          })}/>
        <Stack.Screen name="BoardDetails" component={BoardDetailScreen} 
          options={{ title: 'Board Details' }}/>
        <Stack.Screen name="AddBoard" component={AddBoardScreen} 
          options={{ title: 'Add Board' }}/>
        <Stack.Screen name="EditBoard" component={EditBoardScreen} 
          options={{ title: 'Edit Board' }}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#E6E6FA'
  },
  logo: {
    width: 305,
    height: 159,
    marginBottom: 50,
  },
  instructions: {
    color: 'black',
    fontSize: 28,
    marginHorizontal: 15,
    marginBottom: 20,
  },
  button: {
    marginTop:20,
    backgroundColor: "pink",
    padding: 20,
    borderRadius: 5,
    fontSize: 20,
    color: '#fff'
  },
});
