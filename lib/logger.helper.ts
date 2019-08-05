export function getToken(name?: string): string {
  return name ? `LOGGER_${name.toUpperCase()}` : 'LOGGER_DEFAULT';
}
