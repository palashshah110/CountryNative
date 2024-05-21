import React, { useState } from 'react'
import { ActivityIndicator, Alert, Image, ImageBackground, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'

export default function CountryForm({navigation}:any):React.JSX.Element{
  const [countryname,setcountryname] = useState('');
  const [Disabled,setDisabled] = useState(false);
  const handlechange = (text:string)=>{
    if (/^[a-zA-Z ]*$/.test(text)) {
      setcountryname(text)
    }
  }

  const handleSubmit = async()=>{
    setDisabled(true)
  try {
    const responses = await fetch(`https://restcountries.com/v3.1/name/${countryname.toLowerCase()}?fullText=true`);
    const response = await responses.json();
    if (response[0].status === "officially-assigned") {
      setcountryname('');
      setDisabled(false);
      navigation.navigate("CountryDetails", { state: response[0]});
    } else {
      throw new Error('Not Found');
    }
  } catch (err) {
    Alert.alert("API Error");
    setDisabled(false);
    setcountryname('');
  }
}
  return (
        <ImageBackground 
        source={{uri:'https://img.freepik.com/free-vector/blur-pink-blue-abstract-gradient-background-vector_53876-174836.jpg'}} 
        style={styles.backgroundImg}
        resizeMode="cover">
          <View style={styles.container}>    
            <View style={styles.inputContainer}>
      <TextInput
        style={styles.input}
        placeholder="Enter Country Name"
        onChangeText={handlechange}
        value={countryname}
      />
      <View style={styles.btncontainer}>
        <TouchableOpacity
          style={countryname === "" || Disabled ? styles.submitDisButton : styles.submitButton}
          onPress={handleSubmit}
          disabled={countryname === "" || Disabled}
          >
            {Disabled ? <ActivityIndicator size={'large'} color={'#fff'}/> : 
            <Text style={styles.submitButtonText}>Search</Text>}
        </TouchableOpacity>
      </View>
    </View>
  </View>
    </ImageBackground>
  )
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent:'center'
    },
    backgroundImg: {flex: 1, width: '100%', display: 'flex'},
    inputContainer: {
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent:'center',
      borderRadius:15,
    },
    input: {
      borderWidth: 1,
      borderColor: 'black',
      backgroundColor: '#fff',
      padding: 15,
      borderRadius: 10,
      width: 200,
    },
    submitButton: {
      backgroundColor: 'green',
      padding: 10,
      borderRadius: 5,
      marginTop: 10,
      width: 100,
    },
    submitDisButton: {
      backgroundColor: 'green',
      padding: 10,
      borderRadius: 5,
      marginTop: 10,
      width: 100,
      opacity: 0.2,
    },
    submitButtonText: {
      color: 'white',
      fontWeight: 'bold',
      textAlign: 'center',
    },

    btncontainer: {
      flexDirection: 'row',
      gap: 10,
      height: 50,
    },
  });
  