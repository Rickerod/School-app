import React, { useMemo, useState, useEffect, useCallback } from 'react';
import { View, Text, Dimensions, TouchableWithoutFeedback, StyleSheet, 
  TouchableOpacity, Image, RefreshControl, ActivityIndicator} from 'react-native';
import { RadioGroup } from 'react-native-radio-buttons-group';
import Slider from '@react-native-community/slider';
import Button from './Button';
import { FloatingAction } from "react-native-floating-action"
import { Ionicons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native';
import { FlatList } from 'react-native-gesture-handler';
import { apiUrl } from '../../constants';
import useUser from '../hooks/useUser';
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { useFocusEffect } from '@react-navigation/native';

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

const SurveySingle = ({ pregunta }) => {

  const [selectedIdButton, setSelectedIdButton] = useState(pregunta.user_response);
  const user = useUser()

  const insertReponseSurvey = async (id_alternative) => {

    console.log(id_alternative, user.id_user)

    const body = {
      id_alternative: id_alternative,
      id_user: user.id_user
    }

    try {

      const response = await fetch(`http://${apiUrl}/survey/insertAlternative`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
      });

      const data = await response.json();
      console.log(data)

    } catch (e) {
      console.log("ERROR: ", e)
    } finally {
      console.log("paso por aca!")
      setSelectedIdButton(id_alternative)
    }
  }

  const createRadioButtons = () => {

    return pregunta.alternatives.map(opcion => {
      return (
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <RadioButton
            value={opcion.id_alternative}
            label={opcion.alternative}
            isSelected={opcion.id_alternative == selectedIdButton}
            onPress={() => insertReponseSurvey(opcion.id_alternative)}
          />
          <View style={{ flexDirection: 'row', paddingRight: 40, alignItems: 'center' }}>
            {opcion.id_alternative == selectedIdButton &&
              <Image
                source={{ uri: user.uri_image_profile }}
                style={{ width: 25, height: 25, borderRadius: 100 }}
              />}
            <View style={{ paddingLeft: 5 }}>
              {opcion.id_alternative == pregunta.user_response &&
                <Text>
                  {opcion.id_alternative == selectedIdButton ? opcion.cantidad : opcion.cantidad - 1}
                </Text>

              }
              {opcion.id_alternative != pregunta.user_response &&
                <Text>
                  {opcion.id_alternative == selectedIdButton ? opcion.cantidad + 1 : opcion.cantidad}
                </Text>

              }
            </View>
          </View>
        </View>
      );
    });
  }

  return (
    <View>
      <Text style={{ fontSize: 16, fontWeight: 500 }}> {pregunta.question_survey} </Text>
      <Text style={{ fontSize: 13, fontWeight: 400, color: 'gray' }}> Seleciona una sola opción. </Text>
      <View>
        {createRadioButtons()}
      </View>
    </View>
  )
}

export default function Survey({ route }) {

  const [surveys, setSurveys] = useState([])

  const { id, id_user } = route.params
  const [refreshing, setRefreshing] = useState(false);

  const navigation = useNavigation()

  const user = useUser()

  console.log("id_user", id_user)
  console.log("user", user.id_user)

  useFocusEffect(
    useCallback(() => {
      async function fetchData() {
        console.log("test...")
        const response = await fetch(`http://${apiUrl}/survey/${user.id_user}/${id_user}`);
        const dataResponse = await response.json();

        setSurveys(dataResponse);
        setRefreshing(false);
        console.log(dataResponse);
      }

      fetchData();
    }, [refreshing]) // Dependencias para useCallback
  );

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

  if(surveys.length == 0){
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
       <ActivityIndicator size="large" color="#000000" style={{ paddingTop: 30 }} />
    </View>
  }

  return (
    <View style={{ flex: 1, padding: 10 }}>
      <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
        <TouchableOpacity onPress={() => setRefreshing(true)}>
          <Ionicons name="reload" size={30} color="white" />
        </TouchableOpacity>
      </View>
      <FlatList
        data={surveys}
        renderItem={({ item }) => <SurveySingle pregunta={item} />}
        ItemSeparatorComponent={renderSeparator}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={() => setRefreshing(true)}
          />
        }
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
