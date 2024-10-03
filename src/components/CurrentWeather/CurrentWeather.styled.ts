import styled from 'styled-components'

const CurrentWeatherBlock = styled.div`
	display: flex;
	gap: 15px;
	justify-content: space-between;
	align-items: center;
	color: #ffffffe8;
`

const CurrentWeatherInfo = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	color: #ffffffe8;
	opacity: 0;
	transition: opacity 0.5s ease-in-out;
	animation: fadeIn 1.5s forwards;

	@keyframes fadeIn {
		0% {
			opacity: 0;
		}
		100% {
			opacity: 1;
		}
	}
`

const Date = styled.div`
	display: flex;
	font-size: 27px;
	flex-direction: column;
	align-items: center;
	color: #ffffffe8;
`

const UnderDate = styled.div`
	margin-top: 10px;
	font-size: 14px;
`

const Temperature = styled.h1`
	display: flex;
	flex-direction: column;
	align-items: center;
	color: white;
	margin-top: 10px;
	font-weight: 300;
	font-size: 90px;

	@media (max-width: 1024px) {
		font-size: 70px;
	}

	@media (max-width: 768px) {
		font-size: 140px;
	}
`

const CityWrapper = styled.div`
	display: flex;
	align-items: center;
	gap: 15px;
`

const City = styled.p`
	display: flex;
	flex-direction: column;
	align-items: center;
	color: white;
	margin-top: 10px;
	font-weight: 300;
	font-size: 20px;
`

export {
	City,
	CityWrapper,
	CurrentWeatherBlock,
	CurrentWeatherInfo,
	Date,
	Temperature,
	UnderDate,
}
