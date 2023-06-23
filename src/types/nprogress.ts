declare module 'nprogress' {
  export interface Nprogress {
    done: () => void
    start: () => void
  }

  const nprogress: Nprogress
  export default nprogress
}
