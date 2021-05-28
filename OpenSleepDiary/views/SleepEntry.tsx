import React, { useState } from "react";
import { Text, StyleSheet, View, TextInput, Button } from "react-native";
import { useForm, Controller } from "react-hook-form";

const styles = StyleSheet.create({
  container: {
    marginTop: 30,
  }
});

export default function SleepEntry(props) {
  const {date = "28/05/2020"} = props;

  const { control, handleSubmit, formState: { errors } } = useForm();
  const onSubmit = newData => setData({...newData})

  const [data, setData] = useState({});

  return (
    <View style={styles.container}>
      <Text>{ date }</Text>

      <Text>Start hour</Text>
      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={styles.input}
            onBlur={onBlur}
            onChangeText={value => onChange(value)}
            value={value}
          />
        )}
        name="startHour"
        defaultValue=""
      />

      <Button title="Submit" onPress={handleSubmit(onSubmit)} />

      <Text>{ JSON.stringify(data) }</Text>
    </View>
  );
}
