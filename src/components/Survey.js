import React, { useMemo, useState } from 'react';
import { View, Text, Dimensions, TouchableWithoutFeedback, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { RadioGroup } from 'react-native-radio-buttons-group';
import Slider from '@react-native-community/slider';
import Button from './Button';
import { FloatingAction } from "react-native-floating-action"
import { Ionicons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native';

const RadioButton = ({ label, isSelected, onPress }) => {
  return (
    <TouchableOpacity style={styles.radioButton} onPress={onPress}>
      <View style={[styles.radioCircle, { backgroundColor: isSelected ? '#C389FF' : '#fff' }]} />
      <Text>{label}</Text>
    </TouchableOpacity>
  );
};

export default function Survey({ route }) {

  const { id, id_user } = route.params


  console.log("Survey", id)

  const [selectedId, setSelectedId] = useState();
  const [selectedIdButton, setSelectedIdButton] = useState("1");
  const [value, setValue] = useState(0);
  const [value2, setValue2] = useState(0);
  const [selectedOption, setSelectedOption] = useState(0);
  const navigation = useNavigation()

  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;


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

  const handleRadioButtonPress = (value) => {
    setSelectedOption(value);
    if (value === 1) {
      setValue(1)
      setValue2(0)
    } else {
      setValue2(1)
      setValue(0)
    }
  };

  return (
    <View style={{ flex: 1, padding: 10, backgroundColor: 'white' }}>
      <Text style={{ fontSize: 16, fontWeight: 500 }}> ¿Donde vamos a comer?</Text>
      <Text style={{ fontSize: 13, fontWeight: 400, color: 'gray' }}> Seleciona una sola opción. </Text>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
        <RadioButton label="Mall" isSelected={selectedOption === 1} onPress={() => handleRadioButtonPress(1)} />
        <View style={{ flexDirection: 'row', paddingRight: 40, alignItems: 'center' }}>
          {value == 1 &&
            <Image
              source={require('../storage/images/userProfile.png')}
              style={{ width: 25, height: 25, borderRadius: 100 }}
            />}
          <Text style={{ paddingLeft: 5 }}>
            {value == 1 ? 1 : 0}
          </Text>

        </View>
      </View>
      <View style={{ pointerEvents: 'none' }}>
        <Slider
          style={{ width: windowWidth - 40, height: 40, borderRadius: 20, transform: [{ scaleY: 4 }] }}
          trackStyle={{ height: 80 }}
          minimumValue={0}
          maximumValue={1}
          step={1}
          value={value}
          onValueChange={setValue}
          minimumTrackTintColor="#C389FF"
          maximumTrackTintColor="#000000"
          thumbTintColor="transparent"
          enabled={false}
        />
      </View>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
        <RadioButton label="Casino" isSelected={selectedOption === 2} onPress={() => handleRadioButtonPress(2)} />
        <View style={{ flexDirection: 'row', paddingRight: 40, alignItems: 'center' }}>
          {value2 == 1 &&
            <Image
              source={require('../storage/images/userProfile.png')}
              style={{ width: 25, height: 25, borderRadius: 100 }}
            />}
          <Text style={{ paddingLeft: 5 }}>
            {value2 == 1 ? 1 : 0}
          </Text>

        </View>
      </View>
      <View style={{ pointerEvents: 'none' }}>
        <Slider
          style={{ width: windowWidth - 40, height: 40, borderRadius: 20, transform: [{ scaleY: 4 }] }}
          trackStyle={{ height: 80 }}
          minimumValue={0}
          maximumValue={1}
          step={1}
          value={value2}
          onValueChange={setValue2}
          minimumTrackTintColor="#C389FF"
          maximumTrackTintColor="#000000"
          thumbTintColor="transparent"
          enabled={false}
        />
      </View>
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
