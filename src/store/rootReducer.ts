import { combineReducers } from '@reduxjs/toolkit'
import weatherReducer from './weatherSlice'
import searchReducer from './searchSlice'

const rootReducer = combineReducers({
	weather: weatherReducer,
	search: searchReducer
})

export default rootReducer
