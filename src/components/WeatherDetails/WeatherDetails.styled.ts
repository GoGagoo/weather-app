import styled from 'styled-components'

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

export {
	DataWrapper,
	DetailBox,
	DetailData,
	DetailDataWrapper,
	DetailTitle,
	Title,
	WeatherDetailsContainer,
}
