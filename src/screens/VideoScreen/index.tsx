/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useRef } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import Video from 'react-native-video';
import AppProgressBar from '../../components/AppProgressBar';
import {useState} from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import {useEffect} from 'react';
import QuestionPopup from '../../components/QuestionPopup';
import RequestAnswerPopup from '../../components/RequestAnswerPopup';
import AnswerProgressPopup from '../../components/AnswerProgressPopup';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../navigation/types';
import RightAnswerPopup from '../../components/RightAnswerPopup';
import WrongAnswerPopup from '../../components/WrongAnswerPopup';
import AudioRecorderPlayer from 'react-native-audio-recorder-player';

const audioRecorderPlayer = new AudioRecorderPlayer();

type Props = NativeStackScreenProps<RootStackParamList, 'Video'>;

export const VideoScreen: React.FC<Props> = props => {
  const isDarkMode = useColorScheme() === 'dark';
  const videoEl = useRef<any>(null);

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    width: '100%',
    height: '100%',
  };

  const [videoProgress, setVideoProgress] = useState(0);
  const [videoDuration, setVideoDuration] = useState(0);
  const [questionPopupVisible, setQuestionPopupVisible] = useState(false);
  const [requestAnswerPopupVisible, setRequestAnswerQuestionPopupVisible] =
    useState(false);
  const [answerProgressPopupVisible, setAnswerProgressPopupVisible] =
    useState(false);
    const [rightAnswerPopupVisible, setRightAnswerPopupVisible] =
    useState(false);
    const [wrongAnswerPopupVisible, setWrongAnswerPopupVisible] =
    useState(false);
  const [videoPaused, setVideoPaused] = useState(true);

  useEffect(() => {
    
  }, []);

  const onRecord = () => {
    setRequestAnswerQuestionPopupVisible(false);
    setAnswerProgressPopupVisible(true);
    onStartRecord();
  };

  const onAnswerFinish = () => {
    onStopRecord();
    // call api here
    setTimeout(() => {
        setVideoPaused(false);
        setAnswerProgressPopupVisible(false);
        setRightAnswerPopupVisible(true);
    }, 3000);
  }

  const onRightAnswerNext = () => {
    setRightAnswerPopupVisible(false);
    setWrongAnswerPopupVisible(true);
  }

  const onStartRecord = async () => {
    const result = await audioRecorderPlayer.startRecorder();
    audioRecorderPlayer.addRecordBackListener((e) => {
        return;
      });
    console.log('onStartRecord: ' + JSON.stringify(result));
  };
  
  const onStopRecord = async () => {
    const result = await audioRecorderPlayer.stopRecorder();
    audioRecorderPlayer.removeRecordBackListener();
    console.log('onStopRecord: ' + JSON.stringify(result));
  };

  const handleLoadedMetadata = (props: any) => {
    setVideoDuration(props.duration);
    setVideoPaused(false);
    setTimeout(() => {
      setQuestionPopupVisible(true);
    }, 3000);
    setTimeout(() => {
      setQuestionPopupVisible(false);
      setRequestAnswerQuestionPopupVisible(true);
      setVideoPaused(true);
    }, 7000);
  };

  return (
    <View style={backgroundStyle}>
      <Video
        style={styles.video}
        source={require('../../videos/demo_video.mov')}
        ref={videoEl} 
        onLoad={handleLoadedMetadata}
        resizeMode="cover"
        onProgress={(params: {
          currentTime: number;
          playableDuration: number;
        }) => {
            if(videoDuration){
                const currentProgress =
                (params.currentTime / videoDuration) * 100;
                setVideoProgress(currentProgress);
            }
          
        }}
        paused={videoPaused}
      />
      <SafeAreaView style={styles.videoOverlay}>
        <View style={styles.headerTool}>
          <Icon name="close" size={22} color="#000" />
          <AppProgressBar
            progress={videoProgress}
            style={{
              height: 5,
              marginLeft: 20,
              marginRight: 20,
              flex: 1,
            }}
          />
          <Icon name="ellipsis-horizontal" size={22} color="#000" />
        </View>
        <QuestionPopup
          visible={questionPopupVisible}
          style={styles.questionPopup}
          title={'Hola, ¿cómo están tú y tu familia estos días?'}
          content={'Hi, how are you and your family these days?'}
        />
      </SafeAreaView>
      <View style={styles.viewOverlayBottom}>
        {requestAnswerPopupVisible && (
          <RequestAnswerPopup
            visible={requestAnswerPopupVisible}
            style={styles.questionPopup}
            onRecord={onRecord}
            title="La estamos haciendo muy bien."
            content="We are doing very well"
          />
        )}
        {answerProgressPopupVisible && (
          <AnswerProgressPopup
            visible={answerProgressPopupVisible}
            style={styles.questionPopup}
            title="La estamos haciendo muy bien."
            onFinish={onAnswerFinish}
          />
        )}
        {rightAnswerPopupVisible && (
            <RightAnswerPopup
                onNext={onRightAnswerNext}
                visible={rightAnswerPopupVisible}
                style={styles.questionPopup}
                title="La estamos haciendo muy bien."
            />
        )}
        {wrongAnswerPopupVisible && (
            <WrongAnswerPopup
                visible={wrongAnswerPopupVisible}
                style={styles.questionPopup}
                title="Estamos muy ocupados estos días. Pero me encanta"
            />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  video: {
    width: '100%',
    height: '100%',
  },
  videoOverlay: {
    position: 'absolute',
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
  },
  viewOverlayBottom: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: 380,
  },
  headerTool: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    paddingHorizontal: 20,
    marginTop: 10,
  },
  questionPopup: {
    marginHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});
