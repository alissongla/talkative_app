import React, {useState, useEffect}  from 'react';
import { TouchableWithoutFeedback } from 'react-native';
import Logo from '../images/Talk_Logo.png'
import Microphone from '../images/microphone.png'
import Tts from 'react-native-tts';
import {
  Container,
  AlternativaButton,
  AlternativaText,
  HeaderIndicator,
  TalkHeader,
  TalkHeaderText,
  LogoHeader,
  TalkTextView,
  TextTitle,
  AlternativaContainer,
  SpeakButton,
  SpeakIcon,
  Text
} from '../pages/exercises/styles';

function Question({aula, exercicio, enunciado, alternativaPress, lingua, listenPress, navigation}) {
  const [enun, setEnun] = useState([]);
  const[resp, setResp] = useState('');
  var buttons = '';
  const [alternativas, setAlternativas] = useState([]);
    useEffect(() => {
      const enunciadoArray = enunciado.split(';').map(tech => tech.trim())
      setEnun(enunciadoArray.shift());
      setAlternativas(enunciadoArray);
    },[])

    if(alternativas != ''){
      buttons = (
        alternativas.map(alternativa => 
          <AlternativaButton key={alternativa} onPress={() => alternativaPress(alternativa)}>
            <AlternativaText>{alternativa}</AlternativaText>
          </AlternativaButton>)
        )
    }else{
      buttons = (
        <SpeakButton onPress={() => listenPress()}> 
          <SpeakIcon source={Microphone}></SpeakIcon>
        </SpeakButton>
      )
    }

    return (
      <Container>
          <TalkHeader>
            <TalkHeaderText>
              <HeaderIndicator>Aula: {aula}</HeaderIndicator>
              <HeaderIndicator>Exercicio: {exercicio}</HeaderIndicator>
            </TalkHeaderText>
            <LogoHeader source={Logo}></LogoHeader>
          </TalkHeader>
          <TalkTextView>
            <TextTitle>{enun}</TextTitle>
            <AlternativaContainer>
              {buttons}
            </AlternativaContainer>
          </TalkTextView>
        </Container>
    );
}

export default Question
