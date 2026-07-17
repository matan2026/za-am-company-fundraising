export type NeedIconName = "protection" | "resilience" | "logistics";

export function ProtectionIcon() {
  return (
    <svg
      viewBox="0 0 48 48"
      width="30"
      height="30"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      focusable="false"
    >
      <path
        d="M24 5L38 10V21C38 31.2 32.2 39.1 24 43C15.8 39.1 10 31.2 10 21V10L24 5Z"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M17.5 24L22 28.5L31 19.5"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function ResilienceIcon() {
  return (
    <svg
      viewBox="0 0 48 48"
      width="30"
      height="30"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      focusable="false"
    >
      <circle cx="24" cy="14" r="5" stroke="currentColor" strokeWidth="2.4" />
      <circle cx="12.5" cy="20" r="4" stroke="currentColor" strokeWidth="2.4" />
      <circle cx="35.5" cy="20" r="4" stroke="currentColor" strokeWidth="2.4" />
      <path
        d="M15 37C15 30.9 19 27 24 27C29 27 33 30.9 33 37"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
      />
      <path
        d="M5.5 35C5.5 30.5 8.3 27.5 12.5 27.5C15 27.5 17 28.7 18.3 30.7"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
      />
      <path
        d="M42.5 35C42.5 30.5 39.7 27.5 35.5 27.5C33 27.5 31 28.7 29.7 30.7"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function LogisticsIcon() {
  return (
    <svg
      viewBox="0 0 48 48"
      width="30"
      height="30"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      focusable="false"
    >
      <rect x="8" y="13" width="32" height="26" rx="3" stroke="currentColor" strokeWidth="2.4" />
      <path d="M8 21H40" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
      <path
        d="M18 13V9H30V13"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M24 25V33" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
      <path d="M20 29H28" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
    </svg>
  );
}

export const needIcons = {
  protection: ProtectionIcon,
  resilience: ResilienceIcon,
  logistics: LogisticsIcon,
} satisfies Record<NeedIconName, typeof ProtectionIcon>;
