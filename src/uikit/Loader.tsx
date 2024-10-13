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

export const Loader = () => {
	return (
		<LoaderWrapper>
			<SunSvg viewBox='0 0 10 10'>
				<g>
					<SunCore cx='5' cy='5' r='2.5' />
					{[...Array(8)].map((_, i) => (
						<SunRay
							key={i}
							x1='5'
							y1='0'
							x2='5'
							y2='1.5'
							transform={`rotate(${i * 45} 5 5)`}
						/>
					))}
				</g>
			</SunSvg>

			<CloudSvg viewBox='0 0 10 10'>
				<CloudPath d='M8.528,5.624H8.247c-0.085,0-0.156-0.068-0.156-0.154c0-0.694-0.563-1.257-1.257-1.257c-0.098,0-0.197,0.013-0.3,0.038C6.493,4.259,6.45,4.252,6.415,4.229C6.38,4.208,6.356,4.172,6.348,4.131C6.117,3.032,5.135,2.235,4.01,2.235c-1.252,0-2.297,0.979-2.379,2.23c-0.004,0.056-0.039,0.108-0.093,0.13C1.076,4.793,0.776,5.249,0.776,5.752c0,0.693,0.564,1.257,1.257,1.257h6.495c0.383,0,0.695-0.31,0.695-0.692S8.911,5.624,8.528,5.624z' />
			</CloudSvg>

			<RainWrapper>
				{[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((i) => (
					<Drop key={i} style={{ animationDelay: `${-130 + i * 110}ms` }} />
				))}
			</RainWrapper>

			<Text>LOOKING OUTSIDE FOR YOU... ONE SEC</Text>
		</LoaderWrapper>
	)
}
