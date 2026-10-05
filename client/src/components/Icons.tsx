import type { ReactNode, SVGProps } from "react";

interface IconProps extends SVGProps<SVGSVGElement> {
  children: ReactNode;
}

function Icon({ children, ...props }: IconProps) {
  return (
    <svg
      width={18}
      height={18}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      {children}
    </svg>
  );
}

type IconComponentProps = SVGProps<SVGSVGElement>;

export const SearchIcon = (props: IconComponentProps) => (
  <Icon {...props}>
    <circle cx="11" cy="11" r="7" />
    <path d="m20 20-3.5-3.5" />
  </Icon>
);

export const PlusIcon = (props: IconComponentProps) => (
  <Icon {...props}>
    <path d="M12 5v14M5 12h14" />
  </Icon>
);

export const TicketIcon = (props: IconComponentProps) => (
  <Icon {...props}>
    <path d="M3 9a2 2 0 0 0 0 6v3a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1v-3a2 2 0 0 1 0-6V6a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1z" />
    <path d="M14 5v14" strokeDasharray="2 3" />
  </Icon>
);

export const ArrowLeftIcon = (props: IconComponentProps) => (
  <Icon {...props}>
    <path d="M19 12H5m6-6-6 6 6 6" />
  </Icon>
);

export const ChevronDownIcon = (props: IconComponentProps) => (
  <Icon {...props}>
    <path d="m6 9 6 6 6-6" />
  </Icon>
);

export const AlertIcon = (props: IconComponentProps) => (
  <Icon {...props}>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 8v5M12 16.5v.01" />
  </Icon>
);

export const CheckIcon = (props: IconComponentProps) => (
  <Icon {...props}>
    <path d="m5 12 5 5L20 7" />
  </Icon>
);

export const InboxIcon = (props: IconComponentProps) => (
  <Icon {...props}>
    <path d="M22 12h-6l-2 3h-4l-2-3H2" />
    <path d="M5.5 5.1 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.5-6.9A2 2 0 0 0 16.7 4H7.3a2 2 0 0 0-1.8 1.1z" />
  </Icon>
);

export const MailIcon = (props: IconComponentProps) => (
  <Icon {...props}>
    <rect x="3" y="5" width="18" height="14" rx="2" />
    <path d="m3 7 9 6 9-6" />
  </Icon>
);

export const FlagIcon = (props: IconComponentProps) => (
  <Icon {...props}>
    <path d="M5 21V4m0 0h11l-2 4 2 4H5" />
  </Icon>
);

export const ChevronRightIcon = (props: IconComponentProps) => (
  <Icon {...props}>
    <path d="m9 6 6 6-6 6" />
  </Icon>
);

export const LoaderIcon = (props: IconComponentProps) => (
  <Icon {...props}>
    <path d="M21 12a9 9 0 1 1-6.2-8.55" />
    <path d="M12 7v5l3 2" />
  </Icon>
);