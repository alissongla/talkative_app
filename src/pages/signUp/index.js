import React, {useState} from 'react';
import PropTypes from 'prop-types';

import { StatusBar, ActivityIndicator } from 'react-native';

import api from '../../services/api';


import {
  Container,
  Logo,
  SuccessMessage,
  Input,
  ErrorMessage,
  Button,
  ButtonText,
  SignInLink,
  SignInLinkText,
} from './styles';

export default function SignUp ({navigation}) {
  const navigationOptions = {
    header: null,
  };

  const propTypes = {
    navigation: PropTypes.shape({
      navigate: PropTypes.func,
      dispatch: PropTypes.func,
      goBack: PropTypes.func,
    }).isRequired,
  };

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleBackToLoginPress () {
    await navigation.navigate('SignIn');
  };

  async function handleSignUpPress () {
    setLoading(true);
    if (email.length === 0 || password.length === 0) {
      setLoading(false);
      setError('Preencha todos os campos para continuar!');
    } else {
      try {
        await api.post('/users', {
          username,
          email,
          password,
        });
        setSuccess('Conta criada com sucesso! Redirecionando para o login');

        setTimeout(goToLogin, 2500);
      } catch (_err) {
        setLoading(false);
        setError('Houve um problema com o cadastro, verifique os dados preenchidos!');
      }
    }
  };

  function goToLogin () {
    setLoading(false);
    navigation.navigate('SignIn');
  }
    return (
      <Container>
        <StatusBar hidden />
        <Logo source={require('../../images/Talk_Logo.png')} resizeMode="contain" />
        {success.length !== 0 && <SuccessMessage>{success}</SuccessMessage>}
        <Input
          placeholder="Nome de usuário"
          value={username}
          onChangeText={setUsername}
          autoCapitalize="none"
          autoCorrect={false}
        />
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
        <ActivityIndicator 
        animating = {loading}
        size="large" 
        color="#0000ff"/>
        <Button onPress={handleSignUpPress}>
          <ButtonText>Criar conta</ButtonText>
        </Button>
        <SignInLink onPress={handleBackToLoginPress}>
          <SignInLinkText>Voltar ao login</SignInLinkText>
        </SignInLink>
      </Container>
    ); 
}