import React from "react";
import { Text, StyleSheet, View, TextInput, NativeSyntheticEvent, TextInputFocusEventData } from "react-native";

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row'
  },
  input: {
    borderWidth: 1,
    padding: 2
  }
});

export type TimeInputProps = {
  time: string,
  label: string,
  onBlur: (e: NativeSyntheticEvent<TextInputFocusEventData>) => void,
  onChange: Function
}

export default function TimeInput(props: TimeInputProps) {
  const {time = "", label, onBlur, onChange} = props;
  const [hours, minutes] = time.split(':')

  const onTimeChange = (hours: string, minutes: string) => {
    if (hours?.length > 0 || minutes?.length > 0) {
      onChange(`${hours || ''}:${minutes || ''}`);
    } else {
      onChange('');
    }
  }

  return (
    <View style={styles.container}>
      <Text>{ label }: </Text>
      <TextInput
        style={styles.input}
        onBlur={onBlur}
        onChangeText={value => onTimeChange(value, minutes)}
        value={hours}
        keyboardType='numeric'/>
      <Text> : </Text>
      <TextInput
        style={styles.input}
        onBlur={onBlur}
        onChangeText={value => onTimeChange(hours, value)}
        value={minutes}
        keyboardType='numeric'/>
    </View>
  );
}
