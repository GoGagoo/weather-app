import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface City {
	name: string
}

interface SearchState {
	query: string
	results: City[]
	loading: boolean
	error: string | null
}

const initialState: SearchState = {
	query: '',
	results: [],
	loading: false,
	error: null,
}

const searchSlice = createSlice({
	name: 'search',
	initialState,
	reducers: {
		searchCitiesStart(state, action: PayloadAction<string>) {
			state.query = action.payload
			state.loading = true
			state.error = null
		},
		searchCitiesSuccess(state, action: PayloadAction<City[]>) {
			state.results = action.payload
			state.loading = false
		},
		searchCitiesFailure(state, action: PayloadAction<string>) {
			state.error = action.payload
			state.loading = false
		},
		setQuery(state, action: PayloadAction<string>) {
			state.query = action.payload
		},
		clearSearch(state) {
			state.query = ''
			state.results = []
			state.error = null
		},
	},
})

export const {
	searchCitiesStart,
	searchCitiesSuccess,
	searchCitiesFailure,
	setQuery,
	clearSearch,
} = searchSlice.actions
export default searchSlice.reducer
