import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet } from 'react-native';
// import { useFonts } from 'expo-font';
import { useFonts, Bangers_400Regular  } from '@expo-google-fonts/bangers';

import { fontSizes, paddingSizes } from '../utils/sizes';
import { colour } from '../utils/colour';

const minutesToMillis = (min) => min * 1000 * 60;
const formatTime = (time) => (time < 10 ? `0${time}` : time);

export const Countdown = ({
  minutes = 20,
  isPaused,
  onStart = () => {},
  onPause = () => {},
  onEnd = () => {},
  onProgress = () => {},
}) => {
  const [millis, setMillis] = useState(minutesToMillis(minutes));
  const interval = React.useRef(null);
  let [fontsLoaded] = useFonts({ Bangers_400Regular });

  const countDown = () =>
    setMillis((time) => {
      if (time === 0) {
        clearInterval(interval.current);
        onEnd();
        return time;
      }
      const timeLeft = time - 1000;
      onProgress((timeLeft / minutesToMillis(minutes)) * 100);
      return timeLeft;
    });

  useEffect(() => {
    setMillis(minutesToMillis(minutes));
  }, [minutes]);

  useEffect(() => {
    if (isPaused) {
      onPause();
      if (interval.current) clearInterval(interval.current);
      return;
    }
    onStart();
    interval.current = setInterval(countDown, 1000);

    return () => clearInterval(interval.current);
  }, [isPaused]);

  const minute = Math.floor(millis / 1000 / 60) % 60;
  const seconds = Math.floor(millis / 1000) % 60;

  if (!fontsLoaded) {
    return <Text>'please wait'</Text>;
  } else {
    return (
      <Text style={styles.text}>
        {formatTime(minute)}:{formatTime(seconds)}
      </Text>
    );
  }
};

const styles = StyleSheet.create({
  text: {
    fontSize: fontSizes.xxxl,
    fontWeight: 'bold',
    color: '#fff',
    padding: paddingSizes.lg,
    backgroundColor: colour.bright_grey,
    fontFamily: 'Bangers_400Regular',
  },
});
