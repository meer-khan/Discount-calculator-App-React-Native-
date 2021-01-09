import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { Text, View, StyleSheet , Button , TouchableHighlight , TouchableOpacity , TextInput , Modal , FlatList } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';


const Stack = createStackNavigator();

export default function App({navigation}) {

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={App1} options={{ title: 'Welcome'}
         }
        />
        <Stack.Screen name='2ndScreen' component={secscreen} options={{title:'History'}}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

function secscreen({route,navigation}){
  const{totalPrice}=route.params
  const{setTotalPrice}=route.params
  const{discount}=route.params
  const{setdiscount}=route.params
  const{showTotalPrice}=route.params
  const{setshowTotalPrice}=route.params
  const{showDiscount}=route.params
  const{setshowDiscount}=route.params
  const{showFinalPrice}=route.params
  const{setshowFinalPrice}=route.params
  const{history}=route.params
  const{setHistory}=route.params
  const{showHistory}=route.params
  const{setShowHistory}=route.params
  
  const [his,sethis]=useState(history);
  var temp = []
 
  return(
    <View style={styles.listViewContainer}>
      <View style={{alignItems:'center' , marginBottom:10, marginTop:10}}>
        <Text style={{fontSize:20 , fontWeight:'bold' , color:'white'}}>
            History
        </Text>
        <View style={{borderWidth:1,borderColor:'#457b9d', width:"100%", marginTop:6}}></View>
      </View>
        <View>
            <FlatList
            data={his}
            renderItem={({item})=>(
              <View> 
                
            <Text style={styles.listViewItems}>Price : {item.price}    
              Rs       Discount :  {item.discount}%       FP {item.finalPrice}
               </Text>                 
          </View>
      
            )}
            /> 
          <Button title='clear' onPress={()=>{

            sethis(temp)
         
            
          }}>

          </Button>
        
    
      </View>
        
    </View>
  )
}

 function App1({route,navigation}) {
  

 
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Button onPress={() =>  navigation.navigate('2ndScreen',{totalPrice:totalPrice,setTotalPrice:setTotalPrice , discount:discount ,
          setdiscount:setdiscount,showTotalPrice:showTotalPrice,setshowTotalPrice:setshowTotalPrice,
          showDiscount:showDiscount,setshowDiscount:setshowDiscount,showFinalPrice:showFinalPrice,
          setshowFinalPrice:setshowFinalPrice, history:history , setHistory:setHistory, 
          showHistory:showHistory,setShowHistory:setShowHistory})} title='History' />
      ),
    });
  }, [navigation]);

  const [totalPrice , setTotalPrice]= useState();
  const [discount , setdiscount]= useState();
  const [showTotalPrice ,setshowTotalPrice] = useState();
  const [showDiscount , setshowDiscount] = useState();
  const [showFinalPrice , setshowFinalPrice] = useState();
  const [isHighlighted, setIsHighlighted] = useState(false)
  const [isHighlighted2, setIsHighlighted2] = useState(false)

  const [history,setHistory] = useState([
   
  ]);
  const [showHistory , setShowHistory] = useState([
   
  ]);
  const inputTextremoverbool = false;
const textInputValidation = (setdiscount,val)=>{
  if(val > 100){
    alert("Discount cannot be more than hundred")
  }
  else{
    setdiscount(val)
  }
  if (inputTextremoverbool == true){
    val = NaN
    return val 
  }
}
  return (
    
    <View style={styles.container}>

  
      <View style={styles.textinputContainer}>
        <TextInput style={[styles.input  ,isHighlighted && styles.isHighlighted]} keyboardType={'numeric'} placeholder = "Total Price"  onChangeText={(val)=>{setTotalPrice(val)}}
        onFocus={() => { setIsHighlighted(true)}}
        onBlur={() => {setIsHighlighted(false)}}
        >
        </TextInput>
        </View>
        <View style={styles.textinputContainer}>
          <TextInput style={[styles.input  ,isHighlighted2 && styles.isHighlighted]}
           keyboardType={'numeric'}placeholder = "Discount" onChangeText={(val)=>{textInputValidation(setdiscount,val)}}
           
            onFocus={() => { setIsHighlighted2(true)}}
            onBlur={() => {setIsHighlighted2(false)}}
          >
        </TextInput>
        </View>
         <View style={{alignItems:'center'}}>
        <TouchableOpacity onPress = {()=>{calculateDiscount(totalPrice,
          setTotalPrice,discount,setdiscount , showTotalPrice,setshowTotalPrice,
          showDiscount,setshowDiscount,showFinalPrice,setshowFinalPrice , history
          ,setHistory,showHistory,setShowHistory, inputTextremoverbool)}}  style={styles.discountBtn }> 
        <Text style={styles.btnText}  >Discount</Text>
        </TouchableOpacity> 
      </View>
      
      
      <View style={styles.textContainer}>
        <View style={styles.textContainer2}>
          <Text style={{fontSize:16}} >Total Price : {showTotalPrice} </Text> 
          <Text style={{fontSize:16}}>You Saved : {showDiscount} </Text> 
          <Text style={{fontSize:16}}>Final Price: {showFinalPrice} </Text> 
        </View>
        <View style={{alignItems:'center', marginBottom:8}}>
            <TouchableOpacity style={styles.saveBtn} onPress={()=>{saveBtnFn(totalPrice,setTotalPrice,discount,setdiscount , showTotalPrice,setshowTotalPrice,showDiscount,setshowDiscount,showFinalPrice,setshowFinalPrice , history,setHistory,showHistory,setShowHistory)}}>
              <Text style={styles.saveBtnText}>Save</Text>
            </TouchableOpacity>
          </View> 
      </View>

<View style={styles.listViewContainer }>
        
       

</View>
       
    </View>
  );
}




