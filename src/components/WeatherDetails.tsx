import React from 'react'
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
import styled from 'styled-components'

export const WeatherDetails = () => {
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
		box-shadow: 0px 7px 20px 5px rgba(0,0,0,0.25);

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
		font-size: 32px;
		margin: 0;
	`

	return (
		<>
			<Title>Weather Details</Title>
			<WeatherDetailsContainer>
				<DetailBox>
					<DetailTitle>SUNRISE</DetailTitle>
					<DataWrapper>
						<DetailDataWrapper>
							<DetailData>06:47am</DetailData>
						</DetailDataWrapper>
						<Sunrise size={54} />
					</DataWrapper>
				</DetailBox>
				<DetailBox>
					<DetailTitle>SUNSET</DetailTitle>
					<DataWrapper>
						<DetailDataWrapper>
							<DetailData>05:04pm</DetailData>
						</DetailDataWrapper>
						<Sunset size={54} />
					</DataWrapper>
				</DetailBox>
				<DetailBox>
					<DetailTitle>PRECIPITATION</DetailTitle>
					<DataWrapper>
						<DetailDataWrapper>
							<DetailData>60%</DetailData>
						</DetailDataWrapper>
						<Droplet size={54} />
					</DataWrapper>
				</DetailBox>
				<DetailBox>
					<DetailTitle>HUMIDITY</DetailTitle>
					<DataWrapper>
						<DetailDataWrapper>
							<DetailData>15%</DetailData>
						</DetailDataWrapper>
						<Droplets size={54} />
					</DataWrapper>
				</DetailBox>
				<DetailBox>
					<DetailTitle>WIND</DetailTitle>
					<DataWrapper>
						<DetailDataWrapper>
							<DetailData>06:47</DetailData>
						</DetailDataWrapper>
						<Wind size={54} />
					</DataWrapper>
				</DetailBox>
				<DetailBox>
					<DetailTitle>PRESSURE</DetailTitle>
					<DataWrapper>
						<DetailDataWrapper>
							<DetailData>06:47</DetailData>
						</DetailDataWrapper>
						<ArrowDownToLine size={54} />
					</DataWrapper>
				</DetailBox>
				<DetailBox>
					<DetailTitle>FEELS LIKE</DetailTitle>
					<DataWrapper>
						<DetailDataWrapper>
							<DetailData>06:47</DetailData>
						</DetailDataWrapper>
						<Thermometer size={54} />
					</DataWrapper>
				</DetailBox>
				<DetailBox>
					<DetailTitle>VISIBILITY</DetailTitle>
					<DataWrapper>
						<DetailDataWrapper>
							<DetailData>06:47</DetailData>
						</DetailDataWrapper>
						<Eye size={54} />
					</DataWrapper>
				</DetailBox>
			</WeatherDetailsContainer>
		</>
	)
}
