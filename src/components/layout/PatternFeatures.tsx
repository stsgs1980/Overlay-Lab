import type { JSX } from "react";

const CheckIcon = (): JSX.Element => (
  <svg width="13" height="13" viewBox="0 0 14 14" fill="none" aria-hidden="true" className="mt-[2px] shrink-0">
    <path
      d="M2.5 7.4 5.6 10.4 11.5 3.6"
      stroke="#C8F169"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

/** Список возможностей паттерна: короткий перечень того, что реализовано */
export function PatternFeatures({ features }: { features: string[] }): JSX.Element {
  return (
    <ul className="grid grid-cols-1 gap-x-3 gap-y-1.5 px-5 pt-4 sm:grid-cols-2">
      {features.map((feature) => (
        <li key={feature} className="flex items-start gap-1.5 text-[11.5px] leading-snug text-[var(--text-dim)]">
          <CheckIcon />
          <span>{feature}</span>
        </li>
      ))}
    </ul>
  );
}
