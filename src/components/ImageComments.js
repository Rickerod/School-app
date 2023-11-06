import React, { useState } from "react";
import { View, Text, TextInput, Pressable } from "react-native";
import { BottomSheetFlatList } from "@gorhom/bottom-sheet";
import { Feather } from "@expo/vector-icons";
import ImageComment from "./ImageComment";



const ImageComments = ({ comments }) => {
    const [newComment, setNewComment] = useState("");

    const sendComment = async () => {
        console.log("Enviando comentario...")
    };

    return (
        <View style={{ backgroundColor: "#fff", flex: 1, padding: 5}}>

            <BottomSheetFlatList
                data={comments}
                renderItem={({ item }) => <ImageComment comment={item} />}
            />
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
                        borderColor: "black",
                        color: "black",
                        padding: 10,
                        flex: 1,
                    }}
                />
                <Pressable onPress={sendComment}>
                    <Feather name="send" size={24} color="black" />
                </Pressable>
            </View>
        </View>
    );
};

export default ImageComments;
