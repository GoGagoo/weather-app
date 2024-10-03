import styled from 'styled-components'

const Title = styled.div`
	font-size: 27px;
	color: #ffffffe8;
	margin: 32px 0 0 71px;

	@media (max-width: 768px) {
		margin: 16px 0;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 24px;
	}

	@media (max-width: 480px) {
		margin: 16px 0;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 24px;
	}
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

	@media (max-width: 1024px) {
		margin-bottom: 3%;
		grid-template-columns: repeat(2, 1fr);
	}

	@media (max-width: 768px) {
		margin: 0;
		width: 100%;
		margin-bottom: 3%;
		grid-template-columns: repeat(2, 1fr);
	}

	@media (max-width: 480px) {
		margin: 0;
		width: 100%;
		margin-bottom: 10%;
		grid-template-columns: repeat(2, 1fr);
	}

	@media (max-width: 320px) {
		margin: 0;
		width: 100%;
		margin-bottom: 3%;
		grid-template-columns: repeat(1, 1fr);
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

	@media (max-width: 480px) {
		padding: 15px;
		font-size: 14px;
	}
`

const DataWrapper = styled.div`
	margin-top: 55px;
	display: flex;
	justify-content: space-between;
	align-items: center;
	gap: 10px;
	width: 100%;

	@media (max-width: 480px) {
		margin-top: 20px;
	}
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

	@media (max-width: 1024px) {
		font-size: 26px;
	}

	@media (max-width: 480px) {
		font-size: 17px;
	}

	@media (max-width: 320px) {
		font-size: 18px;
	}
`

const DetailData = styled.p`
	font-size: 38px;
	margin: 0;

	@media (max-width: 480px) {
		font-size: 19px;
	}

	@media (max-width: 320px) {
		font-size: 24px;
	}
`

const IconWrapper = styled.div`
	svg {
		width: 54px;
		height: 54px;

		@media (max-width: 480px) {
			width: 36px;
			height: 36px;
		}
	}
`

export {
	DataWrapper,
	DetailBox,
	DetailData,
	DetailDataWrapper,
	DetailTitle,
	IconWrapper,
	Title,
	WeatherDetailsContainer,
}
