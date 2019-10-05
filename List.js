import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity, AsyncStorage  }  from 'react-native';

export default function Setting(props) {

    const saveDailyGoal = async (goal) =>{
        await AsyncStorage.setItem("dailyGoal",String(goal));
        props.dailyGoalHandler(goal);
    }

    return (
      <View style={styles.container}>
        <Text> List </Text>
        <View>
            {
                props.results.map(data=>(
                    <View key={data.id}>
                        <Text>{data.id}</Text>
                    </View>
                ))
            }
        </View>
        <Button
        onPress={()=>{
            saveDailyGoal(tempGoal);
            props.gotoPage('Home');
        }}
        title ="Save"
        buttonStyle={{width:120}}
        />
        <Button
        onPress={()=>{props.gotoPage('Home')}}
        title ="Back"
        buttonStyle={{width:120}}
        />
      </View>
    );
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });
  