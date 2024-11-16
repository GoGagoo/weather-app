import styled from 'styled-components'

const SearchResultListContainer = styled.div`
	position: absolute;
	top: 100%;
	left: 0;
	z-index: 50;
	background-color: rgba(255, 255, 255, 0.8);
	border: 1px solid #ddd;
	padding: 10px;
	width: 100%;
`

const SearchResultItem = styled.div<{ $isSelected: boolean }>`
	padding: 10px;
	cursor: pointer;
	background-color: ${({ $isSelected }) =>
		$isSelected ? '#7eb2fb' : 'transparent'};
	color: black;
	&:hover {
		background-color: #4b91f3;
	}
	&:active {
		background-color: #7eb2fb;
	}
`

export { SearchResultListContainer, SearchResultItem }