import React, {useEffect, useRef, useState} from 'react';
import {View, StyleSheet, Animated, StyleProp, ViewStyle} from 'react-native';

export interface AppProgressBarPropTypes {
  style?: StyleProp<ViewStyle> | undefined;
  progress: number,
}

const AppProgressBar = (props: AppProgressBarPropTypes) => {
  const countInterval = useRef<number | null>(null);

  const loaderValue = useRef(new Animated.Value(0)).current;
  const load = (count: number) => {
    Animated.timing(loaderValue, {
      toValue: count > 100 ? 100 : count, //final value
      duration: 500, //update value in 500 milliseconds
      useNativeDriver: true,
    }).start();
  };

  useEffect(() => {
    load(props.progress || 0);
  }, [props.progress]);

  const widthScaleProgress = loaderValue.interpolate({
    inputRange: [0, 100],
    outputRange: ['0%', '100%'],
    extrapolate: 'clamp',
  });

  const progress = props.progress || 0;
  return (
    <View {...props} style={[props.style, styles.progressBar]}>
      <Animated.View
        style={[
          StyleSheet.absoluteFill,
          {backgroundColor: '#4F55EA', width: progress === 0 ? 0 : '2%'},
          progress > 0 && {
            transform: [
              {
                scaleX: widthScaleProgress,
              },
            ],
          },
        ]}></Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  progressBar: {
    overflow: 'hidden',
    flexDirection: 'row',
    backgroundColor: '#70707038',
    borderRadius: 5,
  },
});

export default AppProgressBar;
