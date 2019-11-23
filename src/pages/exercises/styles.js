import styled from 'styled-components';

const Container = styled.View`
  flex: 1;
  
  backgroundColor: #F5F5F5;
`;

const AlternativaContainer = styled.View`
flex: 1;  
flexDirection: row;
justifyContent: flex-start;
  marginTop: 10%;
  marginLeft: 5%;
  height: 100%;
  width: 100%;
  flexWrap: wrap;
  backgroundColor: #F5F5F5;
`;
const AlternativaButton = styled.TouchableOpacity`
  height: 45%;
  width: 45%;  
  padding: 20px;
  borderRadius: 5px;
  backgroundColor: #000;
  alignSelf: stretch;
  margin: 5px;
`;

const AlternativaText = styled.Text`
  color: #FFF;
  fontWeight: bold;
  fontSize: 16px;
  textAlign: center;
  justifyContent: center;
`;

const SpeakButton = styled.TouchableOpacity`
  height: 95%;
  width: 95%;  
  padding: 20px;
  borderRadius: 5px;
  backgroundColor: #F5F5F5;
  alignSelf: stretch;
  margin: 5px;
`;

const SpeakIcon = styled.Image`
  height: 90%;
  width: 90%;
  resizeMode: contain;

  
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
  marginTop: -45%;
  padding: 3%;
`;

const TextLesson = styled.Text`
  color: #000;
  fontSize: 16px;
  textAlign: center;
`;

export { Container, AlternativaContainer, AlternativaButton, AlternativaText,SpeakButton, SpeakIcon, HeaderIndicator, TalkHeader, TalkHeaderText, LogoHeader, TalkTextView , TextTitle, TextLesson};