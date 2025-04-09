import styled from 'styled-components'

const HourlyForecastContainer = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;
	gap: 25px;
	opacity: 0;
	overflow-x: auto;
	overflow-y: hidden;
	scroll-snap-type: x mandatory;
	padding-left: 10px;
	transition: opacity 0.5s ease-in-out;
	animation: fadeIn 4s forwards;
	-webkit-overflow-scrolling: touch;

	@keyframes fadeIn {
		0% {
			opacity: 0;
		}
		100% {
			opacity: 1;
		}
	}

	@media (max-width: 1024px) {
		gap: 40px;
	}

	@media (max-width: 768px) {
		margin-top: 40px;
		width: 100%;
		gap: 11px;
	}

	@media (max-width: 480px) {
		margin-top: 30px;
		gap: 30px;
		min-height: 50%;
		width: 100%;
	}
`

const ForecastDataWrapper = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 20px;
	scroll-snap-align: center;
	min-width: 60px;

	@media (max-width: 768px) {
		gap: 10px;
	}
`

const WeatherTime = styled.p`
	font-size: 20px;
	color: --primary-text-color;
`

const ForecastCurrentData = styled.div`
	display: flex;
	background-color: #477e80;
	flex-direction: column;
	align-items: center;
	padding: 15px;
	border: 2px solid #b3e7e6;
	border-radius: 50px;
	gap: 15px;
	color: --primary-text-color;

	&:hover {
		background-color: #80e9ea;
		transition: 150ms;
	}

	@media (max-width: 768px) {
		padding: 12px;
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
	color: --primary-text-color;

	&:hover {
		background-color: #21a4a6;
		transition: 350ms;
	}

	@media (max-width: 768px) {
		padding: 12px;
	}
`

const ForecastTemperature = styled.p`
	font-size: 18px;
	color: --primary-text-color;
`

export {
	ForecastCurrentData,
	ForecastDataWrapper,
	ForecastOtherData,
	ForecastTemperature,
	HourlyForecastContainer,
	WeatherTime,
}
