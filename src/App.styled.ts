import styled from 'styled-components'

const Togglers = styled.div`
	display: flex;
	align-items: center;
	gap: 20px;
	justify-content: space-between;

	@media (max-width: 768px) {
		justify-content: space-between;
	}

	@media (max-width: 480px) {
		justify-content: space-between;
		gap: 115px;
		margin-top: 15px;
		order: -1;
	}
	@media (max-width: 320px) {
		justify-content: space-between;
		gap: 55px;
		margin-top: 15px;
		order: -1;
	}
`

export { Togglers }
