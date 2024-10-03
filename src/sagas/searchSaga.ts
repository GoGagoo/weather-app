import { call, debounce, put } from 'redux-saga/effects'
import { GEOCODING_URL } from '../constants/constants'
import {
	searchCitiesFailure,
	searchCitiesStart,
	searchCitiesSuccess,
} from '../store/searchSlice'

interface City {
	name: string
}

interface GeocodingResponse {
	results: City[]
}

const SEARCH_DELAY = 1000

function* fetchCitySuggestionsWorker(
	action: ReturnType<typeof searchCitiesStart>
): Generator {
	try {
		const res: Response = yield call(
			fetch,
			`${GEOCODING_URL}?name=${action.payload}&count=3`
		)

		if (!res.ok) throw new Error('Network error when requesting prompts.')

		const geoData: GeocodingResponse = yield res.json()

		if (!geoData.results || geoData.results.length === 0) {
			yield put(searchCitiesSuccess([]))
			return
		}

		const suggestions: City[] = geoData.results.map((city: City) => ({
			name: city.name,
		}))

		yield put(searchCitiesSuccess(suggestions))
	} catch (error: unknown) {
		if (error instanceof Error) {
			yield put(searchCitiesFailure(error.message))
		} else {
			yield put(searchCitiesFailure('An unknown error occurred'))
		}
	}
}

export function* searchWatcher() {
	yield debounce(
		SEARCH_DELAY,
		searchCitiesStart.type,
		fetchCitySuggestionsWorker
	)
}
