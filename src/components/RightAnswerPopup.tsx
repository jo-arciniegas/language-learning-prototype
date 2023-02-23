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

export interface RightAnswerPopupPropTypes {
  style?: StyleProp<ViewStyle> | undefined;
  title: string;
  visible?: boolean;
  onNext?: () => void;
}

const RightAnswerPopup = (props: RightAnswerPopupPropTypes) => {
  return (
    <FadeAnimView visible={props.visible || false}>
      <LinearGradient
        start={{x: 0, y: 1}}
        end={{x: 0, y: 0}}
        style={styles.fullSize}
        colors={['#06BB37', '#1CD35499', '#00000000']}>
        <View style={[props.style, styles.container]}>
          <View style={styles.rowReverse}>
            <Icon name="bookmark-outline" size={16} color="#CBCBCB" />
          </View>
          <Text style={styles.wellDone}>WELL DONE!</Text>
          <View style={styles.titleContainer}>
            <View style={styles.titleBg}>
              <Text style={styles.header}> {props.title} </Text>
            </View>
          </View>
        </View>
        <View style={styles.checkContainer}>
          <View style={styles.check}>
            <Icon
              style={styles.iconCheck}
              name="checkmark-circle"
              color="#4AD118"
              size={52}
            />
          </View>
        </View>
        <View style={styles.bottom}>
          <TouchableOpacity
            onPress={props.onNext}
            style={styles.bottomBtn}>
            <Text
              style={styles.btnText}>
              CONTINUE
            </Text>
          </TouchableOpacity>
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
  bottom: {width: '100%', marginTop: 20, paddingHorizontal: 20},
  bottomBtn: {
    width: '100%',
    height: 50,
    justifyContent: 'center',
    borderRadius: 12,
    alignItems: 'center',
    backgroundColor: '#4AD118',
  },
  btnText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '700',
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
    padding: 5,
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
    backgroundColor: '#05AA1F24',
    color: '#05AA1F',
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

export default RightAnswerPopup;
