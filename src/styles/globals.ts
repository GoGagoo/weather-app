import React from 'react'
import { createGlobalStyle } from 'styled-components'

export const Global = createGlobalStyle`
* {
	margin: 0;
	padding: 0;
	box-sizing: border-box;
}

html, body {
	width: 100%;
  height: 100%;
}

body {
	min-height: 95vh;
	color: rgb(255, 255, 255);
	font-family: 'HelveticaNeue-Roman', sans-serif;
	background: linear-gradient(-45deg, #23a6d5, #23d5ab);
	/* background: var(--bg-color); */
	background-size: 400% 400%;
	animation: gradient 15s ease infinite;
}

body.light {
	--bg-color: var(--primary-bg-color);
}

body.dark {
	--bg-color: var(--darken-bg-color);
}

@keyframes gradient {
    0% {
        background-position: 0% 50%;
    }
    50% {
        background-position: 100% 50%;
    }
    100% {
        background-position: 0% 50%;
    }
}
`