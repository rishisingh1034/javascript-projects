const videoElement = document.getElementById('video');
const button = document.getElementById('button');

//Prompt to user to select media screen
async function selectMediaStream() {
    try {
        const mediaStream = await navigator.mediaDevices.getDisplayMedia();
        videoElement.srcObject = mediaStream;
        videoElement.onloadedmetadata = () => {
            videoElement.play();
        }
    } catch (error) {
        //catch error here
        console.log('error here:', error);
    }
}

button.addEventListener('click', async () => {
    // disable button
    button.disabled = true;
    // start PiP
    await videoElement.requestPictureInPicture();
    // reset button
    button.disabled = false;
});

selectMediaStream();