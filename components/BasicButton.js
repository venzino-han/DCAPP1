import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet} from 'react-native';

function BasicButton({ title, color, background, onPress, disabled}){
    return(
      <TouchableOpacity
        onPressOut={() => onPress() }
        style={[styles.button, {
          backgroundColor:background ,
          shadowColor: 'black',
          shadowOffset: { width: 0, height:0},
          shadowRadius: 4,
          shadowOpacity: 1,
          elevation: 3
        }]}
        activeOpacity={disabled ? 1.0 : 0.2}
      > 
        <View style={[ styles.button , { backgroundColor: background }]}>
            <Text style={[ styles.buttonTitle, {color}]}>{title}</Text>
        </View>
      </TouchableOpacity>
    )
  }

const styles = StyleSheet.create({
  button: {
    height: 80,
    width: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal : 10,
    marginTop: 1,
    backgroundColor: '#dddddd',

  },
  buttonTitle: {
    fontSize: 24,

  },

});

export default BasicButton;