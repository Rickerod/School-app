import React, { useEffect, useState } from "react";
import { View, Text, TextInput, Pressable, Dimensions, ActivityIndicator } from "react-native";
import { BottomSheetFlatList } from "@gorhom/bottom-sheet";
import { Feather } from "@expo/vector-icons";
import ImageComment from "./ImageComment";

import useUser from '../hooks/useUser';
import axios from "axios"
import { apiUrl } from "../../constants";




const ImageComments = ({ id_post, user }) => {
    const [newComment, setNewComment] = useState("");
    const [loading, setLoading] = useState(true)
    //const [comments, setComments] = useState("");

    const [commentsPost, setCommentsPost] = useState([])

    const windowWidth = Dimensions.get('window').width;
    const windowHeight = Dimensions.get('window').height;

    //const apiUrl = process.env.HOST;


    useEffect(() => {
        const loadComments = async () => {
            try {
                const response = await axios.get(`http://${apiUrl}/comments/${id_post}`);
                setCommentsPost(response.data)
                setLoading(false)

            } catch (error) {
                console.log("Error", error);
            }
        }

        loadComments()
    }, [])

    const sendComment = async () => {

        const body = {
            comment: newComment,
        }

        var data = ""
        try {
            const response = await fetch(`http://${apiUrl}/comments/${id_post}/${user.id_user}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(body)
            });

            data = await response.json();

            const commentPostPush = commentsPost.push({
                uri_image_profile: user.uri_image_profile,
                username: user.name,
                comment: newComment,
                fecha_comment: "2023-09-01T04:00:00.000Z"
            })

            //console.log("commentPush", commentsPost)
            setCommentsPost(commentsPost)
            setNewComment("")

        } catch (error) {
            console.error(error);
        }
    };

    return (
        <View style={{ backgroundColor: "#fff", flex: 1 }}>
            <Text style={{ fontSize: 15, alignSelf: 'center', marginVertical: 10, color: 'black' }}> Comentarios </Text>
            <View style={{ width: windowWidth, borderStyle: 'dotted', borderWidth: 0.7, borderColor: '#ccc' }}></View>

            {loading ?
                <ActivityIndicator size="large" color="#000000" style={{paddingTop: 30}}/>
                :
                <View style={{ flex: 1 }}>
                    <BottomSheetFlatList
                        data={commentsPost}
                        renderItem={({ item }) => <ImageComment comment={item} />}
                    />

                    <View style={{ width: windowWidth, borderWidth: 0.3, borderColor: 'gray', marginBottom: 1 }} />

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
            }
        </View>
    );
};

export default ImageComments;
