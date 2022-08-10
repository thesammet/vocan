import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

const SvgCodesandbox = props => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
    className="codesandbox_svg__feather codesandbox_svg__feather-codesandbox"
    {...props}>
    <Path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
    <Path d="m7.5 4.21 4.5 2.6 4.5-2.6M7.5 19.79V14.6L3 12M21 12l-4.5 2.6v5.19M3.27 6.96 12 12.01l8.73-5.05M12 22.08V12" />
  </Svg>
);

export default SvgCodesandbox;
