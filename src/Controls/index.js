import React from 'react';
import {View, StyleSheet, Image, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

const Controls = ({paused, onPressPlay, onPressPause}) => (
  <View>
    {!paused ? (
      <TouchableOpacity onPress={onPressPause}>
        <Icon name="pause" size={20} color="#000" />
      </TouchableOpacity>
    ) : (
      <TouchableOpacity onPress={onPressPlay}>
        <Icon name="play" size={20} color="#000" />
      </TouchableOpacity>
    )}
  </View>
);

export default Controls;

const styles = StyleSheet.create({
  container: {},
});
