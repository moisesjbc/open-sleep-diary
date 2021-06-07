import React, { useEffect, useState } from "react";
import { Text, StyleSheet, View, TextInput, Button } from "react-native";
import { useForm, Controller } from "react-hook-form";
import TimeInput from '../widgets/TimeInput';
import WakeUpInput from '../widgets/WakeUpInput';
import InputsList, { InputsListProps } from '../widgets/InputsList';
import NumberInput from "../widgets/NumberInput";
import database from "../database/database";

const styles = StyleSheet.create({
  container: {
    marginTop: 30,
  }
});

export default function SleepEntry() {
  const date = new Date(2021, 5, 30, 15);

  const { control, handleSubmit, setValue, formState: { errors } } = useForm();
  const [data, setData] = useState<object>({});

  // Load data from database
  useEffect(() => {
    database.getSleepEntry(date).then(doc => {
      if (doc) {
        setData(doc);
      }
    });
  }, []);

  // Update form each time init data is loaded.
  useEffect(() => {
    for (const [key, value] of Object.entries(data)) {
      setValue(key, value, {
        shouldValidate: true,
        shouldDirty: true,
      });
    }
  }, [data]);

  // Submit data to database
  const onSubmit = (newData: object) => {
    database.saveSleepEntry({...newData, date}).then(res => {
      setData(res);
    })
  }

  return (
    <View style={styles.container}>
      <Text>Date: { date.toString() }</Text>

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
    </View>
  );
}
