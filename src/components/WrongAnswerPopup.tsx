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
import LinearGradient from 'react-native-linear-gradient';
import ReTrySvg from '../svg/ReTrySvg';
import WaveSvg from '../svg/WaveSvg';

export interface WrongAnswerPopupPropTypes {
  style?: StyleProp<ViewStyle> | undefined;
  title: string;
  visible?: boolean;
}

const WrongAnswerPopup = (props: WrongAnswerPopupPropTypes) => {
  return (
    <FadeAnimView visible={props.visible || false}>
      <LinearGradient
        start={{x: 0, y: 1}}
        end={{x: 0, y: 0}}
        style={styles.fullSize}
        colors={['#EA854F', '#EA854F99', '#00000000']}>
        <View style={[props.style, styles.container]}>
          <View style={styles.row}>
            <Icon name="bookmark-outline" size={16} color="#FFFFFF00" />
            <Text style={styles.tryAgain}>LET’S TRY AGAIN</Text>
            <Icon name="bookmark-outline" size={16} color="#CBCBCB" />
          </View>
          <View style={styles.titleContainer}>
            <View style={{marginTop: 4}}>
              <Icon name="volume-low" size={22} color="#4F55EA" />
            </View>
            <View style={styles.titleBg}>
              <Text style={styles.header}> {props.title} </Text>
            </View>
            <View style={{width: 4}}></View>
          </View>
          <View
            style={styles.yourAnswerContainer}>
            <TouchableOpacity
              style={styles.yourAnswerBtn}>
              <View style={[styles.row]}>
                <Text
                  style={styles.yourAnswerText}>
                  YOUR ANSWER
                </Text>
                <WaveSvg />
              </View>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.bottom}>
          <TouchableOpacity style={styles.button}>
            <View style={styles.row}>
              <ReTrySvg />
              <Text style={styles.buttonText}>TRY AGAIN</Text>
            </View>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    </FadeAnimView>
  );
};

const styles = StyleSheet.create({
  yourAnswerText: {
    color: '#4F55EA',
    marginRight: 5,
    fontWeight: '600',
    fontSize: 12,
  },
  yourAnswerBtn: {
    borderWidth: 2,
    paddingVertical: 7,
    paddingHorizontal: 16,
    height: 34,
    borderRadius: 17,
    borderColor: '#00000019',
  },
  yourAnswerContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginBottom: 15,
  },
  button: {
    width: '100%',
    height: 50,
    justifyContent: 'center',
    borderRadius: 12,
    alignItems: 'center',
    backgroundColor: '#4F55EA',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '700',
    marginLeft: 10,
  },
  bottom: {width: '100%', marginTop: 20, paddingHorizontal: 20},
  tryAgain: {
    flex: 1,
    textAlign: 'center',
    color: '#000000AA',
    fontSize: 12,
    fontWeight: '700',
    marginTop: 10,
  },
  container: {
    marginTop: 90,
    backgroundColor: '#fff',
    padding: 9,
    borderRadius: 8,
  },
  titleContainer: {
    marginTop: 20,
    marginBottom: 25,
    paddingHorizontal: 10,
    flexDirection: 'row',
  },
  iconCheck: {marginLeft: 3},
  fullSize: {width: '100%', height: '100%'},
  rowReverse: {flexDirection: 'row-reverse'},
  row: {flexDirection: 'row', justifyContent: 'center', alignItems: 'center'},
  checkContainer: {
    width: '100%',
    alignItems: 'center',
    position: 'absolute',
    left: 0,
    top: 90,
    right: 0,
  },
  titleBg: {
    flex: 1,
    marginLeft: 2,
    borderRadius: 8,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  check: {
    width: 60,
    height: 60,
    backgroundColor: 'white',
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
  },
  wellDone: {
    color: '#05AA1F',
    fontSize: 18,
    fontWeight: '700',
    textAlign: 'center',
    marginTop: 10,
  },
  header: {
    backgroundColor: '#DB6B1824',
    color: '#DB6B18',
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: 16,
    textAlign: 'center',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 8,
    lineHeight: 24,
    overflow: 'hidden',
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

export default WrongAnswerPopup;
