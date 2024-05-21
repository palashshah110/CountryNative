import React, { useState } from 'react'
import { Button, Image, ImageBackground, Modal, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native'

export default function CountryDetails({navigation,route}:any):React.JSX.Element{
  const APIKEY = process.env.APIKEY;
  const [weather,setweather] = useState({temp:0,speed:0,open:false});
  const handleClick = async (latlng: number[]) => {
    try {
      const { main: { temp }, wind: { speed } } = await (await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latlng[0]}&lon=${latlng[1]}&appid=${APIKEY}`)).json();
      setweather({ temp, speed, open: true });
    } catch (err) {
      setweather({...weather,open: false });
    }
  };
  const { capital, population, latlng, flags } = route.params.state;
  return (
    <ImageBackground
    source={{
      uri: flags?.png,
    }}
    alt={flags.alt}
    resizeMode="cover"
    style={styles.backgroundImg}>
    <TouchableOpacity
      onPress={() => navigation.goBack()}
      testID="goBackTest">
      <Text style={styles.Goback}>Go Back</Text>
    </TouchableOpacity>
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <View style={styles.card}>
          <View style={styles.cardContent}>
             <Text style={styles.text}>Captial: {capital}</Text>
            <Text style={styles.text}>
              population: {population}
            </Text>
            <Text style={styles.text}>latitude: {latlng[0]}</Text>
            <Text style={styles.text}>Longtitude: {latlng[1]}</Text>
            <Button title='check weather' color={'#000'} onPress={()=>handleClick(latlng)}></Button>
          </View>
        </View>
      </View>
    </View>
    <Modal
        animationType="slide"
        transparent={true}
        visible={weather.open}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Speed: {weather.speed}</Text>
            <Text style={styles.modalText}>Temperature: {weather.temp}</Text>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setweather({...weather,open:false})}>
              <Text style={styles.textStyle}>Hide Modal</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
  </ImageBackground>  
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backgroundImg: {flex: 1, width: '100%', display: 'flex'},
  innerContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    minWidth: 275,
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  cardContent: {
    marginVertical: 10,
  },
  text: {
    marginBottom: 10,
    color: '#000',
  },
  Goback: {
    color: '#000',
    fontSize: 20,
    marginLeft: 10,
    marginTop: 10,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 70,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#000',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});
