import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const styles = StyleSheet.create({
  button: {
    marginTop: 30,
    backgroundColor: '#ccffff'
  }
});


export default function Home({ navigation }) {
  const previousWeek = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate());
  previousWeek.setDate(previousWeek.getDate() - 6);
  const dates = [];
  for (let i=0; i<7; i++) {
    dates.push(new Date(previousWeek));
    previousWeek.setDate(previousWeek.getDate() + 1)
  }

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      {(dates.map((date, index) => (
        <TouchableOpacity
          key={index}
          style={styles.button}
          onPress={() => navigation.navigate('Sleep entry', {date: date.toISOString()})}>
            <Text>{`${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`}</Text>
        </TouchableOpacity>
      )))}
    </View>
  );
}