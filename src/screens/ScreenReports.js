import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, SafeAreaView } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import Feather from 'react-native-vector-icons/Feather';
import axios from "axios"
import Header from '../components/Header';
import { apiUrl } from '../../constants';

const renderSeparator = () => (
  <View
    style={{
      //backgroundColor: '#E3E3E3',
      paddingBottom: 5,
      height: 1,
    }}
  />
)

export default function ScreenReport() {

  const [reports, setReports] = useState([])
  //const apiUrl = process.env.HOST;

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

  console.log(reports)

  if (reports == []) {
    return <View> </View>
  }

  return (
    <SafeAreaView style={styles.container}>
      <Header title="Home" id={0} wd={0} />
      <FlatList
        contentContainerStyle={styles.list}
        data={reports}
        keyExtractor={(item) => item.id}
        ItemSeparatorComponent={renderSeparator}

        renderItem={({ item }) => (
          <View style={styles.card}>
            <View style={styles.header}>
              <Image
                source={{ uri: item.uri_image_profile }}
                style={styles.avatar}
              />
              <View>
                <Text style={styles.name}>{item.username}</Text>
                <Text style={styles.date}>Oct. 05</Text>
              </View>
            </View>

            <Text style={styles.description}>
              {item.report_description}
            </Text>

          </View>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  list: {
    padding: 15
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  header: {
    flexDirection: 'row',
    padding: 10,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30
  },
  name: {
    fontWeight: 'bold',
    fontSize: 16,
    paddingLeft: 10
  },
  date: {
    color: '#bbb',
    fontSize: 14,
    paddingLeft: 10
  },
  description: {
    fontSize: 15,
    padding: 10
  }
});

