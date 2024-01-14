import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, StatusBar, RefreshControl, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context'

import Students from '../components/Students';
import PostInfo from '../components/PostInfo';

import Header from '../components/Header';
import { FlatList } from 'react-native-gesture-handler';
import useUser from '../hooks/useUser';
import { useLike } from '../context/LikeContext';
import { apiUrl } from '../../constants';


export default function HomeScreen({ navigation }) {
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(false)
  const [loadingPosts, setLoadingPosts] = useState(false)
  const [data, setData] = useState([])
  const { initializeLike, initializeLikePage } = useLike();
  const [update, setUpdate] = useState(false)
  const [idPostOld, setIdPostOld] = useState(0)
  const [idPostNew, setIdPostNew] = useState(0)

  const user = useUser()

  useEffect(() => {
    //Enviar el id del usuario como query para obtener las publicaciones a las que les dió like...
    async function fetchPost() {
      try {
        const idSchool = 1
        const response = await fetch(`http://${apiUrl}/posts/${user.id_user}/${idSchool}`)
        const dataResponse = await response.json();

        setData(dataResponse)
        setIdPostOld(dataResponse[dataResponse.length - 1].id_post)
        setIdPostNew(dataResponse[0].id_post)

        /* const response = await axios.get(`http://${apiUrl}/home`, { params: params });
        setData(response.data) */

        //console.log(dataResponse)

        const initializeLikes = dataResponse.reduce((result, post) => {
          result[post.id_post] = post.is_liked;
          return result;
        }, {});

        const initializeNumLikes = dataResponse.reduce((result, post) => {
          result[post.id_post] = post.num_likes;
          return result;
        }, {});

        //console.log(initializeLikes)
        //console.log(initializeNumLikes)

        initializeLike(initializeLikes, initializeNumLikes)

        setLoading(true)
      } catch (error) {
        console.log("Error", error);
      }
    }

    fetchPost()
  }, [update])

  const onRefresh = () => {
    setUpdate(!update)
  }

  const handleScroll = async (event) => {
    const { layoutMeasurement, contentOffset, contentSize } = event.nativeEvent;

    const isCloseToBottom =
      layoutMeasurement.height + contentOffset.y >= contentSize.height - 10;

    if (isCloseToBottom && !loadingPosts) {
      setLoadingPosts(true)

      try {
        const id_school = 1
        const start1 = performance.now();
        const response = await fetch(`http://${apiUrl}/posts/${user.id_user}/${idPostOld}/${idPostNew}/${id_school}`)
        const dataResponse = await response.json();

        const end1 = performance.now();
        console.log(`Tiempo fetch: ${end1 - start1} ms`)

        if (dataResponse.length !== 0) {
          //console.log(idPostOld, idPostNew)
          /* setData(prevData => {
            return [...prevData, ...dataResponse]
          }) */
          
          const start3 = performance.now();

          const lengthData = dataResponse.length
          const firstPost = dataResponse[0];
          const lastPost = dataResponse[lengthData - 1];

          firstPost.id_post > idPostNew
            ? setIdPostNew(firstPost.id_post)
            : lastPost.id_post < idPostOld
              ? setIdPostOld(lastPost.id_post)
              : null;

          const end3 = performance.now();
          console.log(`Tiempo setIdPost: ${end3 - start3} ms`)

          const start4 = performance.now();
          const initializeLikes = dataResponse.reduce((result, post) => {
            result[post.id_post] = post.is_liked;
            return result;
          }, {});

          const initializeNumLikes = dataResponse.reduce((result, post) => {
            result[post.id_post] = post.num_likes;
            return result;
          }, {});

          const end4 = performance.now();
          console.log(`Tiempo initializeLike: ${end4 - start4} ms`)


          const start6 = performance.now();
          const newData = data.concat(dataResponse)
          const end6 = performance.now();
          
          console.log(`Tiempo newData: ${end6 - start6} ms`)

          const start7 = performance.now();
          initializeLikePage(initializeLikes, initializeNumLikes)
          const end7 = performance.now();
          console.log(`Tiempo initializeLikePage: ${end7 - start7} ms`)

          const start8 = performance.now();
          setData(newData)
          const end8 = performance.now();

          console.log(`Tiempo SetData: ${end8 - start8} ms`)
        }


        setLoadingPosts(false)

      } catch (error) {
        console.log("Error", error);
      }
    }
  };

  //console.log("loading", loadingPosts)

  if (!loading) {
    return <View></View>
  }

  return (
    <SafeAreaView style={{ backgroundColor: 'white', height: '100%' }}>
      <Header title="Home" id={0} wd={0} />
      <ScrollView
        onScroll={handleScroll}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            colors={["purple"]}
            onRefresh={onRefresh}
          />
        }
      >
        <Students />
        <FlatList
          scrollEnabled={false}
          data={data}
          renderItem={({ item }) => <PostInfo data={item} updateHome={setUpdate}></PostInfo>}
        />
        {loadingPosts && (
          <View style={{ padding: 10 }}>
            <ActivityIndicator size="large" color="purple" />
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
