export function PasswordIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 64 24"
      className="w-8 h-8"
      fill="currentColor"
    >
      <text
        x="8"
        y="14"
        fontSize="14"
        fontFamily="monospace"
        fill="currentColor"
      >
        * * *
      </text>
      <line
        x1="6"
        y1="18"
        x2="58"
        y2="18"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function LockIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      viewBox="0 0 24 24"
      className="w-6 h-6"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M16 10V7a4 4 0 10-8 0v3M5 10h14v10H5V10z"
      />
    </svg>
  );
}
