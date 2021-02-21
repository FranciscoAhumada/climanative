import React, {useState, useEffect} from 'react';
import { StyleSheet, View, TouchableWithoutFeedback, Keyboard, Alert} from 'react-native';
import Formulario from './components/Formulario'
import Clima from './components/Clima';

const App = () => {

  const [busqueda, setBusqueda] = useState({
    ciudad : '',
    pais : ''
  });

  const [consultar, setConsultar] = useState(false);
  const [resultado, setResultado] = useState({});
  const [bgColor, setBgColor] = useState('rgb(71,149,212)')

  const {ciudad, pais} = busqueda

  const ocultarTeclado = () => {
    Keyboard.dismiss();
  }

const bgColorApp = {
  backgroundColor : bgColor
}

  useEffect(()=>{
    const consultarApi = async() => {
      if(consultar){
        const appId = '13c4b3adb4fdf08f05e0969e5cee10d0'
        const url = `http://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${appId}`
        try {
          const respuesta = await fetch(url);
          const resultado = await respuesta.json();
          setResultado(resultado);

          const kelvil = 273.15;
          const {main} = resultado;
          const actual = main.temp - kelvil;

          if(actual < 10){
            setBgColor('rgb(105,108,149)');
          }else if(actual >=10 && actual < 20){
            setBgColor('rgb(71, 149,212)');
          }else{
            setBgColor('rgb(178,28,61)');
          }
          
        } catch (error) {
          mostrarAlerta();
        }
        setConsultar(false);
      }
    }
    consultarApi();
  },[consultar]);

  const mostrarAlerta = () => {
    Alert.alert(
        'Error',
        'no se tiene resultado',
        [{text: 'Ok'}]
    )
}
  return (
    <>

    <TouchableWithoutFeedback onPress={()=> ocultarTeclado()}>
      <View style={[styles.app, bgColorApp]}>
        <View style={styles.contenido}>
          <Clima
            resultado={resultado}
          />
          <Formulario
            busqueda = {busqueda}
            setBusqueda = {setBusqueda}
            setConsultar = {setConsultar}
          />
        </View>
      </View>
    </TouchableWithoutFeedback>
    </>
  );
};

const styles = StyleSheet.create({
  app : {
    flex : 1,
    justifyContent : 'center'
  },
  contenido : {
    marginHorizontal: '2.5%'
  }
});

export default App;
