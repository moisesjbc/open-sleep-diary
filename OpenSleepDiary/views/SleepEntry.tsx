import React, { useState } from "react";
import { Text, StyleSheet, View, TextInput, Button } from "react-native";
import { useForm, Controller } from "react-hook-form";
import TimeInput from '../widgets/TimeInput';
import WakeUpInput from '../widgets/WakeUpInput';
import InputsList from '../widgets/InputsList';

const styles = StyleSheet.create({
  container: {
    marginTop: 30,
  }
});

export default function SleepEntry(props) {
  const {date = "28/05/2020"} = props;

  const { control, handleSubmit, formState: { errors } } = useForm();
  const onSubmit = newData => setData({...newData, date})

  const [data, setData] = useState({});

  return (
    <View style={styles.container}>
      <Text>Date: { date }</Text>

      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <TimeInput onBlur={onBlur} onChange={onChange} time={value} label="Start hour" />
        )}
        name="startTime"
        defaultValue=""
      />

      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
            <InputsList label="Wake ups" inputsData={value} inputComponent={WakeUpInput} onBlur={onBlur} onChange={onChange} />
        )}
        name="wakeUp"
        defaultValue={[]}
      />

      <Button title="Submit" onPress={handleSubmit(onSubmit)} />

      <Text>{ JSON.stringify(data, null, 4) }</Text>
    </View>
  );
}
