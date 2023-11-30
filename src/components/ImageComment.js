import React, { useState, useEffect } from "react";
import { View, Text, Image } from "react-native";
//import { Comment, User } from "../../src/models";


const ImageComment = ({ comment }) => {

  return (
    <View
      style={{ flexDirection: "row", alignItems: "center", marginVertical: 10, paddingLeft: 5 }}
    >
      <Image
        style={{ width: 35, height: 35, borderRadius: 20 }}
        source={{uri: comment.uri_image_profile }}
      />
      <View>
        <Text style={{ color: "gray", marginLeft: 10 }}>{comment.username}</Text>
        <Text style={{ color: "black", marginLeft: 10 }}>
          {comment.comment}
        </Text>
      </View>
    </View>
  );
};

export default ImageComment;
