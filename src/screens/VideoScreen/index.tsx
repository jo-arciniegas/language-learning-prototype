/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useRef } from 'react';
import {
  Platform,
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
import CourseService from '../../services/course';
import QaService from '../../services/qa';
import { useSelector } from 'react-redux';
import { RootState } from '../../models/store';
var RNFetchBlob = require('rn-fetch-blob').default

const audioRecorderPlayer = new AudioRecorderPlayer();

type Props = NativeStackScreenProps<RootStackParamList, 'Video'>;



export const VideoScreen: React.FC<Props> = props => {
  const isDarkMode = useColorScheme() === 'dark';
  const videoEl = useRef<any>(null);

  const dirs = useRef(RNFetchBlob.fs.dirs).current;

  const path = useRef(Platform.select({
    ios: 'awnser_audio.m4a',
    android: `${dirs.CacheDir}/awnser_audio.mp3`,
  })).current;

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    width: '100%',
    height: '100%',
  };
  const qaIndexRef = useRef<number>(-1);
  const [qa, setQa] = useState<any>(null);
  const [rightAnswer, setRightAnswer] = useState<any>(null);
  const [wrongAnswer, setWrongAnswer] = useState<any>(null);
  const currentAnswerAudioPathRef = useRef<string|null>(null);


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

  const listQa = useSelector((state: RootState) => state.qa.data);

  useEffect(() => {
    if(listQa.length > 0){
      qaIndexRef.current = 0;
    }
  }, [listQa]);

  useEffect(() => {
    if(qaIndexRef.current < listQa.length && qaIndexRef.current > -1) {
      const selectedQa = listQa[qaIndexRef.current];
      setQa(selectedQa);
      onStartingShowQa();
    }
    else {
      setQa(null);
      onHideAllPopup();
    }
  }, [qaIndexRef.current]);

  useEffect(() => {
    if(qa){
      const rightAs = qa.attributes?.answer?.find((ele: any) => ele.isCorrect === true);
      const wrongAs = qa.attributes?.answer?.find((ele: any) => ele.isCorrect === false);
      setRightAnswer(rightAs);
      setWrongAnswer(wrongAs);
    } 
    else{
      setRightAnswer(null);
      setWrongAnswer(null);
    }
  }, [qa]);

  const onRecord = () => {
    setRequestAnswerQuestionPopupVisible(false);
    setAnswerProgressPopupVisible(true);
    onStartRecord();
    setTimeout(() => {
      onAnswerFinish();
    }, 3000)
  };

  const onAnswerFinish = () => {
    onStopRecord();
    // call api here
    setTimeout(() => {
        setAnswerProgressPopupVisible(false);
        if(Math.floor(Math.random() * 10) < 50){
          setRightAnswerPopupVisible(true);
        }
        else {
          setWrongAnswerPopupVisible(true);
        }
    }, 3000);
  }

  const onRightAnswerNext = () => {
    setVideoPaused(false);
    // setRightAnswerPopupVisible(false);
    //setQa(null)
    qaIndexRef.current += 1;
  }

  const onTryAgain = () => {
    setRequestAnswerQuestionPopupVisible(true);
    setWrongAnswerPopupVisible(false);
  }

  const onStartRecord = async () => {
    const result = await audioRecorderPlayer.startRecorder(path);
    audioRecorderPlayer.addRecordBackListener((e) => {
        return;
      });
    console.log('onStartRecord: ' + JSON.stringify(result));
  };
  
  const onStopRecord = async () => {
    const result = await audioRecorderPlayer.stopRecorder();
    audioRecorderPlayer.removeRecordBackListener();
    console.log('onStopRecord: ' + result);
    currentAnswerAudioPathRef.current = result;
  };

  const onListenAgain = async () => {
    const msg = await audioRecorderPlayer.startPlayer(path);
    console.log('onListenAgain: ' + msg);
  }

  const handleLoadedMetadata = (props: any) => {
    setVideoDuration(props.duration);
    setVideoPaused(false);
  };

  const onHideAllPopup = () => {
    setAnswerProgressPopupVisible(false)
    setRightAnswerPopupVisible(false)
    setWrongAnswerPopupVisible(false)
    setQuestionPopupVisible(false);
    setRequestAnswerQuestionPopupVisible(false);
  }

  const onStartingShowQa = () => {
    setAnswerProgressPopupVisible(false)
    setRightAnswerPopupVisible(false)
    setWrongAnswerPopupVisible(false)
    setTimeout(() => {
      setQuestionPopupVisible(true);
    }, 3000);
    setTimeout(() => {
      setQuestionPopupVisible(false);
      setRequestAnswerQuestionPopupVisible(true);
      setVideoPaused(true);
    }, 7000);
  }

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
          title={qa?.attributes?.question || ''}
          content={'Hi, how are you and your family these days?'}
        />
      </SafeAreaView>
      <View style={styles.viewOverlayBottom}>
        {requestAnswerPopupVisible && (
          <RequestAnswerPopup
            visible={requestAnswerPopupVisible}
            style={styles.questionPopup}
            onRecord={onRecord}
            title={rightAnswer?.answer || ''}
            content="We are doing very well"
          />
        )}
        <AnswerProgressPopup
            visible={answerProgressPopupVisible}
            style={styles.questionPopup}
            title={rightAnswer?.answer || ''}
          />
        <RightAnswerPopup
                onNext={onRightAnswerNext}
                visible={rightAnswerPopupVisible}
                style={styles.questionPopup}
                title={rightAnswer?.answer || ''}
            />
        <WrongAnswerPopup
                onTryAgain={onTryAgain}
                onListenAgain={onListenAgain}
                visible={wrongAnswerPopupVisible}
                style={styles.questionPopup}
                title={wrongAnswer?.answer || ''}
            />
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
