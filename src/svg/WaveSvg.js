import * as React from "react"
import Svg, { Path } from "react-native-svg"

function WaveSvg(props) {
  return (
    <Svg
      width={8}
      height={12}
      viewBox="0 0 8 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M4.07 1.378c1.38.287 2.7 2.276 2.7 4.674a4.914 4.914 0 01-2.577 4.57M1.76 4.727a1.278 1.278 0 01.779 1.288 1.344 1.344 0 01-.743 1.26"
        stroke="#4F55EA"
        strokeWidth={2}
        strokeMiterlimit={10}
        strokeLinecap="round"
      />
    </Svg>
  )
}

export default WaveSvg
