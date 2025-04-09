export type WeatherDetailTitle = 
	| 'SUNRISE'
	| 'SUNSET'
	| 'PRECIPITATION'
	| 'HUMIDITY'
	| 'WIND'
	| 'PRESSURE'
	| 'FEELS LIKE'
	| 'VISIBILITY';

export interface WeatherDetailItem {
	title: string;
	value: string;
	icon: React.ReactNode;
}