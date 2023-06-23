export function fullScreen(element){
    const isFull = !!(document.webkitIsFullScreen || document.mozFullScreen || document.msFullscreenElement || document.fullscreenElement)
    if(isFull) {
        if(document.exitFullscreen) {
            document.exitFullscreen()
        }else if (document.msExitFullscreen) {
            document.msExitFullscreen()
        }else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen()
        }else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen()
        }
    }else{
        if(element.requestFullscreen) {
            element.requestFullscreen()
        }else if(element.msRequestFullscreen) {
            element.msRequestFullscreen()
        }else if(element.mozRequestFullScreen) {
            element.mozRequestFullScreen()
        }else if(element.webkitRequestFullscreen) {
            element.webkitRequestFullscreen()
        }
    }
}