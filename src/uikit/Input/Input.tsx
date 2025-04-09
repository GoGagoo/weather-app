import { InputField } from './Input.styled'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
	type: string
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
	placeholder: string
}

export const Input: React.FC<InputProps> = (props) => <InputField {...props} />
