import styled from 'styled-components'

const NavbarContainer = styled.nav`
	margin: 38px 71px 40px 71px;
	display: flex;
	gap: 190px;
	align-items: center;

	@media (max-width: 768px) {
		margin: 20px 40px;
		gap: 50px;
	}

	@media (max-width: 480px) {
		flex-direction: column;
		margin: 10px 20px;
		gap: 20px;
	}
`

export { NavbarContainer }
