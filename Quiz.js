/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useState,useEffect } from 'react';
import {SafeAreaView,StyleSheet,View,TouchableHighlight} from 'react-native';
import {Divider,RadioButton,FAB,Text } from 'react-native-paper';


let score = 0;
const questionsList = require('./questions.json');

const Quiz = ({navigation}) =>{        
    const [currentQuestionIndex,setCurrentQuestionIndex] = useState(0);
    const [answerIndex,setAnswerIndex] = useState('');
    const [buttonLabel,setButtonLabel] = useState('Next');
    const currentQuestion = questionsList[currentQuestionIndex];
    goNext = (navigation) => {                
        const currentQuestion = questionsList[currentQuestionIndex];        
        if(answerIndex === currentQuestion.correctAnswerOption){
            score++;            
        }        
        if(buttonLabel === 'End'){                    
            navigation.navigate('Home',{'currentScore':score});
        }else{            
            if(currentQuestionIndex == questionsList.length -2){
                setButtonLabel('End');                
            }            
            setAnswerIndex('');
            setCurrentQuestionIndex(currentQuestionIndex+1);
        }                
    }

    React.useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
          score = 0;
        });
    
        // Return the function to unsubscribe from the event so it gets removed on unmount
        return unsubscribe;
      }, [navigation]);

    return(
        <>        
        <View style={styles.container}>
        <Text style={styles.questionTextStyle}>{"\n"}{currentQuestion.questionText}{"\n"}</Text>
        <Divider/>
        <Text>{"\n"}</Text>
        <RadioButton.Group onValueChange={(value) => setAnswerIndex(value)}  value={answerIndex}>
            {currentQuestion.options.map((value,index)=>{                
                return <RadioButton.Item style={styles.questionTextStyle} key={index} label={value.answerText} value={value.index} />
            })}
        </RadioButton.Group>        
        </View>        
        <TouchableHighlight style={{height:100}} onPress={() =>{ goNext(navigation)}} underlayColor="white">
          <View style={styles.button}>
            <Text style={styles.buttonText}>{buttonLabel}</Text>
          </View>
        </TouchableHighlight>
        </>
    );

}
const styles = StyleSheet.create({
    questionTextStyle:{
        fontSize:25,
        fontWeight:"bold"
    },
    scoreText:{
      fontSize:30,
      fontWeight:"bold"
    },
    appBar:{
      backgroundColor: '#2196F3'
    },
    container: {    
      padding: 20,     
    },
    button: {    
      alignItems: 'center',
      backgroundColor: '#2196F3',   
    },
    buttonText: {
      textAlign: 'center',
      padding: 20,    
      fontSize:40,
      color: 'white',
      fontWeight:"bold"
    }
  });
export default Quiz;