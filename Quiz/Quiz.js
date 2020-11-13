/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useState,useEffect } from 'react';
import {View,TouchableHighlight} from 'react-native';
import {styles} from './Styles';
import {Divider,RadioButton,FAB,Text } from 'react-native-paper';


let score = 0;
const questionsList = require('../assets/questions.json');

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


    //reset the score each time the screen is in focus
    useEffect(() => { 
      score= 0;
    },[navigation]);

    return(
        <>        
        <View style={styles.container}>
        <Text style={styles.questionTextStyle}>{"\n"}{currentQuestion.questionText}{"\n"}</Text>
        <Divider/>
        <Text>{"\n"}</Text>
        <RadioButton.Group onValueChange={(value) => setAnswerIndex(value)}  value={answerIndex}>
            {currentQuestion.options.map((value,index)=>{                
                return <RadioButton.Item key={index} label={value.answerText} value={value.index} />
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
export default Quiz;