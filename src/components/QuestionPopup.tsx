import React, {useEffect, useRef, useState} from 'react';
import {View, StyleSheet, Animated, StyleProp, ViewStyle, Text} from 'react-native';
import FadeAnimView from './FadeAnimView';

export interface QuestionPopupPropTypes {
    style?: StyleProp<ViewStyle> | undefined;
    title: string;
    content: string;
    visible?: boolean;
}

const QuestionPopup = (props: QuestionPopupPropTypes) => {
    return (
        <FadeAnimView visible={props.visible || false}>
            <View style={[props.style, styles.container]}>
                <Text style={styles.header}>{props.title}</Text>
                <Text style={styles.content}>{props.content}</Text>
            </View>
        </FadeAnimView>
    );
}

const styles = StyleSheet.create({
    container: {
        marginTop: 60,
        backgroundColor: '#000',
        padding: 20,
        borderRadius: 8,
    },
    header: {
        color: '#fff',
        fontStyle: 'normal',
        fontWeight: "500",
        fontSize: 18,
        textAlign: 'center',
    },
    content: {
        color: '#ffffff80',
        fontStyle: 'normal',
        fontWeight: "400",
        fontSize: 13,
        marginTop: 10,
        textAlign: 'center',
    }

});

export default QuestionPopup;