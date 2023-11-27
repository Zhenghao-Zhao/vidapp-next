'use client'

type Props = {
  children: React.ReactNode;
}

export default function DropdownWrapper({ children }: Props) {
  return (
    <div>
      {children}
    </div>
  )
}