import { View, Text, Image , Pressable, TextInput, TouchableOpacity, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import Checkbox from "expo-checkbox"
import Button from '../components/Button';
import Register from './Register'
import { apiUrl } from '../../constants';
import { useNavigation } from '@react-navigation/native';

const Login = ({}) => {
    const [isPasswordShown, setIsPasswordShown] = useState(true);
    const [isChecked, setIsChecked] = useState(false);
    const [email, setChangeEmail] = useState("");
    const [password, setChangePassword] = useState("");

    const navigation = useNavigation()

    const Logearse = async () => {
        /* if(email === 'prob@prob.com' && password === '123456') navigation.navigate("TabScreen") */

        const body = {
            username : email,
            password : password
        }

        try {
            const response = await fetch(`http://${apiUrl}/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(body)
            });

            const data = await response.json();
            if(data["ok"]){
                navigation.navigate("LoginStack", {
                    id_user : data.user.id,
                    type_user: data.user.type_user,
                    uri_image_profile: data.user.uri_image_profile,
                    name: data.user.username
                })
            }else{
                Alert.alert("Credenciales incorrectas")
            }

        } catch (error) {
            console.error(error);
        }
    }

    const COLORS = {
      white: "#FFFFFF",
      black: "#222222",
      primary: "#007260",
      secondary: "#39B68D",
      grey: "#CCCCCC"
    }
    
    return (
        <SafeAreaView style={{ flex: 1, justifyContent: 'center', backgroundColor: COLORS.white }}>
            <View style={{ marginHorizontal: 22 }}>
                <View style={{marginVertical: 22, alignItems: 'center'}}>
                    <Text style={{
                        fontSize: 22,
                        fontWeight: 'bold',
                        marginVertical: 12,
                        color: COLORS.black
                    }}>
                        Bienvenido !
                  </Text>
                </View>

                <View style={{ marginBottom: 12 }}>
                    <Text style={{
                        fontSize: 16,
                        fontWeight: 400,
                        marginVertical: 8
                    }}>Usuario</Text>

                    <View style={{
                        width: "100%",
                        height: 48,
                        borderColor: COLORS.black,
                        borderWidth: 1,
                        borderRadius: 8,
                        alignItems: "center",
                        justifyContent: "center",
                        paddingLeft: 22
                    }}>
                        <TextInput
                            autoCapitalize='none'
                            caretHidden={false}
                            autoFocus={true}
                            placeholder='Ingrese su usuario'
                            onChangeText={setChangeEmail}
                            placeholderTextColor={COLORS.black}
                            keyboardType='email-address'
                            style={{
                                width: "100%"
                            }}
                        />
                    </View>
                </View>

                <View style={{ marginBottom: 12 }}>
                    <Text style={{
                        fontSize: 16,
                        fontWeight: 400,
                        marginVertical: 8
                    }}>Contraseña</Text>

                    <View style={{
                        width: "100%",
                        height: 48,
                        borderColor: COLORS.black,
                        borderWidth: 1,
                        borderRadius: 8,
                        alignItems: "center",
                        justifyContent: "center",
                        paddingLeft: 22
                    }}>
                        <TextInput
                            placeholder='Ingrese su contraseña'
                            onChangeText={setChangePassword}
                            placeholderTextColor={COLORS.black}
                            secureTextEntry={isPasswordShown}
                            style={{
                                width: "100%"
                            }}
                        />

                        <TouchableOpacity
                            onPress={() => setIsPasswordShown(!isPasswordShown)}
                            style={{
                                position: "absolute",
                                right: 12
                            }}
                        >
                            {
                                isPasswordShown == true ? (
                                    <Ionicons name="eye-off" size={24} color={COLORS.black} />
                                ) : (
                                    <Ionicons name="eye" size={24} color={COLORS.black} />
                                )
                            }

                        </TouchableOpacity>
                    </View>
                </View>
                <Button
                    title="Ingresar"
                    filled
                    onPress={Logearse}
                    style={{
                        marginTop: 18,
                        marginBottom: 4,
                    }}
                />

                <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 20 }}>
                    <View
                        style={{
                            flex: 1,
                            height: 1,
                            backgroundColor: COLORS.grey,
                            marginHorizontal: 10
                        }}
                    />

                    <View
                        style={{
                            flex: 1,
                            height: 1,
                            backgroundColor: COLORS.grey,
                            marginHorizontal: 10
                        }}
                    />
                </View>

                {/* <View style={{
                    flexDirection: "row",
                    justifyContent: "center",
                    marginVertical: 22
                }}>
                    <Text style={{ fontSize: 16, color: COLORS.black }}>¿No tienes una cuenta? </Text>
                    <Pressable
                        onPress={() => navigation.navigate("Register")}
                    >
                        <Text style={{
                            fontSize: 16,
                            color: COLORS.primary,
                            fontWeight: "bold",
                            marginLeft: 6
                        }}>Register</Text>
                    </Pressable>
                </View> */}
            </View>
        </SafeAreaView>
    )
}

export default Login