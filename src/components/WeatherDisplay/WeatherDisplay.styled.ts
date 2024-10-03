import styled from 'styled-components'

const WeatherDisplayContainer = styled.div`
	margin: 90px 44px 96px 34px;
	padding: 44px;
	display: flex;
	justify-content: space-between;
	align-items: center;

	@media (max-width: 1024px) {
		margin: 15px 44px 15px 34px;
	}

	@media (max-width: 768px) {
		flex-direction: column;
		margin: 0;
	}

	@media (max-width: 480px) {
		flex-direction: column;
		margin-top: 30px;
	}

	@media (max-width: 320px) {
		margin: 30px 20px;
		gap: 0;
		padding: 0;
	}
`

const Divide = styled.div`
	height: 1px;
	width: 100%;
	background-color: #ffffff8b;
`

export { Divide, WeatherDisplayContainer }
