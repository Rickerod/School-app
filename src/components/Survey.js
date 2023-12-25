import React, { useMemo, useState } from 'react';
import { View, Text, Dimensions, TouchableWithoutFeedback, StyleSheet, TouchableOpacity, Image, } from 'react-native';
import { RadioGroup } from 'react-native-radio-buttons-group';
import Slider from '@react-native-community/slider';
import Button from './Button';
import { FloatingAction } from "react-native-floating-action"
import { Ionicons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native';
import { FlatList } from 'react-native-gesture-handler';

const RadioButton = ({ value, label, isSelected, onPress }) => {
  return (
    <TouchableOpacity style={styles.radioButton} onPress={onPress}>
      <View style={[styles.radioCircle, { backgroundColor: isSelected ? '#C389FF' : '#fff' }]} />
      <Text>{label}</Text>
    </TouchableOpacity>
  );
};

const renderSeparator = () => (
  <View
      style={{
          backgroundColor: '#E3E3E3',
          height: 1,
          margin: 10,
      }}
  />
);

const SurveySingle = ({pregunta}) => {

  const [selectedIdButton, setSelectedIdButton] = useState(pregunta.user_clicked);

  const createRadioButtons = () => {

    return pregunta.opciones.map(opcion => {
      return (
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <RadioButton
            value={opcion.id}
            label={opcion.texto}
            isSelected={opcion.id == selectedIdButton}
            onPress={() => setSelectedIdButton(opcion.id)}
          />
          <View style={{ flexDirection: 'row', paddingRight: 40, alignItems: 'center' }}>
            {opcion.id == selectedIdButton &&
              <Image
                source={require('../storage/images/userProfile.png')}
                style={{ width: 25, height: 25, borderRadius: 100 }}
              />}
            <View style={{ paddingLeft: 5 }}>
              {opcion.id == pregunta.user_clicked && 
                <Text> 
                  {opcion.id == selectedIdButton ? opcion.cantidad : opcion.cantidad - 1}
                </Text>

              }
              {opcion.id != pregunta.user_clicked && 
                <Text> 
                  {opcion.id == selectedIdButton ? opcion.cantidad + 1 : opcion.cantidad }
                </Text>

              }
            </View>
          </View>
        </View>
      );
    });
  }

  return(
    <View>
      <Text style={{ fontSize: 16, fontWeight: 500 }}> {pregunta.enunciado} </Text>
      <Text style={{ fontSize: 13, fontWeight: 400, color: 'gray' }}> Seleciona una sola opción. </Text>
      <View>
         {createRadioButtons()} 
      </View>
    </View>
  )
}

export default function Survey({ route }) {

  const preguntas = [
    {
      user_clicked: 2,
      enunciado: "¿Donde vamos a comer?",
      opciones: [
        {
          id: '1',
          texto: 'Mall',
          cantidad: 3
        },
        {
          id: '2',
          texto: 'Casino',
          cantidad: 2
        },
      ]
    }, 
    {
      user_clicked: 2,
      enunciado: "¿Donde vamos a ir",
      opciones: [
        {
          id: '1',
          texto: 'Corral',
          cantidad: 3
        },
        {
          id: '2',
          texto: 'Niebla',
          cantidad: 2
        },
        {
          id: '3',
          texto: 'Antilhue',
          cantidad: 2
        }
      ]
    },
    {
      user_clicked: 2,
      enunciado: "¿Cuanto sería 3x3?",
      opciones: [
        {
          id: '1',
          texto: '9',
          cantidad: 3
        },
        {
          id: '2',
          texto: '8',
          cantidad: 2
        },
        {
          id: '3',
          texto: '7',
          cantidad: 2
        },
      ]
    }
  ]


  const { id, id_user } = route.params

  const navigation = useNavigation()

  const actions = [
    {
      text: 'Encuesta',
      icon: <Ionicons name="create" size={20} color="white" />,
      name: 'Encuesta',
      position: 1,
    },
    {
      text: 'URL',
      icon: <Ionicons name="create" size={20} color="white" />,
      name: 'url',
      position: 2,
    },
  ];

  const onPressAction = (name) => {
    console.log(`Botón presionado: ${name}`);
    // Aquí puedes implementar la lógica asociada a cada botón
    if (name === "Encuesta") {
      navigation.navigate("NewSurvey")
    }
  };


  return (
    <View style={{ flex: 1}}>
      <FlatList
        data={preguntas}
        renderItem={({ item }) => <SurveySingle pregunta={item}/>}
        ItemSeparatorComponent={renderSeparator}
      />
      {id === 0 &&
        <FloatingAction
          actions={actions}
          onPressItem={(name) => onPressAction(name)}
          floatingIcon={<Ionicons name="add" size={30} color="white" />}
          color="purple" // Color del botón flotante
          overlayColor="rgba(255, 255, 255, 0.8)" // Color del fondo cuando se presiona el botón flotante
        />
      }
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  radioButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
  },
  radioCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#C389FF',
    marginRight: 8,
  },
});
