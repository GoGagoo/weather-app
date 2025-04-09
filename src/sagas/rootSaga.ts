import { all } from 'redux-saga/effects'
import { weatherWatcher } from './weatherSaga'
import { searchWatcher } from './searchSaga'

export default function* rootSaga() {
	yield all([weatherWatcher(), searchWatcher()])
}
