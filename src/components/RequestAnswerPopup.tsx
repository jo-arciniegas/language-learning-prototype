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

export interface RequestAnswerPopupPropTypes {
  style?: StyleProp<ViewStyle> | undefined;
  title: string;
  content: string;
  visible?: boolean;
  onRecord?: () => void | null;
}

const RequestAnswerPopup = (props: RequestAnswerPopupPropTypes) => {
  return (
    <FadeAnimView visible={props.visible || false}>
      <View style={[props.style, styles.container]}>
        <View style={{flexDirection: 'row-reverse'}}>
          <Icon name="bookmark-outline" size={16} color="#CBCBCB" />
        </View>
        <View
          style={{
            marginTop: 10,
            marginBottom: 40,
            paddingHorizontal: 10,
            flexDirection: 'row',
          }}>
          <View>
            <Icon name="volume-low" size={22} color="#4F55EA" />
          </View>
          <View style={{flex: 1}}>
            <Text style={styles.header}>{props.title}</Text>
            <Text style={styles.content}>{props.content}</Text>
          </View>
          <View style={{width: 4}}></View>
        </View>
      </View>
      <View style={{width: '100%', alignItems: 'center', marginTop: -30}}>
        <TouchableOpacity
          onPress={props.onRecord}  
          style={{
            width: 60,
            height: 60,
            padding: 5,
            backgroundColor: '#4F55EA',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 14,
          }}>
          <Icon name="mic" size={32} color="#fff" />
        </TouchableOpacity>
      </View>
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
    color: '#000',
    fontStyle: 'normal',
    fontWeight: '500',
    fontSize: 18,
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

export default RequestAnswerPopup;
