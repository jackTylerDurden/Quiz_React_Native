/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState,useEffect} from 'react'; 
import {SafeAreaView,ScrollView,View,TouchableHighlight} from 'react-native';
import {styles} from './Styles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TextInput,Appbar,Divider,Button,Text,} from 'react-native-paper';
import {useIsFocused} from '@react-navigation/native';


const RNFS = require('react-native-fs');
const path = RNFS.DocumentDirectoryPath + '/score.txt';
const Home = ({route, navigation}) =>{    
  const [score,setScore] = useState(0);  
  const [firstName,setFirstName] = useState('');
  const [lastName,setLastName] = useState('');
  const [nickName,setNickName] = useState('');
  const [age,setAge] = useState('');
  // const { currentScore } = route.params;
  goToQuiz = (navigation) => {
    navigation.navigate('Quiz')
  }

  saveDataToStorage = (key,value) => {
    console.log('key--->>>',key);
    console.log('value--->>>',value);
    try{
      AsyncStorage.setItem(key,value).then(() =>{
        console.log('data stored')
      });
    }catch(error){
      console.log('error------->>>',error)
    }
  }

  getUserInfo = () => {
    try{
      AsyncStorage.getItem('userDetails',(error,result)=>{
        console.log('result----->>>',result);
        let userInfo = JSON.parse(result);
        setFirstName(userInfo.firstName);
        setLastName(userInfo.lastName);
        setNickName(userInfo.nickName);
        setAge(userInfo.age);
      });    
      
    }catch(error){
      console.log('error------->>>',error)
    }
  }

  writeScoreToFile = (scoreVal) => {    
    RNFS.writeFile(path, scoreVal+'', 'utf8').then((success) => {
      console.log('FILE WRITTEN!');
    }).catch((err) => {
      console.log(err.message);
    });
  }

  getScore = () =>{ 
    RNFS.exists(path).then((result)=>{
      if(result){
        RNFS.readFile(path,'utf8').then(result=>{
          setScore(result);
        });    
      }      
    });           
  }
  
  const isFocused = useIsFocused();
  
  
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      if(isFocused){
        console.log('route---->>>',route);
        if(route.params){ //save userinfo and score 
          console.log('route.params.currentScore---->>>',route.params.currentScore);
          let userInfo = {};
          userInfo.firstName = firstName;
          userInfo.lastName = lastName;
          userInfo.nickName = nickName;
          userInfo.age = age;
          const userInfoJSON = JSON.stringify(userInfo);
          console.log('userInfoJSON ---->>>',userInfoJSON);
          setScore(route.params.currentScore);
          saveDataToStorage('userDetails',userInfoJSON);
          writeScoreToFile(route.params.currentScore)
        }else{ //fetch  the score from file and userinfo from asyncstorage
          getUserInfo();
          getScore();
        }
      }     
    });    
    return unsubscribe;
  }, [isFocused]);

  
  return(
    <>
      <SafeAreaView>
        <ScrollView contentInsetAdjustmentBehavior="automatic"> 
          <Appbar.Header style={styles.appBar}>
              <Appbar.Content title="Please Enter Your Details" />          
          </Appbar.Header>
          <View style={styles.container}>            
            <Divider />
            <Text>{"\n"}</Text>
            <TextInput value={firstName ? firstName : ''} textContentType="givenName" onChangeText={(text) =>{ setFirstName(text)}}  mode="outlined" label="First Name"/>
            <Text>{"\n"}</Text>
            <TextInput value={lastName ? lastName : ''}  textContentType="familyName" onChangeText={(text) =>{ setLastName(text)}} mode="outlined" label="Family Name"/>        
            <Text>{"\n"}</Text>
            <TextInput value={lastName ? nickName : ''} textContentType="nickname" onChangeText={(text) =>{ setNickName(text)}} mode="outlined" label="Nickname"/>        
            <Text>{"\n"}</Text>
            <TextInput value={lastName ? age : '0'} onChangeText={(text) =>{ setAge(text)}}  keyboardType='numeric' mode="outlined" label="Age"/>                        
            <Text>{"\n"}</Text>            
            <Text style={styles.scoreText}>Current Score : {score ? score : 0}</Text>
            <Text>{"\n"}</Text>                      
          </View>          
           <TouchableHighlight style={{height:100}} onPress={() =>{ goToQuiz(navigation)}} underlayColor="white">
          <View style={styles.button}>
            <Text style={styles.buttonText}>Take The Quiz</Text>
          </View>
        </TouchableHighlight>
        </ScrollView>
      </SafeAreaView> 
    </>
  );
}
export default Home;
