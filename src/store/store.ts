import { configureStore } from '@reduxjs/toolkit'
import createSagaMiddleware from 'redux-saga'
import rootSaga from '../sagas/rootSaga'
import rootReducer from './rootReducer'

const sagaMiddleware = createSagaMiddleware()

const store = configureStore({
	reducer: rootReducer,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(sagaMiddleware),
})

sagaMiddleware.run(rootSaga)

export default store
export type TypedRootState = ReturnType<typeof rootReducer>
