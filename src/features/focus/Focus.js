import React, { useState } from 'react';
import { TextInput } from 'react-native-paper';
import { Text, View, StyleSheet, FlatList, SafeAreaView } from 'react-native';

import { RoundedButton } from '../../components/RoundedButton';
import { fontSizes } from '../../utils/sizes';
import { colour } from '../../utils/colour'

export const Focus = ({ addSubject, focusHistory }) => {
  const [focusItem, setFocusItem] = useState(null);

  return (
    <View style={styles.titleContainer}>
      <Text style={styles.title}>💡 What would you like to focus on?</Text>
      <View style={styles.container}>
        <TextInput
          style={{ flex: 1 }}
          maxLength={50}
          value={focusItem}
          onSubmitEditing={
            ({ nativeEvent: { text } }) => { 
              setFocusItem(text)
              }
            }
        />
        <RoundedButton
          style={styles.addSubject}
          size={50}
          title="+"
          onPress={() => addSubject(focusItem)}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  titleContainer: { flex: 0.5, padding: 16, justifyContent: 'center' },
  title: {
    color: colour.deep_sea,
    fontWeight: 'bold',
    padding: 16,
    paddingLeft: 0,
    fontSize: fontSizes.lg,
  },
  addSubject: { marginLeft: 10, alignSelf: 'center' },
});
