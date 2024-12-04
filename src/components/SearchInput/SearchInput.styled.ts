import styled from 'styled-components'

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

const SearchInputField = styled.input`
	width: 100%;
	color: rgb(255, 255, 255);
	padding: 10px;
	font-size: 20px;
	border: none;
	outline: none;
	background-color: transparent;

	&::placeholder {
		color: rgb(255, 255, 255, 0.5);
	}

	&::-webkit-search-cancel-button {
		display: none;
	}
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

export { ErrorMessage, SearchInputContainer, SearchInputField }
