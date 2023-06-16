import { StatusBar } from 'react-native'
import React, { useEffect } from 'react'
import MainStackNavigator from './src/navigation/MainStackNavigator'
import FlashMessage from "react-native-flash-message";
import { Provider } from 'react-redux'
import store from './src/redux/store/Store'
import { COLOR } from './src/enums/StyleGuide';

const App = () => {

 

  return (
    <Provider store={store}>

      <FlashMessage position="top" />
      <StatusBar backgroundColor={COLOR.BLACK} barStyle={'light-content'} />
      <MainStackNavigator />
    </Provider>
  )
}

export default App