import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {NavigationContainer} from '@react-navigation/native'
import {createStackNavigator} from '@react-navigation/stack'
import { ListaUsuarios } from './telas/ListaUsuarios';
import { CriarUsuario } from './telas/CriarUsuario';
import { DetalheUsuario } from './telas/DetalheUsuario';

export default function App() {

  const Stack = createStackNavigator()

  function MyStack(){
    return(
      <Stack.Navigator>
           <Stack.Screen  name="ListaUsuarios" component={ListaUsuarios} options={{title:'Lista de Usuários'}}/>
         <Stack.Screen  name="CriarUsuario" component={CriarUsuario} options={{title:'Criar novo Usuário'}}/>
        <Stack.Screen  name="DetalheUsuario" component={DetalheUsuario} options={{title:'Informações do Usuário'}}/>
      </Stack.Navigator>
    )
  }
  return (
    <NavigationContainer>
      <MyStack/>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
