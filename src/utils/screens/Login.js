import React, {useState,useEffect} from 'react';
import {View, KeyboardAvoidingView, StyleSheet, Image, Animated, Platform} from 'react-native';
import { Item, Input, Button, Icon, Text } from 'native-base';

import globalLogin from "../classes/ClassGlobal.js"

async function sendRequestLogin(email,password){
  var myHeaders = new Headers();
  
  myHeaders.append("Content-Type", "application/json");
  
  var raw = JSON.stringify({"email":email,"password":password});
  
  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw
  };
  await fetch("http://172.20.10.3:3000/auth/login", requestOptions)
    .then(response => response.text())
    .then(
      result => {

        if(result.toString().includes("Incorrect")?false == true:JSON.parse(result).email == email){
          
          globalLogin.isLogInPhoto = JSON.parse(result).profilephoto;
          globalLogin.isLogInID = JSON.parse(result).idpeople;
          globalLogin.isLogInEmail = JSON.parse(result).email;
          globalLogin.isLogInName = JSON.parse(result).name;
          globalLogin.isLogInCategory = JSON.parse(result).namecategory;
          
        }
        else {
          globalLogin.isLogInID = 0;
          
        }
      }
    )
    .catch(error => console.log('error', error));
}

export default function login({ navigation }) {

  ////////***** LOGIN VARIABLES AND FUNCTION *****////////
  const [email,SetEmail] = useState('');
  const [password,SetPass] = useState('');

  ////////***** ANIMATIONS *****////////
  const [offset] = useState(new Animated.ValueXY({x:0,y:80}));
  const [opacity] = useState(new Animated.Value(0));
  
  useEffect(()=>{
    Animated.parallel([
      Animated.spring(offset.y,{
        toValue: 0,
        speed: 4,
        bounciness: 18,
        useNativeDriver: true,
      }),
      Animated.timing(opacity, {
        toValue: 1,
        duration: 400,
        useNativeDriver: true,
      })
    ]).start();

  },[]);

    return(
      <KeyboardAvoidingView behavior={Platform.OS==="ios"?"padding":""} style={styles.backgroundStyle}>
        {
          ////////***** LOGO VIEW BLOCK *****////////
        }
        <Animated.View style={[
                  styles.logoContainer,
                  {
                    opacity: opacity,
                    transform: [
                      {translateY: offset.y}
                    ]
                  }
                ]}>

          <Image source={require('../images/logoSbl.png')} />
          <Text style={{fontWeight:'bold',color:'white',fontSize:18,marginTop:10}}>We Delivery Dreams. </Text>

        </Animated.View>

        {
          ////////***** INPUT BODY VIEW BLOCK *****////////
        }

        <Animated.View
                style={[
                  styles.InputsStyle,
                  {
                    opacity: opacity,
                    transform: [
                      {translateY: offset.y}
                    ]
                  }
                ]}
        >

        <Item style={{marginTop:10}}>
          <Icon name='person-outline' style={{color: 'white'}}/>
          <Input style={{color: 'white'}} placeholder="Email" placeholderTextColor="white" 
          onChangeText={email => {SetEmail(email)}} value={email} autoCapitalize="none"/>
        </Item>

        <Item style={{marginTop:10,marginBottom:10}}>
          <Icon name='md-lock-closed-outline' style={{color: 'white'}}/>
          <Input style={{color: 'white'}} secureTextEntry={true} placeholder="Password" 
          placeholderTextColor="white" onChangeText={password => {SetPass(password)}} value={password}/>
        </Item>

        <Button style={{backgroundColor:'#48D1CC',width:300}} iconLeft onPress={() => {

          (sendRequestLogin(email,password)).finally(
            () =>{
              if( globalLogin.isLogInID != 0){
                navigation.navigate('Home');
                
              }else{
                alert("Incorrect Email or Password. Or connection failed.");
    
              }
            }
          );

          }}>
          <Icon name='md-enter-outline'/>
          <Text style={{fontWeight:'bold', marginRight: 100}}>Sign In</Text>
        </Button>
        <Text style={{color: '#48D1CC', marginTop: 5}}>Forgot? Cick Here!</Text>
        <Text style={{color: 'white',marginTop:10}}>All rights reserved - 2021</Text>

        </Animated.View>
      </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
  backgroundStyle:{
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#182834',
    flex:1
  },
  logoContainer:{
    flex:0.9,
    alignItems: 'center',
    marginTop: 70
  },
  InputsStyle:{
    flex:1.5,
    width:300,
    alignItems:'center'
  }
});