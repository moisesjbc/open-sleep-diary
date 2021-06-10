import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { exportToCsvFile } from '../services/csv.service';

const styles = StyleSheet.create({
  button: {
    marginTop: 30,
    backgroundColor: '#ccffff'
  }
});


export default function Home({ navigation }) {
  const getStartDate = (refDate: Date) => {
    const startDate = new Date(refDate.getFullYear(), refDate.getMonth(), refDate.getDate());
    startDate.setDate(startDate.getDate() - 6);
    return startDate;
  }

  const [startDate, setStartDate] = useState<Date>(getStartDate(new Date()));

  const goToPreviousDays = () => {
    const newStartDate = new Date(startDate);
    newStartDate.setDate(newStartDate.getDate() - 7);
    setStartDate(newStartDate);
  }

  const goToNextDays = () => {
    const newStartDate = new Date(startDate);
    newStartDate.setDate(newStartDate.getDate() + 7);
    setStartDate(newStartDate);
  }

  const getDates = () => {
    const dates = [];
    let tmpDate = new Date(startDate);
    for (let i=0; i<7; i++) {
      dates.push(new Date(tmpDate));
      tmpDate.setDate(tmpDate.getDate() + 1)
    }
    return dates;
  }

  const exportToCsv = () => {
    exportToCsvFile(dates[0], dates[dates.length - 1]);
  }

  const dates = getDates();

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <TouchableOpacity
          style={styles.button}
          onPress={exportToCsv}>
            <Text>Export to CSV</Text>
        </TouchableOpacity>

      <TouchableOpacity
          style={styles.button}
          onPress={goToPreviousDays}>
            <Text>Previous</Text>
        </TouchableOpacity>
      {(dates.map((date, index) => (
        <TouchableOpacity
          key={index}
          style={styles.button}
          onPress={() => navigation.navigate('Sleep entry', {date: date.toISOString()})}>
            <Text>{`${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`}</Text>
        </TouchableOpacity>
      )))}
      <TouchableOpacity
          style={styles.button}
          onPress={goToNextDays}>
            <Text>Next</Text>
      </TouchableOpacity>
    </View>
  );
}