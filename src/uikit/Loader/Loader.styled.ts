import styled, { keyframes } from 'styled-components'

const rotate = keyframes`
  0% {
    transform: rotateZ(0deg);
  }
  100% {
    transform: rotateZ(360deg);
  }
`

const drop = keyframes`
  50% {
    height: 45px;
    opacity: 0;
  }
  51% {
    opacity: 0;
  }
  100% {
    height: 1px;
    opacity: 0;
  }
`

const LoaderWrapper = styled.div`
	position: absolute;
	margin-left: -55px;
	margin-top: -100px;
	height: 110px;
	width: 110px;
	left: 50%;
	top: 50%;
`

const Svg = styled.svg`
	width: 110px;
	height: 110px;
`

const CloudSvg = styled(Svg)`
	z-index: 50;
`

const SunSvg = styled(Svg)`
	position: absolute;
	left: 40%;
	top: 5%;
	transform: translate(-50%, -50%);
	width: 65px;
	height: 75px;
	z-index: -1;
	animation: ${rotate} 16s linear infinite;
`

const CloudPath = styled.path`
	fill: #efefef;
`

const SunCore = styled.circle`
	fill: #ffd700;
`

const SunRay = styled.line`
	stroke: #ffd700;
	stroke-width: 0.2;
	stroke-linecap: round;
`

const RainWrapper = styled.div`
	position: absolute;
	width: 70px;
	height: 70px;
	margin-top: -32px;
	margin-left: 19px;
`

const Drop = styled.span`
	opacity: 1;
	background: #9ea1a4;
	display: block;
	float: left;
	width: 3px;
	height: 12px;
	margin-left: 4px;
	border-radius: 0px 0px 6px 6px;
	animation: ${drop} 350ms infinite;
	animation-delay: 350ms;
`

const Text = styled.div`
	font-family: Helvetica, 'Helvetica Neue', sans-serif;
	letter-spacing: 1px;
	text-align: center;
	margin-left: -43px;
	font-weight: bold;
	margin-top: 20px;
	font-size: 16px;
	color: #dfeaea;
	width: 200px;
`

export {
	CloudPath,
	CloudSvg,
	Drop,
	LoaderWrapper,
	RainWrapper,
	SunCore,
	SunRay,
	SunSvg,
	Svg,
	Text,
}
