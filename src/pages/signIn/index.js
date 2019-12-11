import React, { useState, useEffect } from 'react';

import { StatusBar } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

import api from '../../services/api';

import {
  Container,
  Logo,
  Input,
  ErrorMessage,
  Button,
  ButtonText,
  SignUpLink,
  SignUpLinkText,
} from './styles';

export default function SignIn ({navigation}){
  const navigationOptions = {
    header: null,
  };

  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const [error,setError] = useState('');

  useEffect(()=>{
      async function loadUser(){
        const token = await AsyncStorage.getItem('talkative_token')
        await AsyncStorage.getItem('talkative_module').then(lesson => {
            if (token !== null && lesson == 0){
              navigation.navigate('Main');
            }else if(token !== null && lesson != 0){
              navigation.navigate('Lessons');
            }
          })
      }
      loadUser()
    },[]);
  
  function handleCreateAccountPress () {
    navigation.navigate('SignUp');
  };

  async function handleSignInPress () {
    await loadInputs()
    const userToken = await AsyncStorage.getItem('talkative_token')
    try {
      const userResponse = await api.get('/users', {
        headers: {
          'Authorization': 'Bearer ' + userToken
        }
      });
      const codClass = (userResponse.data.AUL_CODIGO == null ? '0' : userResponse.data.AUL_CODIGO )
      const codMod = (userResponse.data.MOD_CODIGO == null ? '0' : userResponse.data.MOD_CODIGO )
      await AsyncStorage.setItem('talkative_class', toString(codClass));
      await AsyncStorage.setItem('talkative_module', toString(codMod));
      if(codMod == '0'){
        navigation.navigate('Main');
      }else{
        navigation.navigate('Lessons');
      }
      navigation.navigate('Main');
    } catch (_err) {
      setError('Houve um problema com o login, verifique suas credenciais!');
    }
  };

  async function loadInputs() {
    if (email.length === 0 || password.length === 0) {
      setError('Preencha usuário e senha para continuar!');
    } else {
      try {
        const response = await api.post('/sessions', {
          email,
          password
        });
        
        await AsyncStorage.setItem('talkative_token', response.data.token);
      } catch (_err) {
        setError('Houve um problema com o login, verifique suas credenciais!');
      }
    }
  }

    return (
      <Container>
        <StatusBar hidden />
        <Logo source={require('../../images/Talk_Logo.png')} resizeMode="contain" />
        <Input
          placeholder="Endereço de e-mail"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          autoCorrect={false}
        />
        <Input
          placeholder="Senha"
          value={password}
          onChangeText={setPassword}
          autoCapitalize="none"
          autoCorrect={false}
          secureTextEntry
        />
        {error.length !== 0 && <ErrorMessage>{error}</ErrorMessage>}
        <Button onPress={handleSignInPress}>
          <ButtonText>Entrar</ButtonText>
        </Button>
        <SignUpLink onPress={handleCreateAccountPress}>
          <SignUpLinkText>Criar conta grátis</SignUpLinkText>
        </SignUpLink>
      </Container>
    );
  }