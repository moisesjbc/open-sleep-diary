import React, { useState } from "react";
import { Text, StyleSheet, View, TextInput, Button } from "react-native";
import { useForm, Controller } from "react-hook-form";
import TimeInput from '../widgets/TimeInput';
import WakeUpInput from '../widgets/WakeUpInput';
import InputsList, { InputsListProps } from '../widgets/InputsList';
import NumberInput from "../widgets/NumberInput";

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
        render={({ field: { onChange, onBlur, value } }) => {
            const props: InputsListProps = {
              label: "Wake ups",
              renderElement: (element: object|string, onBlur: Function, onChange: Function) => (
                <WakeUpInput
                  value={element}
                  onBlur={onBlur}
                  onChange={onChange} />
              ),
              inputsData: value,
              emptyElement: {},
              onBlur,
              onChange
            }
            return <InputsList {...props} />
        }}
        name="wakeUp"
        defaultValue={[]}
      />

      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => {
            const props: InputsListProps = {
              label: "Dinner",
              renderElement: (element: object|string, onBlur: Function, onChange: Function) => (
                <TextInput
                  value={element}
                  onBlur={onBlur}
                  onChangeText={onChange} />
              ),
              inputsData: value,
              emptyElement: "",
              onBlur,
              onChange
            }
            return <InputsList {...props} />
        }}
        name="dinner"
        defaultValue={[]}
      />

      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
            <NumberInput
              label="Nap duration (minutes)"
              value={value}
              onBlur={onBlur}
              onChange={onChange} />
        )}
        name="napDuration"
        defaultValue=""
      />

      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <View>
            <Text>Exercise</Text>
            <TextInput
              value={value}
              onBlur={onBlur}
              onChangeText={onChange} />
          </View>
        )}
        name="exercise"
        defaultValue=""
      />

      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <View>
            <Text>Shower</Text>
            <TextInput
              value={value}
              onBlur={onBlur}
              onChangeText={onChange} />
          </View>
        )}
        name="shower"
        defaultValue=""
      />

      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <View>
            <Text>Medicine</Text>
            <TextInput
              value={value}
              onBlur={onBlur}
              onChangeText={onChange} />
          </View>
        )}
        name="medicine"
        defaultValue=""
      />

      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => {
            const props: InputsListProps = {
              label: "Notes",
              renderElement: (element: object|string, onBlur: Function, onChange: Function) => (
                <TextInput
                  value={element}
                  onBlur={onBlur}
                  onChangeText={onChange} />
              ),
              inputsData: value,
              emptyElement: "",
              onBlur,
              onChange
            }
            return <InputsList {...props} />
        }}
        name="notes"
        defaultValue={[]}
      />

      <Button title="Submit" onPress={handleSubmit(onSubmit)} />

      <Text>{ JSON.stringify(data, null, 4) }</Text>
    </View>
  );
}
