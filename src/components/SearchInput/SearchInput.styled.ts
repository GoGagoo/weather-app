import { X } from 'lucide-react'
import styled from 'styled-components'

const StyledXIcon = styled(X)`
	&:hover {
		cursor: pointer;
		transition: red 1s ease-in-out;
		stroke: red;
	}
`

const SearchInputContainer = styled.div<{
	$hasdigits: boolean | undefined
	$errorcity: boolean
}>`
	display: flex;
	align-items: center;
	min-width: 148px;
	width: 100%;
	border-bottom: 2px solid
		${(props) =>
			props.$hasdigits ? 'red' : props.$errorcity ? 'red' : '#ffffff6e'};
	transition: border-color 0.1s ease;
	position: relative;
`

const ErrorMessage = styled.div`
	color: red;
	position: absolute;
	top: 100%;
	left: 0;
	margin-top: 10px;
	font-size: 14px;
	transition: 0.1s ease;
`

export { ErrorMessage, SearchInputContainer, StyledXIcon }
