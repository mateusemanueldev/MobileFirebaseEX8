import React, {useEffect, useState} from 'react'
import { Alert } from 'react-native';
import { ActivityIndicator } from 'react-native';
import {View, StyleSheet, TextInput, ScrollView, Button} from 'react-native';
import firebase from '../database/firebase';

export const DetalheUsuario = (props) => {
    const initialState = {
        id: '',
        nome: '',
        email:'',
        telefone:'',
    }
    const [user, setUser] = useState(initialState);
    const [loading, setLoading] = useState(true)

    const getUserById = async (id) =>{
        const dbRef = firebase.db.collection('users').doc(id);
        const doc = await dbRef.get();
        const user = doc.data();
        setUser({
            ...user,
            id: doc.id,
        });
        setLoading(false);
    };

    useEffect(()=> {
        getUserById(props.route.params.userId);
    }, []);

    const handleChangeText = (name, value) => {
        console.log(name, value)
        setUser({...user, [name]: value});
    }

    const atualizarUsuario = async()=>{
        const dbRef = firebase.db.collection('users').doc(user.id);
        await dbRef.set({
            nome: user.nome,
            email: user.email,
            telefone: user.telefone
        })
        setUser(initialState)
        props.navigation.navigate('ListaUsuarios');
    }


    const deletarUsuario = async () =>{
        const dbRef = firebase.db.collection('users').doc(props.route.params.userId);
        await dbRef.delete();
        props.navigation.navigate('ListaUsuarios');

    }
    const confirmarExclusao = () =>{
        Alert.alert('Remover usuário', 'Tem certeza que deseja remover?', 
        [{text: 'Sim', onPress: () => deletarUsuario()},
         {text: 'Não', onPress: () => console.log(false)}
        ])
    }

    if(loading){
        return (
            <View>
                <ActivityIndicator size="large"/>
            </View>
        )
    }


    return (
        <ScrollView style={styles.container}>
            <View style={styles.ImputGroup}>
                <TextInput 
                placeholder="Nome"
                value={user.nome}
                onChangeText={(value)=> handleChangeText("nome",value)}/>
            </View>
            <View style={styles.ImputGroup}>
                <TextInput 
                placeholder="E-mail"
                value={user.email}
                onChangeText={(value)=> handleChangeText("email",value)}/>
            </View>
            <View style={styles.ImputGroup}>
                <TextInput 
                placeholder="Telefone"
                value={user.telefone}
                onChangeText={(value)=> handleChangeText("telefone",value)}/>
            </View>
            <View>
                <Button color="#19ac52" title="Atualizar Usuário" onPress={()=> atualizarUsuario()}></Button>
            </View>
            <View>
                <Button color="#e40000" title="Remover Usuário" 
                onPress={()=> confirmarExclusao()}></Button>
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
