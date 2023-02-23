import React, {useEffect, useRef, useState} from 'react';
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
  content: string,
  onFinish?: () => void,
  style?: StyleProp<ViewStyle> | undefined;
  textStyle?: StyleProp<TextStyle> | undefined;
  duration?: number;
  overlayTextColor?: ColorValue | undefined;
  textColor?: ColorValue | undefined;

}

const DEFAULT_TIME_DURATION = 600;
const DEFAULT_OVERLAY_TEXT_COLOR = "#2E35D6";
const DEFAULT_TEXT_COLOR = "#808080";

const TextAnimator = (props: TextAnimatorPropTypes) => {
    const [textArr, setTextArr] = useState<string[]>([]);
    const animatedValuesRef = useRef<Animated.Value[]>([]);
    const animationsRef = useRef<any[]>([]);

    useEffect(() => {
        animationsRef.current = [];
        animatedValuesRef.current = [];
        const textArr = props.content.trim().split(' ');
        textArr.forEach((_, i) => {
            animatedValuesRef.current[i] = new Animated.Value(0);
        });
        setTextArr(textArr);
    }, [props.content])

    useEffect(() => {
        onAnimate(1);
    }, [textArr]);


    const onAnimate = (toValue = 1) => {
        const duration = props.duration || DEFAULT_TIME_DURATION;
        animationsRef.current = textArr.map((_, i) => {
          return Animated.timing(animatedValuesRef.current[i], {
              toValue,
              duration: duration,
              useNativeDriver: true
          });
        });
        Animated.stagger(600, animationsRef.current).start((finished) => {
          // setTimeout(() => onAnimate(toValue === 0 ? 1 : 0), 1000)
          if (finished) {
            console.log('animation done');
             // props.onFinish(true);
            
          }
        });
        setTimeout(() => {
             props.onFinish?.();   
        }, duration + (600*textArr.length));
      }

  const textColor = props.textColor || DEFAULT_TEXT_COLOR;
  const overlayTextColor = props.overlayTextColor || DEFAULT_OVERLAY_TEXT_COLOR;

  return (
    <View style={[props.style]}>
        <Text style={[props.textStyle, {color: textColor}]}>{props.content}</Text>
        <View style={styles.textOverlay}>
            {textArr.map((v, i) => {
            return (
                <Animated.Text
                    key={`${v}-${i}`}
                    style={[
                        props.textStyle,
                        {
                            opacity: animatedValuesRef.current[i],
                            color: overlayTextColor
                        },
                    ]}>
                    {v}
                    {`${i < textArr.length ? ' ' : ''}`}
                </Animated.Text>
            );
            })}
        </View>
      </View>
  );
};

const styles = StyleSheet.create({
    textWrapper: {
        color: '#000'
    },
    textOverlay: {
        position: 'absolute',
        left: 0,
        top: 0,
        right: 0,
        bottom: 0,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
    }
});

export default TextAnimator;
