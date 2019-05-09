export function concatenate(...fragments: (string | null | undefined | false)[]): string {
  return fragments.filter(Boolean).join(' ')
}
