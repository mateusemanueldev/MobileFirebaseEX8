import React, { useState } from 'react'
import { useEffect } from 'react';
import { Text, View, Button } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import firebase from '../database/firebase';
import { ListItem, Avatar } from 'react-native-elements';
import { DetalheUsuario } from './DetalheUsuario';

export const ListaUsuarios = (props) => {

    const [users, setUsers] = useState([]);

    useEffect(() => {
        firebase.db.collection('users').onSnapshot(querySnapshot => {
            const users = [];

            querySnapshot.docs.forEach(doc => {
                const { nome, email, telefone } = doc.data()
                users.push({
                    id: doc.id,
                    nome,
                    email,
                    telefone
                })
            })
            setUsers(users)
        })
    }, [])
    return (
        <ScrollView>
            <Button title="Adicionar usuário" onPress={() => props.navigation.navigate('CriarUsuario')}></Button>
            {
                users.map(user => {
                    return (
                        <ListItem key={user.id} bottomDivider onPress={()=> {
                            props.navigation.navigate('DetalheUsuario' , {
                                userId: user.id
                            });
                        }}>
                            <ListItem.Chevron />
                            <Avatar source={{uri:'https://library.kissclipart.com/20180906/wtq/kissclipart-user-profile-clipart-user-profile-computer-icons-15b5c3086edf7512.png'}} rounded></Avatar> 
                            {/* <Avatar
                                size="small"
                                rounded
                                title="MT"
                                activeOpacity={0.7}
                            /> */}
                            <ListItem.Content>
                                <ListItem.Title>{user.nome}</ListItem.Title>
                                <ListItem.Subtitle>{user.email}</ListItem.Subtitle>
                            </ListItem.Content>
                        </ListItem>
                    )
                })
            }
        </ScrollView>
    )
}
