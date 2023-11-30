import React, { useEffect, useState } from 'react';
import { View, Text, Image } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import Feather from 'react-native-vector-icons/Feather';
import axios from "axios"
import Header from '../components/Header';

const renderSeparator = () => (
  <View
    style={{
      backgroundColor: '#E3E3E3',
      height: 1,
    }}
  />
)

export default function ScreenReport() {

  const [reports, setReports] = useState([])
  const apiUrl = process.env.HOST;

  useEffect(() => {
    async function fetchReports() {
      try {
        const response = await axios.get(`http://${apiUrl}/reports`);
        setReports(response.data)

      } catch (error) {
        console.log("Error", error);
      }
    }
    fetchReports()
  }, [])

  return (
    <View>
      <Header title="Home" id={0} wd={0} />
      <FlatList
        key={'_'}
        data={reports}
        ItemSeparatorComponent={renderSeparator}
        renderItem={({ item }) =>
          <View style={{ padding: 15 }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Image
                  source={{uri: item.uri_image_profile}}
                  style={{ width: 60, height: 60, borderRadius: 100 }}
                />
                <View style={{ paddingLeft: 5 }}>
                  <Text style={{ fontSize: 16, fontWeight: 'bold' }}>
                    {item.username}
                  </Text>
                  <Text style={{ fontSize: 14, color: 'gray' }}>
                    oct. 05
                  </Text>
                </View>
              </View>
              <Feather name="more-vertical" style={{ fontSize: 20 }} />
            </View>
            <View>
              <Text style={{ fontSize: 15 }}>
                {item.report_description}
              </Text>
            </View>
          </View>
        }
      />
    </View>
  );
}
