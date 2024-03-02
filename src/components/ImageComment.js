import React, { useState, useEffect } from "react";
import { View, Text, Image } from "react-native";
//import { Comment, User } from "../../src/models";
import { Ionicons } from '@expo/vector-icons'
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
  MenuProvider
} from 'react-native-popup-menu';
import Feather from 'react-native-vector-icons/Feather';
import Octicons from 'react-native-vector-icons/Octicons';
import { apiUrl } from "../../constants";
import useUser from "../hooks/useUser";


const ImageComment = ({ comment, user, reloading}) => {

  const removeComment = async () => {
    const id_comment = comment.id_comment
    const body = {
      id_comment: id_comment,
    }

    try {
      const response = await fetch(`http://${apiUrl}/comments/removeComment`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
      });

      const data = await response.json();

    } catch (e) {
      console.log("ERROR: ", e)
    } finally {
      reloading(prev => !prev)
    }

  }
  
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginHorizontal: 10,
        marginBottom: 10,
      }}>
      <View
        style={{ flexDirection: "row", alignItems: "center", marginVertical: 10, paddingLeft: 5 }}
      >
        <Image
          style={{ width: 35, height: 35, borderRadius: 20 }}
          source={{ uri: comment.uri_image_profile }}
        />
        <View>
          <Text style={{ color: "gray", marginLeft: 10 }}>{comment.username}</Text>
          <Text style={{ color: "black", marginLeft: 10 }}>
            {comment.comment}
          </Text>
        </View>
      </View>
      <View style={{ alignItems: "center" }}>
        {
           user.type_user == 1 &&
          <Menu>
            <MenuTrigger>
              <Feather name="more-vertical" style={{ fontSize: 20 }} />
            </MenuTrigger>
            <MenuOptions style={{ padding: 5 }}>
              <MenuOption onSelect={() => removeComment()} >
                <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                  <Octicons name="trash" style={{ fontSize: 20, color: 'red', paddingRight: 5 }}></Octicons>
                  <Text style={{ color: 'red', fontSize: 16 }}> Eliminar </Text>
                </View>
              </MenuOption>
            </MenuOptions>
          </Menu>
        }
      </View>

    </View>
  );
};

export default ImageComment;
