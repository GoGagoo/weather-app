import styled from 'styled-components'

const SelectContainer = styled.div`
	background-color: transparent;
`

const SelectTag = styled.select`
	background-color: transparent;
	width: 100px;
	color: rgb(255, 255, 255);
	padding: 8px 4px;
	font-size: 18px;
	line-height: 1.5;
	text-align: left;
	border: 1px solid #ffffff56;
	border-radius: 20px;
	outline: none;

	&:hover {
		background-color: #ffffff56;
		transition: all 0.2s ease-in-out;
	}

	&:disabled {
		cursor: not-allowed;
		background-color: #433e9f;
	}
`

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
