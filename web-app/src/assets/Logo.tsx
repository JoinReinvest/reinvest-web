import { tailwindConfig } from '../tailwind';

interface LogoProps {
  color?: string;
  height?: number;
  width?: number;
}

export const Logo = ({ color = tailwindConfig.theme.colors.green.frost['01'] }: LogoProps) => (
  <svg
    width="144"
    height="144"
    viewBox="0 0 144 144"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M0 4.60156L93.9264 143.999H140.386L46.4601 4.60156H0Z"
      fill={color}
    />
    <path
      d="M47.6614 82.8203H1.11914V143.999H47.6614V82.8203Z"
      fill={color}
    />
    <path
      d="M143.999 32.8853C143.999 26.3809 142.067 20.0227 138.447 14.6147C134.827 9.2066 129.682 4.99162 123.662 2.50277C117.642 0.01391 111.018 -0.63703 104.628 0.63227C98.2371 1.90157 92.3672 5.03409 87.7603 9.63369C83.1533 14.2333 80.0162 20.0934 78.7457 26.4728C77.4751 32.8523 78.1282 39.4645 80.6224 45.4734C83.1166 51.4823 87.3398 56.618 92.7579 60.2308C98.176 63.8437 104.546 65.7715 111.061 65.7705C115.388 65.7712 119.671 64.921 123.668 63.2685C127.665 61.6161 131.297 59.1937 134.355 56.1398C137.414 53.0859 139.84 49.4604 141.495 45.4703C143.15 41.4802 144.001 37.2038 143.999 32.8853Z"
      fill={color}
    />
  </svg>
);
