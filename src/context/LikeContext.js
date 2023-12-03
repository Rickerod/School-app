// LikeContext.js
import React, { createContext, useContext, useState } from 'react';

const LikeContext = createContext();

export const LikeProvider = ({ children }) => {
  const [likes, setLikes] = useState({});
  const [numLikes, setNumLikes] = useState({})

  const toggleLike = async (postId) => {
    setLikes((prevLikes) => ({
      ...prevLikes,
      [postId]: !prevLikes[postId],
    }));

  };

  const toggleNumLikes = async (postId, is_like) => {

    if (is_like) {
      setNumLikes((prevNumLikes) => ({
        ...prevNumLikes,
        [postId]: prevNumLikes[postId] + 1,
      }));
    } else {
      setNumLikes((prevNumLikes) => ({
        ...prevNumLikes,
        [postId]: prevNumLikes[postId] - 1,
      }));
    }

  };


  const initializeLike = (likesJson, numLikes) => {
    setLikes(likesJson)
    setNumLikes(numLikes)
  }

  return (
    <LikeContext.Provider value={{ likes, numLikes, toggleLike, toggleNumLikes, initializeLike }}>
      {children}
    </LikeContext.Provider>
  );
};

export const useLike = () => {
  return useContext(LikeContext);
};