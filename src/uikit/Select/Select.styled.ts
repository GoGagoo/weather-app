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
	border: 1px solid #e2d8d89a;
	border-radius: 20px;

	&:hover {
		background-color: #ffffff56;
		transition: all 0.2s ease-in-out;
	}

	&:disabled {
		cursor: not-allowed;
		background-color: #433e9f;
	}

	&:focus {
		border: 1px solid #d6d5d5;
		transition: 150ms ease-in;
		outline: none;
	}
`

export { SelectContainer, SelectTag }
