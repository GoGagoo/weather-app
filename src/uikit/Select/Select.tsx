import { SelectContainer, SelectTag } from './Select.styled'

interface Props extends React.SelectHTMLAttributes<HTMLSelectElement> {
	children: React.ReactNode
	value: string
	onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void
}

export const Select: React.FC<Props> = ({ children, value, onChange }) => (
	<SelectContainer>
		<SelectTag value={value} onChange={onChange}>
			{children}
		</SelectTag>
	</SelectContainer>
)
