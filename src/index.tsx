import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { createGlobalStyle } from 'styled-components'

const Global = createGlobalStyle`
* {
	margin: 0;
	padding: 0;
	box-sizing: border-box;
}

html, body {
	background: linear-gradient(to right top, #20D1BC, #1AADE3);
	color: rgb(255, 255, 255);
	font-family: 'HelveticaNeue-Roman', sans-serif;
}

body {
	min-height: 95vh;
}
`

ReactDOM.render(
	<>
		<Global />
		<App />
	</>,
	document.getElementById('root')
)
