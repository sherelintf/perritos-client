/* eslint-disable @typescript-eslint/no-explicit-any */
import { SvgIcon } from '@mui/material'

const ActiveIcon = (props: any) => (
  <SvgIcon
    viewBox="0 0 20 20"
    fontSize="inherit"
    data-testid="activeicon"
    sx={{ width: '20px', height: '20px' }}
    {...props}
  >
    <g clipPath="url(#clip0_1416_3553)">
      <path
        d="M6.36364 14.0746L1.59091 9.68657L0 11.1493L6.36364 17L20 4.46269L18.4091 3L6.36364 14.0746Z"
        fill="currentColor"
      />
    </g>
    <defs>
      <clipPath id="clip0_1416_3553">
        <rect width="20" height="20" fill="white" />
      </clipPath>
    </defs>
  </SvgIcon>
)

export default ActiveIcon
