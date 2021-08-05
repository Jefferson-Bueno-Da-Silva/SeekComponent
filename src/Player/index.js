import React, {useState, useRef} from 'react';
import {View, Text, StyleSheet} from 'react-native';

import AlbumArt from '../AlbumArt';
import SeekBar from '../SeekBar';
import Controls from '../Controls';
import TrackDetails from '../TrackDetails';

import Video from 'react-native-video';

const Player = () => {
  const audioElement = useRef();

  const [paused, setPaused] = useState(true);
  const [totalLength, setTotalLength] = useState(1);
  const [currentPosition, setCurrentPosition] = useState(0);
  const [isChanging, setIsChanging] = useState(false);

  const setDuration = data => {
    setTotalLength(Math.floor(data.duration));
  };

  const setTime = data => {
    setCurrentPosition(Math.floor(data.currentTime));
  };

  const seek = time => {
    time = Math.round(time);
    audioElement.current && audioElement.current.seek(time);
    setPaused(false);
    setCurrentPosition(time);
  };

  const loadStart = () => {};
  const onEnd = () => {};
  const videoError = () => {};

  const track = "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3";

  return (
    <View style={styles.container}>
      <Controls
        onPressPlay={() => setPaused(false)}
        onPressPause={() => setPaused(true)}
        paused={paused}
      />

      <SeekBar
        onSeek={seek.bind(this)}
        trackLength={totalLength}
        onSlidingStart={() => setPaused(true)}
        currentPosition={currentPosition}
      />

      {isChanging ? null : (
        <Video
          source={{uri: track}} // Can be a URL or a local file.
          ref={audioElement}
          playInBackground={true}
          playWhenInactive={true}
          paused={paused} // Pauses playback entirely.
          resizeMode="cover" // Fill the whole screen at aspect ratio.
          repeat={true} // Repeat forever.
          onLoadStart={loadStart} // Callback when video starts to load
          onLoad={setDuration.bind(this)} // Callback when video loads
          onProgress={setTime.bind(this)} // Callback every ~250ms with currentTime
          onEnd={onEnd} // Callback when playback finishes
          onError={videoError} // Callback when video cannot be loaded
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',

    alignItems: 'center',
    justifyContent: 'center',

    backgroundColor: '#ffffff',
  },
});

export default Player;
