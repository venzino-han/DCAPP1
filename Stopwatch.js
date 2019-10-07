import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, AppState}  from 'react-native';
import moment from 'moment';
import Counter from './components/Counter'

import { useKeepAwake } from 'expo-keep-awake';



export default function Setting(props) {

    function RoundButton({ title, color, background, onPress, disabled}){
        return(
          
          <TouchableOpacity
            onPressOut={() => !disabled && onPress()}
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
    const pad = (n) => n < 10 ? '0'+n : n

    function Timer({interval, style}){
        const duration = moment.duration(interval)
        return <Text style = {style}>{pad(duration.hours())}:{pad(duration.minutes())}:{pad(duration.seconds())}</Text>
      }
    
    const [ running, setRunning ] = useState(0);
    const [ goal, setGoal ] = useState(props.tempGoal);
    const [runtime, setRuntime] = useState(0);
    //const [appState, setAppState] = useState(AppState.currentState);

    const [   seconds, setSeconds, isActive, setIsActive, reset,] = Counter();

    // console.log(appState)
    // if( appState !== 'active'){
    //   stopfunc();
    // }

    const startfunc = () =>{
        setRunning(1)
        setIsActive(true);
    }

    const stopfunc = () => {
        setRuntime(seconds)      
        setIsActive(false);
        setRunning(2);
      }  

    const  resume = () =>{
        setRunning(1);
        setIsActive(true);
        }
    
    const savingResult = async () =>{
      const today = new Date();
          const time = pad(today.getHours()) + ":" + pad(today.getMinutes()) + ":" + pad(today.getSeconds());
          const date = pad(today.getFullYear())+ "-" +pad(today.getMonth()+1)+ "-" +pad(today.getDate());
          const tf = (goal-seconds) <10 ? true : false 
          const newResult = {
              id: today,
              day: date,
              time: time,
              runtime: seconds,
              completed: tf,
            }
          await props.setResults(pervResults =>[newResult, ...pervResults])
          }
          
    
    const finish = () => {
        // 저장 조건 추가 최소 1-5분 이상 (일단은 5초 이상으로)
        if(runtime>60000*5){
          savingResult();
        }else{
          alert("Less then 5min will not be saved!")
        }
        props.gotoPage('Home')
    }

    if((goal- seconds) <5 && running !== 3){
        setRuntime(seconds)
        console.log('runtime   :   ' + runtime)
        setRunning(3);
        setIsActive(false);
        savingResult();
    }

    useKeepAwake();

    view = (
        <View style={ 
            running === 0 ? styles.container_stoped :
            running === 1 ? styles.container_running:
            running === 2 ? styles.container_stoped:
            styles.container_Finish
        }>
        <View style={{ flex: 3,}} >
            <View style={{ flex: 3, alignItems: 'center',justifyContent: 'center'}}>
              { running !==3 &&(<Timer interval={goal-seconds} style={styles.timer} />)}
              { running ===3 &&(<View>
              <Text style={{fontSize:18}}>Focus time finished.</Text>
              <Text style={{fontSize:18}}>Good Job!</Text>
              </View>
              )}  
            </View>
        </View>
        {/* running 상태 표시  */}
        {/* <Text style={{color:'#FFFFFF'}}> {running} </Text> */}
        <View style={{ flex: 1, }} >
        <View style={{flexDirection: "row", justifyContent: 'space-between',}} > 
            {   running === 0 && (
                <View style={{flexDirection:'row' }} >
                  <RoundButton 
                  title='Start' color='#FFFFFF' background='#004B8D' 
                  onPress={ startfunc }
                  />
                  <RoundButton 
                    title='Back' color='#FFFFFF' background='#004B8D' 
                    onPress={()=>{props.gotoPage('Home')
                    }}/>
                </View>)}
            {   running === 1 && (
              <View onTouchStart={stopfunc} >
                <RoundButton 
                title='Stop' color='#2D2926' background='white' 
                onPress={stopfunc}
                />
              </View>
                )}
            {   running === 2 && (
                <View style={{flexDirection:'row' }} >
                <RoundButton 
                    title='Resume' color='#FFFFFF' background='#004B8D' 
                    onPress={resume}
                    />
                <RoundButton 
                    title='Finish' color='#FFFFFF' background='#004B8D' 
                    onPress={()=>{
                      finish((seconds));
                      console.log("timer : " + (seconds))
                    }}/>
                </View>
                )}
              {   
              running === 3 && (
              <View>
              <RoundButton 
                    title='Finish' color='#FFF' background='#2D2926' 
                    onPress={()=>{
                      props.gotoPage('Home');
                      console.log("timer : " + (runtime))
                    }}/>
                    
                    </View>)
              }
        </View>
        </View>
    </View>
    )  
    return (
            <View style={styles.container}>
                {view}
            </View>
    )
  }
  
  
  const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        width : "100%"
      },
    container_running: {
      flex: 1,
      backgroundColor: '#BA0C2F',
      alignItems: 'center',
      justifyContent: 'center',
      width: '100%'
    },
    container_stoped: {
      flex: 1,
      backgroundColor: '#2D2926',
      alignItems: 'center',
      justifyContent: 'center',
      width: '100%'
    },
    container_Finish:{
      flex: 1,
      backgroundColor: '#ffa500',
      alignItems: 'center',
      justifyContent: 'center',
      width: '100%',
      color: 'black'
    },
    timer: {
      color: 'white',
      alignSelf: "center",
      fontSize: 80,
    },
    button: {
      width: 80,
      height: 80,
      borderRadius: 40,
      justifyContent: 'center',
      alignItems: 'center',
      marginHorizontal : 20,
      marginTop: 1,
    },
    buttonTitle: {
      fontSize: 16,
    },
    lapText : {
      color: "white",
      fontSize: 16,
    },
    lap:{
      flexDirection: "row",
      justifyContent: 'space-between',
      margin: 5,
    },
    scrollView: {
      alignSelf: "stretch",
      borderColor: "gray",
      borderTopWidth: 1,
      padding: 5,
      margin: 20,
    }, 
    fastest: { 
      color: '#4bc05f'
    },
    slowest: {
      color: '#cc3531'
    }
  
  });