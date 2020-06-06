import React, { useState, useEffect } from 'react';
import { Feather as Icon} from '@expo/vector-icons'
import { Text, ImageBackground, StyleSheet, View, Image, TextInput, KeyboardAvoidingView, Platform} from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import RNPickerSelect from 'react-native-picker-select';
import { Roboto_900Black } from '@expo-google-fonts/roboto';

interface IBGEUFResponse {
  sigla: string;
}

interface IBGEUCityResponse {
  nome: string;
}

const Home = () => {

  const navigation = useNavigation();
  const [ufs, setUfs] = useState<string[]>([]);
  const [cities, setCities] = useState<string[]>([]);
  const [selectedUf, setSelectedUf] = useState('0');
  const [selectedCity, setSelectedCity] = useState('0');

  useEffect(() => {
    axios
    .get<IBGEUFResponse[]>('https://servicodados.ibge.gov.br/api/v1/localidades/estados')
    .then(response => {
        const UfInitials = response.data.map(uf => uf.sigla);

        setUfs(UfInitials);
    });
  }, []);

  useEffect(() => {
    if(selectedUf === '0'){
        return;
      }
        axios
        .get<IBGEUCityResponse[]>(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${selectedUf}/municipios`)
        .then(response => {
            const cityNames = response.data.map(city => city.nome);

            setCities(cityNames);
        })
  }, [selectedUf])

  function handleSelectUf(value:string){
    const uf = value;
    setSelectedUf(uf); 
  }

  function handleSelectCity(value: string){
      const city = value;
      setSelectedCity(city);
  }    

    function handleNavigateToPoints(){
      const uf = selectedUf;
      const city = selectedCity;

      navigation.navigate('Points', {
        uf,
        city,
      })
    }

  return(
    <KeyboardAvoidingView style={{ flex: 1}} 
     behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <ImageBackground  
      source={require('../../assets/home-background.png')} 
      style={styles.container}
      imageStyle={{width: 274, height: 368}}
      >
        <View style={styles.main}>
         <View>
            <Image source={require('../../assets/logo.png')} />
            <Text style={styles.title}>Seu marketplace de coleta de resíduos</Text>
            <Text style={styles.description}>Ajudamos pessoas a encontrarem pontos de coleta de forma eficiente.</Text>
          </View>           
        </View>

        <View style={styles.footer}>
          <RNPickerSelect 
            style={{...pickerSelectStyles}}
            onValueChange={handleSelectUf}
            placeholder={{
              label: 'Selecione seu estado',
              value: null,
              color: 'black',
            }}
            items={ufs.map(uf => (
               {
                 label: uf,
                 value: uf,
                 color: 'black',
               }   
            ))}
          />

          <RNPickerSelect 
            style={{...pickerSelectStyles}}
            onValueChange={value => setSelectedCity(value)}
            placeholder={{
              label: 'Selecione sua cidade',
              value: null,
              color: 'black',
            }}
            items={cities.map(city => (
               {
                 label: city,
                 value: city,
                 color: "black",
               }   
            ))}
          />  
          <RectButton style={styles.button} onPress={handleNavigateToPoints}>
            <View style={styles.buttonIcon}>
              <Text>
                <Icon name="arrow-right" color="#FFF" size={24} />
              </Text>
            </View>
            <Text style={styles.buttonText}>
              Entrar
            </Text>
          </RectButton>
        </View>
      </ImageBackground>
    </KeyboardAvoidingView>
  );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 32,
  },

  main: {
    flex: 1,
    justifyContent: 'center',
  },

  title: {
    color: '#322153',
    fontSize: 32,
    fontFamily: 'Ubuntu_700Bold',
    maxWidth: 260,
    marginTop: 64,
  },

  description: {
    color: '#6C6C80',
    fontSize: 16,
    marginTop: 16,
    fontFamily: 'Roboto_400Regular',
    maxWidth: 260,
    lineHeight: 24,
  },

  footer: {},

  select: {},

  input: {
    height: 60,
    backgroundColor: '#FFF',
    borderRadius: 10,
    marginBottom: 12,
    paddingHorizontal: 24,
    fontSize: 16,
  },

  button: {
    backgroundColor: '#34CB79',
    height: 60,
    flexDirection: 'row',
    borderRadius: 10,
    overflow: 'hidden',
    alignItems: 'center',
    marginTop: 8,
  },

  buttonIcon: {
    height: 60,
    width: 60,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    justifyContent: 'center',
    alignItems: 'center'
  },

  buttonText: {
    flex: 1,
    justifyContent: 'center',
    textAlign: 'center',
    color: '#FFF',
    fontFamily: 'Roboto_500Medium',
    fontSize: 16,
  }
});

const pickerSelectStyles = StyleSheet.create({
  inputAndroid: {
    height: 60,
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 12,
    paddingHorizontal: 24,
    fontSize: 16,
    color: 'black',
  },
});

export default Home;