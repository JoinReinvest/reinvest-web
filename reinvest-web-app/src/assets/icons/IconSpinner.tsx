interface Props {
  color?: 'white' | 'black';
}

export const IconSpinner = ({ color = 'white' }: Props) => (
  <svg
    width="85"
    height="86"
    viewBox="0 0 85 86"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="animate-spin-reverse"
  >
    <path
      d="M82.5 43C82.5 50.9113 80.154 58.6448 75.7588 65.2228C71.3635 71.8008 65.1164 76.9277 57.8073 79.9552C50.4983 82.9827 42.4556 83.7748 34.6964 82.2314C26.9371 80.688 19.8098 76.8784 14.2157 71.2843C8.62163 65.6902 4.812 58.5629 3.26859 50.8036C1.72518 43.0444 2.51731 35.0017 5.54482 27.6927C8.57232 20.3836 13.6992 14.1365 20.2772 9.74122C26.8552 5.34596 34.5887 3 42.5 3"
      stroke="currentColor"
      strokeWidth="5"
    />
    <defs>
      <radialGradient
        id="paint0_angular_1931_224509"
        cx="0"
        cy="0"
        r="1"
        gradientUnits="userSpaceOnUse"
        gradientTransform="translate(42.5 0) rotate(-90) scale(40)"
      >
        <stop
          offset="0.25"
          stopOpacity="0"
          stopColor={color}
        />

        <stop
          offset="1"
          stopColor={color}
        />
      </radialGradient>
    </defs>
  </svg>
);
