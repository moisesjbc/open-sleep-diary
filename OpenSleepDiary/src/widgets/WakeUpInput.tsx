import React from "react";
import { Text, StyleSheet, View, TextInput, Button, TextInputFocusEventData, NativeSyntheticEvent } from "react-native";
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
    width: 200,
    borderWidth: 1,
    padding: 2
  }
});

export type WakeUpProps = {
  value: {time?: string, note?: string},
  onBlur: (e: NativeSyntheticEvent<TextInputFocusEventData>) => void,
  onChange: Function
}

export default function WakeUpInput(props: WakeUpProps) {
  const {value = {}, onBlur, onChange} = props;
  const {time, note} = value;

  return (
    <View style={styles.container}>
      <TimeInput
        time={time || ""}
        label="Time"
        onBlur={onBlur}
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
