import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StatusBar } from 'expo-status-bar';
import { Timer } from './src/features/timer/Timer';
import { Focus } from './src/features/focus/Focus';
import { FocusHistory } from './src/features/focus/FocusHistory';

import { colour } from './src/utils/colour';
import { uuidv4 } from './src/utils/uuid';

export default function App() {
  const [focusSubject, setFocusSubject] = useState(null);
  const [focusHistory, setFocusHistory] = useState([]);

  const saveFocusHistory = async () => {
    try {
      AsyncStorage.setItem('focusHistory', JSON.stringify(focusHistory));
    } catch (e) {
      console.log(e);
    }
  };

  const loadFocusHistory = async () => {
    try {
      const history = await AsyncStorage.getItem('focusHistory');

      if (history && JSON.parse(history).length) {
        setFocusHistory(JSON.parse(history));
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    loadFocusHistory();
  }, []);

  useEffect(() => {
    saveFocusHistory();
  }, [focusHistory]);

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      {focusSubject ? (
        <Timer
          subject={focusSubject}
          clearSubject={() => {
            setFocusHistory([
              ...focusHistory,
              { subject: focusSubject, status: 0, key: uuidv4() },
            ]);
            setFocusSubject(null);
          }}
          onTimerEnd={() => {
            setFocusHistory([
              ...focusHistory,
              { subject: focusSubject, status: 1, key: uuidv4() },
            ]);
            setFocusSubject(null);
          }}
        />
      ) : (
        <View style={styles.focusContainer}>
          <Focus focusHistory={focusHistory} addSubject={setFocusSubject} />
          <FocusHistory
            focusHistory={focusHistory}
            setFocusHistory={setFocusHistory}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  focusContainer: {
    flex: 1,
    backgroundColor: colour.gunmetal,
    color: colour.deep_sea,
  },
});