// 
function calculateDiscount(totalPrice,setTotalPrice,discount,setdiscount,showTotalPrice,setshowTotalPrice,showDiscount,setshowDiscount,showFinalPrice,setshowFinalPrice , history,setHistory,showHistory,setShowHistory)
{
  totalPrice=parseFloat(totalPrice);
  discount=parseFloat(discount);
  setshowTotalPrice(totalPrice + ' and disount is: ' + discount+"%");

  var disprice= (discount*totalPrice)/100;
  setshowDiscount(disprice);
  var finprice = totalPrice-disprice;
  setshowFinalPrice(finprice);
  inputTextremoverbool = true ;
 

}
function saveBtnFn(totalPrice,setTotalPrice,discount,setdiscount,showTotalPrice,setshowTotalPrice,showDiscount,setshowDiscount,showFinalPrice,setshowFinalPrice , history,setHistory,showHistory,setShowHistory){
  totalPrice=parseFloat(totalPrice);
  discount=parseFloat(discount);
  setshowTotalPrice(totalPrice + ' and disount is: ' + discount+"%");

  var disprice= (discount*totalPrice)/100;
  setshowDiscount(disprice);
  var finprice = totalPrice-disprice;
  setshowFinalPrice(finprice);
  var his = history 
  his.push({price:totalPrice , discount: discount , finalPrice: finprice})
  setHistory(his)
}

const styles = StyleSheet.create({
  container: {
    width:'100%',
    flex:1,
   marginTop:-10,
    backgroundColor: '#ecf0f1',
    padding: 8,
    backgroundColor:'#595b83'
  },
  saveBtn:{
    width:100 , 
    height:40,
    backgroundColor: '#ffb703',
    borderRadius: 8 ,
    alignItems:"center",
    justifyContent:'center'
   
  },
  saveBtnText:{
    textAlign:"center",
     textAlignVertical:"center",
     fontSize:15,
     color:'black',
  },
  discountBtn: {
    width:100 , 
    height:40,
    backgroundColor: '#ffb703',
    borderRadius: 8 ,
    alignItems:"center",
    

  },
  btnText:{
     textAlign:"center",
     textAlignVertical:"center",
     fontSize:15,
     marginTop:9,
     color:'black',
  },
  input:{
    width:'85%',
    backgroundColor:"white", 
    borderRadius: 10 ,
    padding:18,
    borderWidth:4,
    borderColor:'white'
  },
  textinputContainer:{
    flexDirection:'row',
    margin:5,
    alignItems:'center',
    justifyContent:'center'

  },
  textContainer:{
    backgroundColor:"#8ecae6",
    borderRadius:10,
    marginTop:15,
    width:'100%',
    justifyContent:'center',

  },
  textContainer2:{
    marginLeft:25,
    marginTop:10,
    marginBottom:10,
  },
  listViewContainer:{
    backgroundColor:"#023047",
    borderRadius:10,
    marginTop:15,
    width:'100%'
  },
  listViewItems:{
    color:'white',
    marginLeft:20 ,
    fontSize:15,
    marginBottom:20,

  },
  isHighlighted: {
    borderColor: '#8bcdcd',}

});

