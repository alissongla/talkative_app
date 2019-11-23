import styled from 'styled-components';

const Container = styled.View`
  flex: 1;
  
  backgroundColor: #F5F5F5;
`;

const Button = styled.TouchableOpacity`
  padding: 20px;
  borderRadius: 5px;
  backgroundColor: #61C3F0;
  alignSelf: stretch;
  margin: 15px;
  marginHorizontal: 20px;
`;

const ButtonText = styled.Text`
  color: #FFF;
  fontWeight: bold;
  fontSize: 16px;
  textAlign: center;
  height: 40%;
`;

const TalkHeader = styled.View`
  flex: 1;
  justifyContent: flex-start;
  backgroundColor: #F5F5F5;
  height: 5%;
  flexDirection: row;
  flexWrap: wrap;
`;

const TalkHeaderText = styled.View`
flex: 1;
justifyContent: flex-start;
backgroundColor: #F5F5F5;
height: 15%;
flexDirection: column;
`;

const HeaderIndicator = styled.Text`
  color: #000;
  fontWeight: bold;
  fontSize: 16px;
  textAlign: left;
  alignItems: flex-start;
`;

const LogoHeader = styled.Image`
  height: 25%;
  width: 10%;
  marginTop: 5px;
  marginRight: 10px;
  alignItems: flex-end;
`;

const TalkTextView = styled.View`
  flex: 1;
  justifyContent: center;
  alignItems: center;
  justifyContent: flex-start;
  backgroundColor: #F5F5F5;
  height: 45%;
`;

const TextTitle = styled.Text`
  color: #000;
  fontWeight: bold;
  fontSize: 18px;
  textAlign: center;
  marginTop: -25%
`;

const TextLesson = styled.Text`
  color: #000;
  fontSize: 16px;
  textAlign: center;
`;

export { Container, Button, ButtonText, HeaderIndicator, TalkHeader, TalkHeaderText, LogoHeader, TalkTextView , TextTitle, TextLesson};