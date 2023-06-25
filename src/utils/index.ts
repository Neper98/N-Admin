export function fullScreen(element: HTMLElement = document.documentElement) {
  const isFull = !!document.fullscreenElement
  isFull ? document.exitFullscreen?.() : element.requestFullscreen?.()
}
