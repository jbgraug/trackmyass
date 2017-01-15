"use strict";

(function() {
    // playVideoById('video2');
    let videoElem = camOn();
    enableSnapShot(videoElem);
    trackFace(videoElem);
})();

function camOn() {
    const video = document.getElementById('video1');

    // Get access to the camera!
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        // Not adding `{ audio: true }` since we only want video now
        navigator.mediaDevices.getUserMedia({ video: true })
            .then(function(stream) {
                video.src = window.URL.createObjectURL(stream);
                video.play();
            })
            .catch(e => alert('No access to cam!'));
    }
    return video;
}

function enableSnapShot(video) {
    var canvas = document.getElementById('canvas');
    var context = canvas.getContext('2d');
    document.getElementById("snap")
        .addEventListener("click", function() {
            context.drawImage(video, 0, 0, 320, 240);
        })
}

function playVideoById(videoId) {
    let video = document.querySelector('#' + videoId);
    video.play();
}

function trackFace(video) {
    var objects = new tracking.ObjectTracker('face');
    objects.on('track', function(event) {
        if (event.data.length === 0) {
            removeShape();
        } else {
            //console.log(event)
            event.data.forEach(function(rect) {
                //console.log(rect)
                drawShape(video, rect.x, rect.y, rect.height, rect.width);
            });
        }
    });
    tracking.track('#video1', objects);
}

let shape = document.querySelector('#shape')

function removeShape() {
    //console.log(shape.style.display)
    shape.style.display = 'none';
}

function drawShape(video, posX, posY, height, width) {
    const unit = 'px';
    shape.style.display = null
    shape.style.left = (video.offsetLeft + posX) + unit
    shape.style.top = (video.offsetTop + posY) + unit
    shape.style.height = height + unit
    shape.style.width = width + unit
}