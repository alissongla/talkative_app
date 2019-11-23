import React, {useState, useEffect} from 'react';

import { View } from 'react-native';
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
import Lesson from '../../components/Lesson';

export default function Lessons ({navigation}){
  const[lessons, setLessons] = useState();
  const[count, setCount] = useState(0);
  const[class_id, setClass_id] = useState('');
  const[module_id, setModule_id] = useState('');
  const[exercise_id, setExercise_id] = useState('');
  const[text_id, setText_id] = useState('');
  const[textDescription, setTextDescription] = useState('');
  const[classTitle, setClassTitle] = useState('');
  const [error,setError] = useState('');
  const[modCod, setModCod] = useState('');

  async function loadText() {
    const codModule = await AsyncStorage.getItem('talkative_module')
    setModCod(codModule);
    const userToken = await AsyncStorage.getItem('talkative_token')
    const id = text_id;
    const textResponse = await api.get(`/text/${id}`, {
      headers: {
        'Authorization': 'Bearer ' + userToken
      }
    })
    .then(response => setTextDescription(response.data.TXT_DESCRICAO));
  }

  async function getClassInfo(){
    try{
      const userToken = await AsyncStorage.getItem('talkative_token')
      const id = await AsyncStorage.getItem('talkative_module')
      
      const classResponse = await api.get(`/class/${parseInt(id)}`, {
        headers: {
          'Authorization': 'Bearer ' + userToken
        }
      });
      setLessons(classResponse.data)
    }catch(_err){
      setError('Houve um problema ao carregar a aula!');
    }
  }

  async function updateUser(){
    const userToken = await AsyncStorage.getItem('talkative_token')
    await api.put(`/users`, {
      AUL_CODIGO: class_id,
    },
    {
      headers: {
        'Authorization': 'Bearer ' + userToken
      }
    }
    );
  }

  async function setParams() {
    const countClass = await AsyncStorage.getItem('talkative_count');
    const aulaN = (countClass == undefined) ? '0' : countClass;

    try {
        if(lessons !== undefined){
          setClass_id(lessons[count].AUL_CODIGO)
          setClassTitle(lessons[count].AUL_NOME)
          setModule_id(lessons[count].MOD_CODIGO)
          setText_id(lessons[count].TXT_CODIGO) 
          await AsyncStorage.setItem('talkative_classLength', lessons.length.toString())
        }
        setCount(parseInt(aulaN))
        
    }catch(_err){
      setError('Houve um problema ao carregar o exercício!');
    }
  }

  async function alterParams() {
    try {
      if(lessons !== undefined){
        if(count < lessons.length){
          var aula = parseInt(count)+1;
          setClass_id(lessons[count].AUL_CODIGO)
          setClassTitle(lessons[count].AUL_NOME)
          setModule_id(lessons[count].MOD_CODIGO)
          setText_id(lessons[count].TXT_CODIGO)
          await AsyncStorage.setItem('talkative_classNumber', aula.toString());  
        }else{
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
          navigation.navigate('Main');
        }
      }
    }catch(_err){
      setError('Houve um problema ao carregar a aula!');
    }
  }

  useEffect(() => {
    if(textDescription != undefined){
      setTimeout(() => {
        Tts.setDefaultLanguage('en-US');
        Tts.setDefaultRate(0.5);
        Tts.speak(classTitle.toString());
        Tts.setDefaultRate(0.2);
        Tts.speak(textDescription.toString(), { androidParams: { KEY_PARAM_PAN: 0, } })
      },1000)
    }
    
  },[textDescription])

  useEffect(()=>{
    async function load(){
      await updateUser();
    }
    load();
  })

  useEffect(() => {
    async function load(){
      await getClassInfo()
      await loadText();
    }
    load();
  },[text_id])
  
useEffect(() =>{
  async function load(){
    await getClassInfo()
  }
  load();
},[])

useEffect(() => {
  async function load(){
    await setParams()
  }
  load();
},[lessons])

useEffect(() => {
  async function load(){
    await alterParams()
  }
  load();
},[count])

function handleRepeat(){
  readContent();
}

async function handleExercises(){
  await AsyncStorage.setItem('talkative_class', class_id.toString())
  const userToken = await AsyncStorage.getItem('talkative_token')
  const exercisesResponse = await api.get(`/exercise/${class_id}`, {
    headers: {
      'Authorization': 'Bearer ' + userToken
    }
  })
    
  if(exercisesResponse.data == ''){
      await _redirectLesson()
    }
    else{
      navigation.navigate('Exercise')
    }
}

async function _redirectLesson(){
  const countClass = await AsyncStorage.getItem('talkative_count');
  var c = parseInt(countClass)+1;
  await AsyncStorage.setItem('talkative_count', count.toString());
  setCount(c)
}
  return (
        <Container>
            <Lesson 
            key={class_id}
            aula={parseInt(count) + 1}
            aulaTitulo={classTitle} 
            textCod={text_id}
            handleExercises={handleExercises}
            textDescription={textDescription}
            modCod={modCod}
          />
        </Container>
  
  )
}