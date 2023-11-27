import React, { useEffect, useState } from "react";
import { View, Text, TextInput, Pressable, Dimensions } from "react-native";
import { BottomSheetFlatList } from "@gorhom/bottom-sheet";
import { Feather } from "@expo/vector-icons";
import ImageComment from "./ImageComment";

import useUser from '../hooks/useUser';




const ImageComments = ({ id_post, comments }) => {
    const [newComment, setNewComment] = useState("");
    //const [comments, setComments] = useState("");

    const [commentsPost, setCommentsPost] = useState(comments)

    const windowWidth = Dimensions.get('window').width;
    const windowHeight = Dimensions.get('window').height;

    const apiUrl = process.env.HOST;

    const user = useUser()


    console.log("id_post", id_post)
    console.log("comentario", newComment)


    const sendComment = async () => {

        console.log("Paso por aca!!")
        const body = {
            comment: newComment,
        }

        var data = ""
        try {
            const response = await fetch(`http://${apiUrl}/comment/${id_post}/${user.id_user}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(body)
            });

            data = await response.json();

            setCommentsPost(comments.push({
                uri_image_profile: "https://raw.githubusercontent.com/Rickerod/School-app/master/src/storage/images/userProfile.png",
                username: "johndoe",
                comment: newComment,
                fecha_comment: "2023-09-01T04:00:00.000Z"
            }))
            setNewComment("")

        } catch (error) {
            console.error(error);
        }
    };




    return (
        <View style={{ backgroundColor: "#fff", flex: 1 }}>
            <Text style={{ fontSize: 15, alignSelf: 'center', marginVertical: 10, color: 'black' }}> Comentarios </Text>
            <View style={{ width: windowWidth, borderStyle: 'dotted', borderWidth: 0.7, borderColor: '#ccc' }}></View>
            <BottomSheetFlatList
                data={comments}
                renderItem={({ item }) => <ImageComment comment={item} />}
            />
            <View style={{ width: windowWidth, borderWidth: 0.3, borderColor: 'gray', marginBottom: 1 }}></View>
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
