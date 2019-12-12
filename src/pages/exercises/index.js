import React, {useState, useEffect} from 'react';

import { View } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import Tts from 'react-native-tts';
import Voice from 'react-native-voice';

import api from '../../services/api';

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
import Question from '../../components/Question';
import { tsStringKeyword } from '@babel/types';


var count = 0;
export default function Exercise ({props, navigation}){
  const[error, setError] = useState('');
  const[exercises, setExercises] = useState();
  const[class_cod, setClass_cod] = useState('');
  const[enunciado, setEnunciado] = useState('');
  const[exeCod, setExeCod] = useState('');
  const[lingua, setLingua] = useState('');
  const[question, setQuestion] = useState(0);
  const[resp, setResp] = useState('');
  const[listen, setListen] = useState([]);
  const[results, setResults] = useState([]);
  var respostas = [];
  //Voice.onSpeechStart = onSpeechStart(this);

  Voice.onSpeechResults = e => {
    // eslint-disable-next-line
    setResults([]);
    setResults(e.value)
    respostas = e.value
    
    const respostaCerta = exercises[question].EXE_RESPOSTA.toLowerCase();
    var correto = 0;
    for(var i = 0; i < respostas.length; i++){
      if(respostas[i] == respostaCerta){
        Tts.speak('Correct', 
        { androidParams: { KEY_PARAM_PAN: -1, KEY_PARAM_VOLUME: 0.3, KEY_PARAM_STREAM: 'STREAM_MUSIC' } })
        setQuestion(question + 1);
        correto = 1;
        break;
      }
    }
      if(correto == 0){
        Tts.speak(`Incorrect, the answer correct is ${respostaCerta}`, { androidParams: { KEY_PARAM_PAN: -1, KEY_PARAM_VOLUME: 0.3, KEY_PARAM_STREAM: 'STREAM_MUSIC' } })
      }
  };
  async function alterParams() {
    try {
      
      if(exercises !== undefined){
        const classNumber = await AsyncStorage.getItem('talkative_classNumber');
        const classLength = await AsyncStorage.getItem('talkative_classLength');
        const countClass = await AsyncStorage.getItem('talkative_count');
        if(question < exercises.length){
          count = parseInt(countClass)+1;
          setClass_cod(exercises[question].AUL_CODIGO)
          setEnunciado(exercises[question].EXE_ENUNCIADO)
          setExeCod(exercises[question].EXE_CODIGO)
          setLingua(exercises[question].EXE_LINGUA)
        }else{
          if(classNumber > classLength){
            navigation.navigate('Main')
          }else{
            await AsyncStorage.setItem('talkative_count', count.toString());
            navigation.navigate('Lessons')
          }

        }
      }
    }catch(_err){
      setError('Houve um problema ao carregar o exercício!');
    }
  }

  async function loadExercises() {
    try{
      const codClass = await AsyncStorage.getItem('talkative_class')
      const userToken = await AsyncStorage.getItem('talkative_token')
      const exerciseResponse = await api.get(`/exercise/${codClass}`, {
      headers: {
        'Authorization': 'Bearer ' + userToken
      }
    });
    
    if(exercises != exerciseResponse.data)
      await setExercises(exerciseResponse.data)
    }catch(_err){
      setError('Houve um problema ao carregar o exercício!');
    }
    setTimeout(() => {alterParams()},1000)
  }

  useEffect(() => {
    if(enunciado != undefined){
      setTimeout(() => {
        Tts.stop();
        const enunciadoArray = enunciado.split(';').map(tech => tech.trim())
      const pergunta = enunciadoArray.shift()
        if(lingua == 'I'){
          Tts.setDefaultLanguage('en-US');
          Tts.setDefaultRate(0.4);
        }else{
          Tts.setDefaultLanguage('pt-BR');
          Tts.setDefaultRate(0.5);
        }
        Tts.speak(pergunta.toString())
      },1000)
    }
  }, [enunciado])

  useEffect(() => {
    async function load(){
      await loadExercises();
    }
    load();
  },[exercises])


  useEffect(() => {
    async function setParams() {
      try {
        const classNumber = await AsyncStorage.getItem('talkative_classNumber');
        const classLength = await AsyncStorage.getItem('talkative_classLength');
        

          if(exercises !== undefined){
            
            setClass_cod(exercises[question].AUL_CODIGO)
            setEnunciado(exercises[question].EXE_ENUNCIADO)
            setExeCod(exercises[question].EXE_CODIGO)
            setLingua(exercises[question].EXE_LINGUA)

            if(exercises[question] == ''){
              if(classNumber == classLength){
                navigation.navigate('Main')
              }else{
                await AsyncStorage.setItem('talkative_count', count.toString());
                navigation.navigate('Lessons')
              }
            }
          }
      }catch(_err){
        setError('Houve um problema ao carregar o exercício!');
      }
    }
    setParams()
  },[exercises])

  // useEffect(() => {
  //   setTimeout(() => {alterParams()},500)
  // },[question])

  async function handleExerciseAnswer(resposta){
    Tts.stop();
    Tts.setDefaultLanguage('en-US');
    const respostaDada = resposta.toLowerCase();
    const respostaCerta = exercises[question].EXE_RESPOSTA.toLowerCase();
    const soLetra = respostaDada.substr(0, 1)
    if( (respostaDada == respostaCerta) || (soLetra == respostaCerta) ){
      Tts.speak('Correct')
      setQuestion(question + 1);
    }else{
      Tts.speak(`Incorrect, the answer correct is ${respostaCerta}`)
    }
  }

  

  async function handleExerciseListen(){
    _startRecognizing();
  }

  function _startRecognizing(){
    try {
      Voice.start('en-US', {
        "RECOGNIZER_ENGINE": "GOOGLE"
      })
      setTimeout(() => {
        Voice.stop()
      }, 3000);
    } catch (e) {
      //eslint-disable-next-line
      console.error(e);
    }
  };

  

  return (
    <Container>
        <Question 
          key={exeCod}
          exercicio={question+1} 
          aula={class_cod+1}
          enunciado={enunciado}
          lingua={lingua}
          alternativaPress={handleExerciseAnswer}
          listenPress={handleExerciseListen}
        />
    </Container>  
  )
}