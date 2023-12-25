import React, {useState, useEffect}from 'react';
import { View, Tex, Dimensions, Text } from 'react-native';
import Header from '../components/Header';
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart
} from "react-native-chart-kit";
import { apiUrl } from '../../constants';

export default function StatisticsBitacora({route}) {

  const {id_bitacora} = route.params

  const windowWidth = Dimensions.get('window').width

  const [energy, setEnergy] = useState([])
  const [evaluation, setEvaluation] = useState([])

  useEffect(() => {

      async function fetchData(){
        const response_energy = await fetch(`http://${apiUrl}/bitacora/statistics/${id_bitacora}/1`)
        const data_response_energy = await response_energy.json();

        const response_nota = await fetch(`http://${apiUrl}/bitacora/statistics/${id_bitacora}/2`)
        const data_response_nota = await response_nota.json();

        setEnergy(data_response_energy)
        setEvaluation(data_response_nota)
      }
    fetchData()
  }, [])

  const emojis = [
    "😡",
    "😨",
    "🙁",
    "😐",
    "🙂",
    "😁",
    "🥰"
  ];



  if( energy == [] || evaluation == []){
    return <View> </View>
  }

  const data_energia = {
    labels: emojis,
    datasets: [
      {
        data: energy,
        colors: [
          (opacity = 1) => `#FFF`,
          (opacity = 1) => `#FFF`,
          (opacity = 1) => `#FFF`,
          (opacity = 1) => `#FFF`,
          (opacity = 1) => `#FFF`,
          (opacity = 1) => `#FFF`,
          (opacity = 1) => `#FFF`,
        ]
      },
    ],
  };

  const data_nota = {
    labels: [1, 2, 3, 4, 5, 6, 7],
    datasets: [
      {
        data: evaluation,
        colors: [
          (opacity = 1) => `#FFF`,
          (opacity = 1) => `#FFF`,
          (opacity = 1) => `#FFF`,
          (opacity = 1) => `#FFF`,
          (opacity = 1) => `#FFF`,
          (opacity = 1) => `#FFF`,
          (opacity = 1) => `#FFF`,
        ]
      },
    ],
  };

  const chartConfig = {
    backgroundGradientFrom: 'purple',
    backgroundGradientTo: '#AD45FF',
    backgroundGradientToOpacity: 1,
    backgroundGradientFromOpacity: 1,
    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    strokeWidth: 2, // optional, default 3
    barPercentage: 0.7,
    fillShadowGradient: `#9700FF`,
  };

  return (
    <View style={{ flex: 1 }}>
      <Header title="Estadisticas Bitacora" id={1} wd={0} />
      <View style={{ flex: 1 }}>
        <Text style={{ fontSize: 17, fontWeight: 500, padding: 10 }}> 1. Nivel de energía de los alumnos ⚡</Text>
        <BarChart
          data={data_energia}
          width={windowWidth - 8}
          height={220}
          chartConfig={chartConfig}
          showBarTops
          showValuesOnTopOfBars
          withCustomBarColorFromData
          yAxisInterval={1}
          withInnerLines={false}
          style={{ margin: 8, borderRadius: 16, alignSelf: 'center' }}
        />
        <Text style={{ fontSize: 17, fontWeight: 500, padding: 10 }}> 2. Notas de la Actividad 📝</Text>
        <BarChart
          data={data_nota}
          width={windowWidth - 8}
          height={220}
          chartConfig={chartConfig}
          showBarTops
          showValuesOnTopOfBars
          withInnerLines={false}
          withCustomBarColorFromData
          style={{ margin: 8, borderRadius: 16, alignSelf: 'center' }}
        />
      </View>
    </View>
  );
}
