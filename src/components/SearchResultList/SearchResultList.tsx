import { useEffect, useState } from 'react'
import {
	SearchResultItem,
	SearchResultListContainer,
} from './SearchResultList.styled'

interface SearchResultItem {
	name: string
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
			switch (e.key) {
				case 'ArrowDown':
					setHighlightedIndex((prevIndex) =>
						prevIndex < results.length - 1 ? prevIndex + 1 : prevIndex
					)
					break
				case 'ArrowUp':
					setHighlightedIndex((prevIndex) =>
						prevIndex > 0 ? prevIndex - 1 : prevIndex
					)
					break
				case 'Enter':
					if (highlightedIndex >= 0 && highlightedIndex < results.length) {
						onSelect(results[highlightedIndex].name)
					}
					onCloseList()
					break
				case 'Escape':
					onCloseList()
					break
				default:
					break
			}
		}

		window.addEventListener('keydown', handleKeyDown)
		return () => window.removeEventListener('keydown', handleKeyDown)
	}, [highlightedIndex, results, onSelect, onCloseList])

	return (
		<SearchResultListContainer>
			{results.map((result, index) => (
				<SearchResultItem
					key={index}
					$isSelected={index === highlightedIndex}
					onClick={() => onSelect(result.name)}
				>
					{result.name}
				</SearchResultItem>
			))}
		</SearchResultListContainer>
	)
}
