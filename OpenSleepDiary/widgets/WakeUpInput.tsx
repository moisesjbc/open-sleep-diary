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
  }
});

export default function WakeUpInput(props) {
  const {time, note, onBlur, onChange} = props;

  return (
    <View style={styles.container}>
      <TimeInput time={time} label="Time" onChange={(value) => onChange({time: value, note})} />
      <Text>Note: </Text>
      <TextInput value={note} onBlur={onBlur} onChangeText={(value) => onChange({time, note: value})} style={styles.input}/>
    </View>
  );
}
