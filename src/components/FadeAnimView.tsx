import React, {useEffect, useRef} from 'react';
import {View, ViewStyle} from 'react-native';
import {Animated} from 'react-native';

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
  const [isFinishAnimation, setIsFinishAnimation] = React.useState(true);

  useEffect(() => {
    setIsFinishAnimation(false);
    Animated.timing(fadeAnim, {
      toValue: visible ? 1 : 0,
      duration: duration,
      useNativeDriver: useNativeDriver,
    }).start(finished => {
      if (finished) {
        setIsFinishAnimation(true);
      }
    });
  }, [visible]);

  return (
    <Animated.View
      pointerEvents={visible ? "auto" : "none"}
      style={{...style, opacity: fadeAnim}}>
      {isFinishAnimation && !visible ? (
        <></>
      ) : (
        <View>{children}</View>
      )}
    </Animated.View>
  );
};

export default FadeAnimView;
