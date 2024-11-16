import styled from 'styled-components'

const HourlyForecastContainer = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;
	gap: 25px;
	opacity: 0;
	transition: opacity 0.5s ease-in-out;
	animation: fadeIn 4s forwards;

	@keyframes fadeIn {
		0% {
			opacity: 0;
		}
		100% {
			opacity: 1;
		}
	}
`

const ForecastDataWrapper = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 10px;
`

const WeatherTime = styled.p`
	font-size: 20px;
	color: #ffffffe8;
`

const ForecastCurrentData = styled.div`
	display: flex;
	background-color: #477e80;
	flex-direction: column;
	align-items: center;
	padding: 15px;
	border: 1px solid #b3e7e6;
	border-radius: 50px;
	gap: 15px;
	color: #ffffffe8;

	&:hover {
		background-color: #80e9ea;
		transition: 150ms;
	}
`

const ForecastOtherData = styled.div`
	display: flex;
	background-color: #1d9496;
	flex-direction: column;
	align-items: center;
	padding: 15px;
	border: 2px solid #b3e7e6;
	border-radius: 50px;
	gap: 15px;
	color: #ffffffe8;

	&:hover {
		background-color: #21a4a6;
		transition: 350ms;
	}
`

const ForecastTemperature = styled.p`
	font-size: 18px;
	color: #ffffffe8;
`

export {
	ForecastCurrentData,
	ForecastDataWrapper,
	ForecastOtherData,
	ForecastTemperature,
	HourlyForecastContainer,
	WeatherTime,
}
