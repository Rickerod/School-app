// LikeContext.js
import React, { createContext, useContext, useState } from 'react';

const LikeContext = createContext();

export const LikeProvider = ({ children }) => {
  const [likes, setLikes] = useState({});

  const toggleLike = async (postId) => {
    setLikes((prevLikes) => ({
      ...prevLikes,
      [postId]: !prevLikes[postId],
    }));
  
  };


  const initializeLike = (likesJson) => {
    setLikes(likesJson)
  }

  return (
    <LikeContext.Provider value={{ likes, toggleLike, initializeLike }}>
      {children}
    </LikeContext.Provider>
  );
};

export const useLike = () => {
  return useContext(LikeContext);
};