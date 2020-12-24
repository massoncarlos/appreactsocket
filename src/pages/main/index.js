/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useState, useEffect} from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  StatusBar,
  TextInput,
  Keyboard,
} from 'react-native';

import TcpSocket from 'react-native-tcp-socket';


import Colors from '../../styles/Colors';

const options = {port: 80, host: '192.168.4.1',timeout:0} 
//const options = {port: 80, host: '192.168.15.63',} 


const client = TcpSocket.createConnection(options, () => {
console.log('Connection opened!');

});
client.removeAllListeners();
client.setMaxListeners(0);



function Main() {
  const [temp , setTemp] = useState();
  const [resp , setResp] = useState(1);
  const [valorSet , setValorSet] = useState();
  const [valorSet2 , setValorSet2] = useState();

    useEffect(() => {
      const interval = setInterval(() => {
        console.log(resp);
        console.log("teste2");
        if (resp == 1){
            client.write("R1\n","ascii" );
            setResp(2);
            console.log(resp);
          };
      }, 3000);

      const interval2 = setInterval(() => {
        if (resp == 2){
            console.log("Resetado");
            setResp(1);
          };
      }, 10000);
   
      return () =>  {clearInterval(interval);
                    clearInterval(interval2);} 
    }, [resp]); ///<--- this right here


  function dec_to_ascii(str1)
  {
    var str3 = str1.toString();
    var str2 = str3.substring(1, 5);
    var str4 = str3.substring(6, 10);
    str2 = parseInt(str2,10)/100;
    str4 = parseInt(str4,10)/100;
    var dec  = str4.toString();
    setTemp(dec);
    console.log(dec)
    var dec2  = str2.toString();
    setValorSet2(dec2);
    console.log(dec2)
  }

  const enviaValor = () => {
    Keyboard.dismiss();
    var valorSet2 = valorSet * 100;
    valorSet2 =Math.trunc(valorSet2);
    if ((valorSet2 < 1000) || isNaN(valorSet2) ){
      valorSet2 = 1000
    }
    console.log(valorSet2);
    var vs = valorSet2.toString();
    client.write(vs);
  };
  const enviaValorR1 = () => {
    //var valorSet2 = valorSet * 100;
    client.write("R1\n","ascii" );
    setResp(2);
  };
  
  client.once('data', function(data) {
    if (resp == 2){
      console.log('message was received', data);
      dec_to_ascii(data);
      setResp(1);
    }
  });
  
  client.on('error', function(error) {
  console.log(error);
  });
  
  client.on('close', function(){
  console.log('Connection closed!');
  });
  


  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor={Colors.asphalt} />
        <View style={styles.scrollView}>
          <Text style={styles.titletext}>Temperatura</Text> 
          <Text style={styles.title2text}>Atual</Text> 
          <Text style={styles.temptext}>{temp} °C</Text>
          <Text style={styles.titletext}>Temperatura</Text> 
          <Text style={styles.title2text}>Programada</Text> 
          <Text style={styles.temptext}>{valorSet2} °C</Text>   
          <View style={styles.sendView}>
            <TextInput
              style={styles.textInput}
              keyboardType = "numeric"
              placeholder='0.00'
              onChangeText = {(value)=> setValorSet(value)}
              value = {valorSet}
            />    
            <TouchableOpacity style={styles.buttom} onPress = {() => {enviaValor()}}>
                <Text style={styles.textbuttom}>Enviar</Text>
            </TouchableOpacity>  
          </View>        
        </View>
    </>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    backgroundColor: Colors.asphalt,
    alignItems: 'center',
  },
  textInput:{
    marginHorizontal: 20,
    backgroundColor: Colors.white,
    width: 150,
    fontSize: 30,
    borderRadius: 10,
    borderColor: Colors.white,
    borderWidth: 0.3,
  },
  sendView: {
    flex: 1,
    marginBottom:40,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-around',
  },
  temptext:{
    marginTop:20,
    fontSize:70,
    color: Colors.white,
    borderBottomWidth:1,
    borderColor: Colors.white,    
  },
  buttom: {
    backgroundColor: Colors.asphaltDark,
    borderRadius: 10,
    borderColor: Colors.white,
    borderWidth: 0.3,
    marginHorizontal: 20,
  },
  textbuttom: {
    marginVertical: 10,
    marginHorizontal:30,
    fontSize: 30,
    color: Colors.white,
  },
  titletext: {
    marginTop:20,
    fontSize: 40,
    color: Colors.white,
  },
  title2text: {
    marginTop:5,
    fontSize: 20,
    color: Colors.white,
  },
});

export default Main;
