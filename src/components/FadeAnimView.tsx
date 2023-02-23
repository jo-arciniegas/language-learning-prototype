import React, { useEffect, useRef } from "react";
import { ViewStyle } from "react-native";
import { Animated } from "react-native";

const DEFAULT_DURATION = 300;

export interface FadeAnimViewProps {
  visible: boolean;
  children?: any;
  duration?: number;
  style?: ViewStyle;
  useNativeDriver?: boolean;
}

const FadeAnimView = ({
  children,
  visible,
  duration = DEFAULT_DURATION,
  style,
  useNativeDriver = true,
}: FadeAnimViewProps) => {
  const fadeAnim = useRef(new Animated.Value(visible ? 1 : 0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: visible ? 1 : 0,
      duration: duration,
      useNativeDriver: useNativeDriver,
    }).start();
  }, [visible]);

  return (
    <Animated.View style={{ ...style, opacity: fadeAnim }}>
      {children}
    </Animated.View>
  );
};

export default FadeAnimView;