import React from 'react';
import { View, Text, SafeAreaView, TouchableOpacity, StatusBar } from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import Fontisto from '@expo/vector-icons/Fontisto';
import Ionic from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

export default function Header({ title, id }) {
    const navigation = useNavigation();

    return (
        <View backgroundColor={id === 0 ? "white" : "purple"}>
            <StatusBar
                backgroundColor={id === 0 ? "white" : "purple"}
                barStyle="dark-content"
                animated={true}
            />
            <SafeAreaView
                style={{
                    justifyContent: 'space-between',
                    flexDirection: 'row',
                    marginTop: 15,
                    marginBottom: 15,
                    paddingHorizontal: 15,
                    alignItems: 'center',
                }}>
                {/*<FontAwesome name="plus-square-o" style={{ fontSize: 24 }} />*/}
                <View style={{flexDirection: 'row', paddingLeft: 5}}>
                    {id !== 0 ?
                        <TouchableOpacity activeOpacity={0.9} onPress={() => navigation.goBack()}>
                            <Ionic name="arrow-back" style={{ fontSize: 25, color: 'white', paddingRight: 20 }} />
                        </TouchableOpacity>
                        : null}
                    <Text
                        style={{
                            //fontFamily: 'Cochin',
                            fontSize: 20,
                            fontWeight: '500',
                            color: id !== 0 ? "white" : undefined
                        }}>
                        {title}
                    </Text>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <TouchableOpacity
                        activeOpacity={0.5}
                        onPress={() => console.log("Click on bell...")}
                    >
                        <Fontisto name="bell" style={{ fontSize: 24, color: id !== 0 ? "white" : undefined }} />
                    </TouchableOpacity>
                    <TouchableOpacity
                        activeOpacity={0.5}
                        onPress={() => console.log("Click on cog...")}
                    >
                        <Entypo name="cog" style={{ fontSize: 24, paddingLeft: 20, color: id !== 0 ? "white" : undefined }} />
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        </View>
    );
}
