import React, {
  forwardRef,
  useEffect,
  useRef,
  useState,
  useImperativeHandle,
} from 'react';
import {
  View,
  StyleSheet,
  Animated,
  StyleProp,
  ViewStyle,
  Text,
  TouchableOpacity,
  TextStyle,
  ColorValue,
} from 'react-native';
import FadeAnimView from './FadeAnimView';
import Icon from 'react-native-vector-icons/Ionicons';
import AudioSvg from '../svg/AudioSvg';
import LinearGradient from 'react-native-linear-gradient';

export interface TextAnimatorPropTypes {
  content: string;
  onFinish?: () => void;
  style?: StyleProp<ViewStyle> | undefined;
  textStyle?: StyleProp<TextStyle> | undefined;
  duration?: number;
  overlayTextColor?: string | undefined;
  textColor?: string | undefined;
}

const DEFAULT_TIME_DURATION = 600;
const DEFAULT_OVERLAY_TEXT_COLOR = '#2E35D6';
const DEFAULT_TEXT_COLOR = '#808080';

const TextAnimator = (props: TextAnimatorPropTypes) => {
  const [textArr, setTextArr] = useState<string[]>([]);
  const animatedValuesRef = useRef<Animated.Value[]>([]);
  const animatedValuesMapsRef = useRef<any[]>([]);
  const animationsRef = useRef<any[]>([]);

  const textColor = props.textColor || DEFAULT_TEXT_COLOR;
  const overlayTextColor = props.overlayTextColor || DEFAULT_OVERLAY_TEXT_COLOR;

  useEffect(() => {
    animationsRef.current = [];
    animatedValuesRef.current = [];
    animatedValuesMapsRef.current = [];
    const textArr = props.content.trim().split(' ');
    textArr.forEach((_, i) => {
      animatedValuesRef.current[i] = new Animated.Value(0);
      animatedValuesMapsRef.current[i] = animatedValuesRef.current[
        i
      ].interpolate({
        inputRange: [0, 1],
        outputRange: [textColor, overlayTextColor],
      });
    });
    setTextArr(textArr);
  }, [props.content, props.textColor, props.overlayTextColor]);

  useEffect(() => {
    onAnimate(1);
  }, [textArr]);

  const onAnimate = (toValue = 1) => {
    const duration = props.duration || DEFAULT_TIME_DURATION;
    animationsRef.current = textArr.map((_, i) => {
      return Animated.timing(animatedValuesRef.current[i], {
        toValue,
        duration: duration,
        useNativeDriver: false,
      });
    });
    Animated.stagger(300, animationsRef.current).start(finished => {
      // setTimeout(() => onAnimate(toValue === 0 ? 1 : 0), 1000)
      if (finished) {
        props.onFinish?.();
      }
    });
  };

  return (
    <View style={[props.style, styles.textContainer]}>
      {textArr.map((v, i) => {
        return (
          <Animated.Text
            key={`${v}-${i}`}
            style={[
              props.textStyle,
              {
                color: animatedValuesMapsRef.current[i],
              },
            ]}>
            {v}
            {`${i < textArr.length ? ' ' : ''}`}
          </Animated.Text>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  textWrapper: {
    color: '#000',
  },
  textContainer: {
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
});

export default TextAnimator;
