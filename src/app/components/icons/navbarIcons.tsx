import React from "react";

export function HouseShieldIcon({
  className = "w-5 h-5 transition-colors duration-300",
}: {
  className?: string;
}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M3 10.75L12 3l9 7.75M4.5 10.75v8.5a1 1 0 001 1h13a1 1 0 001-1v-8.5" />
      <path d="M15.75 14.25v1.25a2.25 2.25 0 01-4.5 0v-1.25a2.25 2.25 0 014.5 0z" />
    </svg>
  );
}

export function KeyPairIcon({
  className = "w-5 h-5 transition-colors duration-300",
}: {
  className?: string;
}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <circle cx="8" cy="8" r="4" />
      <path d="M10.5 10.5l7.5 7.5m-3-3 1.5 1.5m-3-3 1.5 1.5" />
    </svg>
  );
}
