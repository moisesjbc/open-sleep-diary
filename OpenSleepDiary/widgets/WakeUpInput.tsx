import React, { useState } from "react";
import { Text, StyleSheet, View, TextInput, Button } from "react-native";
import TimeInput from "./TimeInput"

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row'
  },
  input: {
    borderWidth: 1,
    padding: 2
  },
  noteInput: {
    minWidth: 200,
    borderWidth: 1,
    padding: 2
  }
});

export default function WakeUpInput(props) {
  const {data = {}, onBlur, onChange} = props;
  const {time, note} = data;

  return (
    <View style={styles.container}>
      <TimeInput
        time={time}
        label="Time"
        onChange={(value) => onChange({time: value, note})} />
      <Text>Note: </Text>
      <TextInput
        style={styles.noteInput}
        value={note}
        onBlur={onBlur}
        onChangeText={(value) => onChange({time, note: value})} />
    </View>
  );
}
