export function fullScreen(element: HTMLElement) {
  const isFull = !!document.fullscreenElement
  isFull ? document.exitFullscreen?.() : element.requestFullscreen?.()
}
