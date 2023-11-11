import React, { useState } from "react";
import { View, Text, TextInput, Pressable, Dimensions } from "react-native";
import { BottomSheetFlatList } from "@gorhom/bottom-sheet";
import { Feather } from "@expo/vector-icons";
import ImageComment from "./ImageComment";



const ImageComments = ({ comments }) => {
    const [newComment, setNewComment] = useState("");

    const windowWidth = Dimensions.get('window').width;
    const windowHeight = Dimensions.get('window').height;

    const sendComment = async () => {
        console.log("Enviando comentario...")
    };

    return (
        <View style={{ backgroundColor: "#fff", flex: 1}}>
            <Text style={{ fontSize: 15, alignSelf: 'center', marginVertical: 10, color: 'black' }}> Comentarios </Text>
            <View style={{ width: windowWidth, borderStyle: 'dotted', borderWidth: 0.7, borderColor: '#ccc' }}></View>
            <BottomSheetFlatList
                data={comments}
                renderItem={({ item }) => <ImageComment comment={item} />}
            />
            <View style={{ width: windowWidth, borderWidth: 0.3, borderColor: 'gray', marginBottom: 1}}></View>
            <View
                style={{
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <TextInput
                    placeholder="Agrega un comentario..."
                    value={newComment}
                    onChangeText={setNewComment}
                    placeholderTextColor="grey"
                    style={{
                        backgroundColor: "#fff",
                        color: "black",
                        padding: 10,
                        flex: 1,
                    }}
                />
                <View style={{ paddingRight: 10 }}>
                    <Pressable onPress={sendComment}>
                        <Feather name="send" size={24} color="black" />
                    </Pressable>
                </View>
            </View>
        </View>
    );
};

export default ImageComments;
