import * as React from "react"
import Svg, { Path } from "react-native-svg"

function ReTrySvg(props) {
  return (
    <Svg
      width={16}
      height={16}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M7.986 0a8.014 8.014 0 018.015 8A8 8 0 012.64 13.938a.389.389 0 01-.016-.562l1.279-1.279a.387.387 0 01.528-.018A5.38 5.38 0 008 13.42a5.42 5.42 0 10-3.701-9.379l1.348 1.348a.774.774 0 01-.548 1.324H.775a.774.774 0 01-.774-.774V1.613a.774.774 0 011.322-.547l1.151 1.147A7.973 7.973 0 017.986 0z"
        fill="#fff"
      />
    </Svg>
  )
}

export default ReTrySvg
