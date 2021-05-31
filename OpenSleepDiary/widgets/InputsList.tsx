import React, { useState } from "react";
import { Text, StyleSheet, View, Button } from "react-native";
import WakeUpInput from "./WakeUpInput"

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column'
  },
  inputContainer: {
    flexDirection: 'row'
  }
});

export default function InputsList(props) {
  const {label, inputsData, inputComponent, onBlur, onChange, emptyElement={}} = props;

  const onChangeElement = (index: number) => (value) =>
    onChange([...inputsData.slice(0, index), value, ...inputsData.slice(index+1)]);
  const deleteElement = (index: number) => () =>
    onChange([...inputsData.slice(0, index), ...inputsData.slice(index+1)]);
  const addElement = () => onChange([...inputsData, emptyElement]);

  return (
    <View style={styles.container}>
      <Text>{ label }</Text>
      {inputsData.map((inputData, index) => (
        <View key={index} style={styles.inputContainer}>
          <WakeUpInput
            data={inputData}
            onBlur={onBlur}
            onChange={onChangeElement(index)} />
          <Button title="X" onPress={deleteElement(index)}></Button>
        </View>
      ))}
      <Button title="Add" onPress={addElement} />
    </View>
  );
}
