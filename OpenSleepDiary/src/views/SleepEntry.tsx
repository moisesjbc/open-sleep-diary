import React, { useEffect, useState } from "react";
import { Text, StyleSheet, View, ScrollView, TextInput, Button } from "react-native";
import { useForm, Controller } from "react-hook-form";
import TimeInput from '../widgets/TimeInput';
import WakeUpInput from '../widgets/WakeUpInput';
import InputsList, { InputsListProps } from '../widgets/InputsList';
import NumberInput from "../widgets/NumberInput";
import database from "../database/database";
import { SleepEntryField } from '../types/SleepEntryField';

const styles = StyleSheet.create({
  container: {
    marginTop: 30,
  },
  textInput: {
    width: '90%',
    marginLeft: 'auto',
    marginRight: 'auto',
    borderWidth: 1,
    padding: 2
  }
});

export default function SleepEntry({route}) {
  let { date } = route.params;
  date = new Date(date);

  const { control, handleSubmit, setValue, formState: { errors } } = useForm();
  const [data, setData] = useState<object>({});

  // Load data from database
  useEffect(() => {
    database.getSleepEntry(date).then(doc => {
      if (doc) {
        setData(doc);
      }
    }).catch(error => {
      alert(`ERROR retrieving data from database: ${error}`);
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
      alert('Data saved to database');
      setData(res);
    }).catch(error => {
      alert(`ERROR saving data to database: ${error}`);
    })
  }

  return (
    <ScrollView style={styles.container}>
      <Text>Date: { date.toString() }</Text>

      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
            <NumberInput
              label="Nap duration (minutes)"
              value={value}
              onBlur={onBlur}
              onChange={onChange} />
        )}
        name={SleepEntryField.NAP_DURATION}
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
              onChangeText={onChange}
              style={styles.textInput} />
          </View>
        )}
        name={SleepEntryField.EXERCISE}
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
              onChangeText={onChange}
              style={styles.textInput} />
          </View>
        )}
        name={SleepEntryField.SHOWER}
        defaultValue=""
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
                  onChangeText={onChange}
                  style={styles.textInput} />
              ),
              inputsData: value,
              emptyElement: "",
              onBlur,
              onChange
            }
            return <InputsList {...props} />
        }}
        name={SleepEntryField.DINNER}
        defaultValue={[]}
      />

      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <View>
            <Text>Medicine</Text>
            <TextInput
              value={value}
              onBlur={onBlur}
              onChangeText={onChange}
              style={styles.textInput} />
          </View>
        )}
        name={SleepEntryField.MEDICINE}
        defaultValue=""
      />

      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <TimeInput
            onBlur={onBlur}
            onChange={onChange}
            time={value}
            label="PC left at" />
        )}
        name={SleepEntryField.PC_LEFT_AT}
        defaultValue=":"
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
                  onChangeText={onChange}
                  style={styles.textInput} />
              ),
              inputsData: value,
              emptyElement: "",
              onBlur,
              onChange
            }
            return <InputsList {...props} />
        }}
        name={SleepEntryField.NOTES}
        defaultValue={[]}
      />      

      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <TimeInput onBlur={onBlur} onChange={onChange} time={value} label="Start hour" />
        )}
        name={SleepEntryField.START_TIME}
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
        name={SleepEntryField.WAKE_UPS}
        defaultValue={[]}
      />

      <Button title="Submit" onPress={handleSubmit(onSubmit)} />
    </ScrollView>
  );
}
