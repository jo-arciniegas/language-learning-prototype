import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  StyleSheet,
  Animated,
  StyleProp,
  ViewStyle,
  Text,
  TouchableOpacity,
} from 'react-native';
import FadeAnimView from './FadeAnimView';
import Icon from 'react-native-vector-icons/Ionicons';
import AudioSvg from '../svg/AudioSvg';
import LinearGradient from 'react-native-linear-gradient';
import TextAnimator from './TextAnimator';

export interface AnswerProgressPopupPropTypes {
  style?: StyleProp<ViewStyle> | undefined;
  title: string;
  visible?: boolean;
  onFinish?: () => void;
}

const AnswerProgressPopup = (props: AnswerProgressPopupPropTypes) => {
  return (
    <FadeAnimView visible={props.visible || false}>
      <LinearGradient
        start={{x: 0, y: 1}}
        end={{x: 0, y: 0}}
        style={{width: '100%', height: '100%'}}
        colors={['#033dfc', '#033dfcAA', '#033dfc55', '#00000000']}>
        <View style={[props.style, styles.container]}>
          <View style={{flexDirection: 'row'}}>
            <Icon name="bookmark-outline" size={16} color="#FFFFFF00" />
            <Text
              style={{
                flex: 1,
                textAlign: 'center',
                color: '#000000AA',
                fontSize: 13,
              }}>
              Speak now...
            </Text>
            <Icon name="bookmark-outline" size={16} color="#CBCBCB" />
          </View>
          <View
            style={{
              marginTop: 20,
              marginBottom: 25,
              paddingHorizontal: 10,
              flexDirection: 'row',
            }}>
            <View style={{flex: 1}}>
              <TextAnimator 
                    duration={3000}
                    textColor="#808080"
                    overlayTextColor="#2E35D6"
                    textStyle={styles.header} 
                    content={props.title}></TextAnimator>
            </View>
          </View>
        </View>
        <View style={{width: '100%', alignItems: 'center', marginTop: 20}}>
          <AudioSvg />
        </View>
      </LinearGradient>
    </FadeAnimView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 120,
    backgroundColor: '#fff',
    padding: 9,
    borderRadius: 8,
  },
  header: {
    color: '#808080',
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: 16,
    textAlign: 'center',
  },
  content: {
    color: '#00000080',
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: 13,
    marginTop: 10,
    textAlign: 'center',
  },
});

export default AnswerProgressPopup;
