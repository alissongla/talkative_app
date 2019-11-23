import React, {useState, useEffect} from 'react';

import { ScrollView } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import Tts from 'react-native-tts';

import api from '../../services/api';

import Logo from '../../images/Talk_Logo.png';

import {
  Container,
  Button,
  ButtonText,
  HeaderIndicator,
  TalkHeader,
  TalkHeaderText,
  LogoHeader,
  TalkTextView,
  TextTitle,
  TextLesson
} from './styles';
import DoubleTap from '../../components/DoubleTap';

export default function Main ({navigation}){
  const[modules, setModules] = useState([]);


  useEffect(() => {
    async function resetUserData(){
      await AsyncStorage.setItem('talkative_module','0');
      await AsyncStorage.setItem('talkative_count', '0');
      const userToken = await AsyncStorage.getItem('talkative_token')
        await api.put(`/users`, {
          MOD_CODIGO: null,
          AUL_CODIGO: null,
        },
        {
          headers: {
            'Authorization': 'Bearer ' + userToken
          }
        });
    }
    resetUserData()
  })

  useEffect(() => {
    async function getModules(){
      await AsyncStorage.setItem('talkative_count', '0');
      const userToken = await AsyncStorage.getItem('talkative_token')
      const moduleResponse = await api.get(`/module`, {
        headers: {
          'Authorization': 'Bearer ' + userToken
        }
      });
      setModules(moduleResponse.data)   
    }
    getModules()
  },[])

  async function handleModuleClick(resposta){
    const userToken = await AsyncStorage.getItem('talkative_token')
    await AsyncStorage.setItem('talkative_module', resposta.toString());
    await api.put(`/users`, {
      MOD_CODIGO: parseInt(resposta),
    },
    {headers: {
        'Authorization': 'Bearer ' + userToken
      }
    }
    );
    navigation.navigate('Lessons')
  }

  
  return (
        <Container>
          <TalkHeader>
            <HeaderIndicator>Módulos</HeaderIndicator>
          </TalkHeader>
          <ScrollView>
          {modules.map(module => 
            <Button key={module.MOD_CODIGO} onPress={() => handleModuleClick(module.MOD_CODIGO)}>
              <ButtonText>{module.MOD_NOME}</ButtonText>
            </Button>
            )}
          </ScrollView>
        </Container>
  )
}