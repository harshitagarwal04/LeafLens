import React, { useRef, useEffect, useState } from 'react';
import { Animated, View } from 'react-native';

const AnimatedDropdown = ({ visible, children }) => {
  const slideAnim = useRef(new Animated.Value(0)).current;
  const [shouldRender, setShouldRender] = useState(visible);

  useEffect(() => {
    if (visible) setShouldRender(true);

    Animated.timing(slideAnim, {
      toValue: visible ? 1 : 0,
      duration: 250,
      useNativeDriver: true,
    }).start(() => {
      if (!visible) setShouldRender(false);
    });
  }, [visible]);

  if (!shouldRender) return null;

  return (
    <Animated.View
      style={{
        opacity: slideAnim,
        transform: [
          {
            translateY: slideAnim.interpolate({
              inputRange: [0, 1],
              outputRange: [-10, 0],
            }),
          },
        ],
        overflow: 'hidden',
      }}
    >
      {children}
    </Animated.View>
  );
};

export default AnimatedDropdown;