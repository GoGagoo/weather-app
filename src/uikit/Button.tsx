import styled from 'styled-components'

const BtnContainer = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
`

const Btn = styled.button`
	padding: 8px 36px;
	border: none;
	cursor: pointer;
	border-radius: 20px;
	border: 1px solid #ffffff56;
	display: flex;
	justify-content: center;
	align-items: center;

	&:hover {
		background-color: transparent;
		transition: background-color 350ms ease-in-out;
		box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
	}

	&:active {
		background-color: #ffffff82;
	}
`

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	children: React.ReactNode
	onClick: (e: React.MouseEvent<HTMLButtonElement>) => void
}

export const Button: React.FC<Props> = ({ children, onClick }) =>  (
	<BtnContainer>
			<Btn onClick={onClick}>
				{children}
			</Btn>
		</BtnContainer>
)
