import { createGlobalStyle } from 'styled-components'
import './vars.scss'

export const Global = createGlobalStyle`

* {
	margin: 0;
	padding: 0;
}

html, body {
	width: 100%;
}

body {
	min-height: 95vh;
	color: rgb(255, 255, 255);
	font-family: 'HelveticaNeue-Roman', sans-serif;
	background: var(--bg-color);	
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

@media (prefers-color-scheme: light) {
  body.system {
    --bg-color: var(--primary-bg-color);
  }
}

@media (prefers-color-scheme: dark) {
  body.system {
    --bg-color: var(--darken-bg-color);
  }
}
`