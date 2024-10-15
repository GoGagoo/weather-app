import { useEffect, useState } from 'react'
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

const SearchResultItem = styled.div<{ isSelected: boolean }>`
	padding: 10px;
	cursor: pointer;
	background-color: ${({ isSelected }) =>
		isSelected ? '#f0f0f0' : 'transparent'};
	color: black;
	&:hover {
		background-color: #f0f0f0;
	}
`

interface SearchResultItem {
	name: string
	country: string
}

interface Props {
	results: SearchResultItem[]
	onSelect: (city: string) => void
	onCloseList: () => void
}

export const SearchResultList: React.FC<Props> = ({
	results,
	onSelect,
	onCloseList,
}) => {
	const [highlightedIndex, setHighlightedIndex] = useState(-1)

	useEffect(() => {
		const handleKeyDown = (e: KeyboardEvent) => {
			if (e.key === 'ArrowDown') {
				setHighlightedIndex((prevIndex) =>
					prevIndex < results.length - 1 ? prevIndex + 1 : prevIndex
				)
			} else if (e.key === 'ArrowUp') {
				setHighlightedIndex((prevIndex) =>
					prevIndex > 0 ? prevIndex - 1 : prevIndex
				)
			} else if (e.key === 'Enter') {
				if (highlightedIndex >= 0 && highlightedIndex < results.length) {
					onSelect(results[highlightedIndex].name)
				}
				onCloseList()
			} else if (e.key === 'Escape') {
				onCloseList()
			}
		}

		window.addEventListener('keydown', handleKeyDown)
		return () => {
			window.removeEventListener('keydown', handleKeyDown)
		}
	}, [highlightedIndex, results, onSelect, onCloseList])

	return (
		<SearchResultListContainer>
			{results.map((result, index) => (
				<SearchResultItem
					key={index}
					isSelected={index === highlightedIndex}
					onClick={() => onSelect(result.name)}
				>
					{result.name}, {result.country}
				</SearchResultItem>
			))}
		</SearchResultListContainer>
	)
}
