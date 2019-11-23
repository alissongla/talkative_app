import React, {useState, useEffect}  from 'react';
import { TouchableWithoutFeedback } from 'react-native';
import Logo from '../images/Talk_Logo.png'
import Tts from 'react-native-tts';
import AsyncStorage from '@react-native-community/async-storage';
import api from '../services/api';
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
} from '../pages/lessons/styles';

function Lesson({aula, aulaTitulo, handleExercises, textDescription, modCod, navigation}) {
  const [error,setError] = useState('');
    return (
      <Container>
        <TalkHeader>
          <TalkHeaderText>
            <HeaderIndicator>Modulo: {modCod}</HeaderIndicator>
            <HeaderIndicator>Aula: {aula}</HeaderIndicator>
          </TalkHeaderText>
          <LogoHeader source={Logo}></LogoHeader>
        </TalkHeader>
        <TalkTextView>
          <TextTitle>{aulaTitulo}</TextTitle>
          <TextLesson>{textDescription}</TextLesson>
        </TalkTextView>
        <Button onPress={handleExercises}>
          <ButtonText>Próxima atividade</ButtonText>
        </Button>
        </Container>
    );
}

export default Lesson
