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

export type NumberInputProps = {
  value: number,
  label: string,
  onBlur: (e: NativeSyntheticEvent<TextInputFocusEventData>) => void,
  onChange: Function
}

export default function NumberInput(props: NumberInputProps) {
  const {value, label, onBlur, onChange} = props;

  return (
    <View style={styles.container}>
      <Text>{ label }: </Text>
      <TextInput
        style={styles.input}
        onBlur={onBlur}
        onChangeText={value => onChange(Number(value))}
        value={value.toString()}
        keyboardType='numeric'/>
    </View>
  );
}
