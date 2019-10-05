import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, AsyncStorage } from 'react-native';
import Home from './Home';
import Setting from './Setting';
import Stopwatch from './Stopwatch';
import List from './List';


export default function App() {
  const[dailyGoal,setDailyGoal] = useState(60*1000*140);
  const [page, setPage] = useState('Home');
  const [results, setResults] = useState([]);
  const [tempGoal, setTempgoal] = useState(10000);
  const [dailyFin, setDailyFin] = useState(10000);

  
  function runtime_sum(log_list) {
    total = 0
    log_list.map(item => total = total + item.runtime )
    return total
  }

  // 초기화 , 로컬에 daily goal 존재 시, 호출 구현
  useEffect(()=>{
    AsyncStorage.getItem("dailyGoal").then(storedGoal =>{
      if ( typeof storedGoal !== 'object'){
        setDailyGoal(parseInt(storedGoal))
        console.log("we dont hav goal, init...")
      }else {
        console.log("we have goal" + storedGoal)
      }
    })
    },[])


  // clearAsyncStorage = async() => {
  //     try{
  //         AsyncStorage.clear();
  //         console.log('clear')
  //     }
  //     catch(error){
  //         alert('error');
  //     }
  // }
  // clearAsyncStorage();

  // 결과 리스트 불러 오기
  useEffect( ()=>{
    check= async ()=>{
      const storedResult= await AsyncStorage.getItem("results")
    if(storedResult != null){
      console.log("we have reult " + JSON.parse(storedResult))
      setResults(JSON.parse(storedResult))
    }else{
      console.log("we dont hav result, init...")
    }
    } 
    check();
    

    // AsyncStorage.getItem("results").then( (savedResults) =>{
    //   if( typeof savedResults == 'object'){
    //     console.log("we dont hav result, init...")
    //   }
    //   else if(JSON.parse(savedResults) !== results){
    //     // console.log(typeof JSON.parse(savedResults))
    //     // console.log(typeof results)
    //     // console.log(JSON.parse(savedResults))
    //     // console.log(results)
    //     console.log("we have reult " + JSON.parse(savedResults).length )
    //     setResults(JSON.parse(savedResults))
    //   }
    // })
    },[])  

  //결과 리스트 즉시 갱신 구현
  useEffect(()=>{
    save = async()=>{
      await AsyncStorage.setItem("results", JSON.stringify(results))
      const savedResult = await AsyncStorage.getItem("results")
      console.log("sw results :    "+ JSON.stringify(savedResult))
    }
    save();
  },[results])
  

  const gotoPage=(page)=>{
    setPage(page);
  }

  const dailyGoalHandler= async(dailyGoal)=>{
    setDailyGoal(dailyGoal)
    await AsyncStorage.setItem("dailyGoal", String(dailyGoal));
  }

  //화면 이동 

  if(page === 'Home'){
    content = <Home 
    dailyGoal={dailyGoal}
    setDailyGoal={setDailyGoal}
    gotoPage={gotoPage} 
    setTempgoal={setTempgoal}
    dailyFin={dailyFin}
    />;
  }

  if(page === 'Setting'){
    content = <Setting 
    gotoPage={gotoPage} 
    dailyGoal={dailyGoal} 
    dailyGoalHandler={dailyGoalHandler}
    />;
  }

  if(page === 'StopWatch'){
    content = <Stopwatch 
    gotoPage={gotoPage}
    tempGoal ={tempGoal}
    results = {results}
    setResults = {setResults}
    />;
  }

  if(page === 'List'){
    content = <List
    gotoPage={gotoPage}
    results = {results}
    />;
  }

  return (
    <View style={styles.container}>
      {content}
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
