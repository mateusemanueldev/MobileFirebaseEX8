import React, {useState} from 'react'
import { Button, TextInput, ScrollView, StyleSheet, View} from 'react-native';
import firebase from '../database/firebase';

export const CriarUsuario = (props) => {
    const[state, setState] = useState({
        nome: "",
        email:"",
        telefone:""
    })

    const CriarUsuario = async() =>{
        if (state.nome === ''){
            alert('Preencha o nome');
        }else{
            // await firebase.db.collection('users').add({
            //     nome: state.nome,
            //     email: state.email,
            //     telefone: state.telefone
            // })
            // alert('Usuário adicionado com sucesso :)');
            // props.navigation.navigate('ListaUsuarios');
            try{
            await firebase.db.collection('users').add({
                 nome: state.nome,
                 email: state.email,
                 telefone: state.telefone
             })
             alert('Usuário adicionado com sucesso :)');
             props.navigation.navigate('ListaUsuarios');
            }catch (error){
                 console.log(error);
            }
        }
    }

    return (
        <ScrollView style={styles.container}>
            <View style={styles.ImputGroup}>
                <TextInput placeholder="Nome" onChangeText={(inputNome)=> setState({...state,nome:inputNome})}/>
            </View>
            <View style={styles.ImputGroup}>
                <TextInput placeholder="E-mail" onChangeText={(inputEmail)=> setState({...state,email:inputEmail})}/>
            </View>
            <View style={styles.ImputGroup}>
                <TextInput placeholder="Telefone" onChangeText={(inputTel)=> setState({...state,telefone:inputTel})}/>
            </View>
            <View>
                <Button title="Adicionar" onPress={()=> CriarUsuario()}></Button>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        padding:35,
    },
    ImputGroup:{
        flex:1,
        padding:0,
        marginBottom:15,
        borderBottomWidth:1,
        borderBottomColor:'#cccccc'
    }
})
    

