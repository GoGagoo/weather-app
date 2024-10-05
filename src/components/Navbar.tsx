import styled from 'styled-components';

const NavbarContainer = styled.nav`
	margin: 38px 71px 40px 71px;
	display: flex;
	gap: 190px;
	justify-content: space-between;
	align-items: center;
`

export const Navbar = ({ children }: { children: React.ReactNode }) => (
	<NavbarContainer>{children}</NavbarContainer>
)
