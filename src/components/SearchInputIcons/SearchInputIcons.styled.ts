import { Mic, MicOff, Search } from 'lucide-react'
import styled from 'styled-components'

const iconStyles = `
  cursor: pointer;
  padding: 8px;
  background-color: transparent;
  border-radius: 0;
  transition: all 0.2s ease-in-out;
  color: #ffffffa6;
  margin: 0 4px;

  &:hover {
    background-color: #0e4a4d;
    border-radius: 25%;
    color: #ffffff;
  }
`

export const StyledMic = styled(Mic)`
	${iconStyles}
`

export const StyledMicOff = styled(MicOff)`
	${iconStyles}
	color: red;

	&:hover {
		color: darkred;
	}
`

export const StyledSearch = styled(Search)<{ $hasError?: boolean }>`
	${iconStyles}
	color: ${({ $hasError }) => ($hasError ? 'red' : '#ffffffa6')};

	&:hover {
		color: ${({ $hasError }) => ($hasError ? 'darkred' : '#ffffff')};
	}
`

export const Barrier = styled.div`
	width: 1px;
	height: 20px;
	background-color: #ffffffa6;
	margin: 0 4px;
`

export const IconsContainer = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
`
