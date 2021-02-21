import React, {useState} from 'react';
import { Text, StyleSheet, View, TextInput, TouchableWithoutFeedback , Animated, Alert} from 'react-native';
import { Picker} from '@react-native-picker/picker'


const Formulario = ({busqueda, setBusqueda, setConsultar}) => {

const {pais, ciudad} = busqueda;

const [ animacionBoton ] = useState(new Animated.Value(1));

const animacionEntrada = () => {
    Animated.spring(animacionBoton, {
        toValue : .75
    }).start();
}

const animacionSalida = () => {
    Animated.spring(animacionBoton, {
        toValue : 1,
        friction : 4,
        tension : 30
    }).start();
}

const consultarClima = () => {
    if(pais.trim()==='' || ciudad.trim() === ''){
        mostrarAlerta();
        return;
    }
    setConsultar(true);
}

const mostrarAlerta = () => {
    Alert.alert(
        'Error',
        'Agrega ciudad y pais',
        [{text: 'Entendido'}]
    )
}

const estiloAnimacion = {
    transform : [{scale : animacionBoton}]
}

return (
    <>
        <View style = {styles.formulario}>
            <View>
                <TextInput
                    value={ciudad}
                    style = {styles.input}
                    placeholder='Ciudad'
                    placeholderTextColor = '#666'
                    onChangeText = {ciudad => setBusqueda({...busqueda, ciudad})}
                />
            </View>
            <View>
                <Picker
                    selectedValue={pais}
                    itemStyle = {{height:120, backgroundColor:'#FFF'}}
                    onValueChange = {pais => setBusqueda({...busqueda, pais})}
                >
                    <Picker.Item label = '-- Seleccione un pais --' value = ''/>
                    <Picker.Item label = 'Chile' value = 'CL'/>
                    <Picker.Item label = 'Estados Unidos' value = 'US'/>
                    <Picker.Item label = 'Mexico' value = ' MX'/>
                    <Picker.Item label = 'Argentina' value = 'AR'/>
                    <Picker.Item label = 'Colomabia' value = 'CO'/>
                    <Picker.Item label = 'Costa Rica' value = 'CR'/>
                    <Picker.Item label = 'España' value = 'ES'/>
                    <Picker.Item label = 'Peru' value = 'PE'/>
                </Picker>
            </View>
            <TouchableWithoutFeedback
                onPressIn = {()=> animacionEntrada()}
                onPressOut = {()=> animacionSalida()}
                onPress = {()=>consultarClima()}
            >
                <Animated.View style={[styles.btnBuscar, estiloAnimacion]}>
                    <Text style={styles.textBuscar}>Buscar Clima</Text>
                </Animated.View>
            </TouchableWithoutFeedback>
        </View>
    </>
    )
}

const styles = StyleSheet.create({
    input:{
        padding : 10,
        height : 50,
        backgroundColor : '#FFF',
        fontSize: 20,
        marginBottom : 20,
        textAlign : 'center'
    },
    btnBuscar :{
        marginTop : 50,
        backgroundColor : '#000',
        padding : 10,
        justifyContent : 'center'
    },
    textBuscar :{
        color : '#FFF',
        fontWeight : 'bold',
        textTransform : 'uppercase',
        textAlign : 'center',
        fontSize : 18
    }
});

export default Formulario;