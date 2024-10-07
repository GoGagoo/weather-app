import {
	ArrowDownToLine,
	Droplet,
	Droplets,
	Eye,
	Sunrise,
	Sunset,
	Thermometer,
	Wind,
} from 'lucide-react'
import styled, { keyframes } from 'styled-components'

const Title = styled.div`
	font-size: 27px;
	color: #ffffffe8;
	margin: 32px 0 0 71px;
`

const WeatherDetailsContainer = styled.div`
	display: grid;
	grid-template-columns: repeat(4, 1fr);
	grid-gap: 17px;
	margin: 40px 44px 100px 64px;
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

const DetailBox = styled.div`
	display: flex;
	flex-direction: column;
	background: #ddf5f9;
	padding: 25px;
	border-radius: 8px;
	text-align: center;
	margin: 0 10px;
	color: #072a41;
	font-weight: bold;
	box-shadow: 0px 7px 20px 5px rgba(0, 0, 0, 0.25);

	&:hover {
		background: #a1ccd3;
		color: #022d4a;
		transition: 350ms;
	}
`

const DataWrapper = styled.div`
	margin-top: 55px;
	display: flex;
	justify-content: space-between;
	align-items: center;
	gap: 10px;
	width: 100%;
`

const DetailDataWrapper = styled.div`
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	justify-content: center;
`

const DetailTitle = styled.p`
	display: flex;
	justify-content: flex-start;
	font-size: 22px;
	color: #3b4f6d;
	margin-bottom: 8px;
`

const DetailData = styled.p`
	font-size: 38px;
	margin: 0;
`

interface Props {
	data: any
}

export const WeatherDetails: React.FC<Props> = ({ data }) => {
	const { main } = data

	const sunrise = new Date(data.sys.sunrise * 1000).toLocaleTimeString(
		'en-GB',
		{ hour: '2-digit', hour12: true, minute: '2-digit' }
	)
	const sunset = new Date(data.sys.sunset * 1000).toLocaleTimeString('en-GB', {
		hour: '2-digit',
		hour12: true,
		minute: '2-digit',
	})

	const wind = (data.wind.speed * 3.6).toFixed()

	const feelsLikeInCelsius = data.main.feels_like.toFixed()

	const visibility = data.visibility / 1000

	const details = [
		{ title: 'SUNRISE', value: sunrise, icon: <Sunrise size={54} /> },
		{ title: 'SUNSET', value: sunset, icon: <Sunset size={54} /> },
		{
			title: 'PRECIPITATION',
			value: `${data.clouds.all}%`,
			icon: <Droplet size={54} />,
		},
		{
			title: 'HUMIDITY',
			value: `${main.humidity}%`,
			icon: <Droplets size={54} />,
		},
		{ title: 'WIND', value: `${wind} km/h`, icon: <Wind size={54} /> },
		{
			title: 'PRESSURE',
			value: `${main.pressure} hPa`,
			icon: <ArrowDownToLine size={54} />,
		},
		{
			title: 'FEELS LIKE',
			value: `${feelsLikeInCelsius}°C`,
			icon: <Thermometer size={54} />,
		},
		{ title: 'VISIBILITY', value: `${visibility} km`, icon: <Eye size={54} /> },
	]

	return (
		<>
			<Title>Weather Details</Title>
			<WeatherDetailsContainer>
				{details.map((detail, index) => (
					<DetailBox key={index}>
						<DetailTitle>{detail.title}</DetailTitle>
						<DataWrapper>
							<DetailDataWrapper>
								<DetailData>{detail.value}</DetailData>
							</DetailDataWrapper>
							{detail.icon}
						</DataWrapper>
					</DetailBox>
				))}
			</WeatherDetailsContainer>
		</>
	)
}
