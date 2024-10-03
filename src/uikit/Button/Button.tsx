import { Btn, BtnContainer } from './Button.styled'

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	children: React.ReactNode
	onClick: (e: React.MouseEvent<HTMLButtonElement>) => void
}

export const Button: React.FC<Props> = ({ children, onClick }) => (
	<BtnContainer>
		<Btn onClick={onClick}>{children}</Btn>
	</BtnContainer>
)
