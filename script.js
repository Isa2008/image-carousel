(function () {
    var images = document.getElementsByClassName('image');
    var dots = document.getElementsByClassName('dot');
    var timer;
    var current = 0;
    var transitioningRightNow;

    setTimeout(moveImages, 3000);

    // move the last image to the initial position after the current one moves into the screen
    document.addEventListener('transitionend', function(e) {
        if (e.target.classList.contains('exit')) {
            e.target.classList.remove('exit');
            timer = setTimeout(moveImages, 3000);
            // tell the function the transition is over
            transitioningRightNow = false;
        }
    });

    for (var i = 0; i < dots.length; i++) {
        dots[i].addEventListener('click', getDotClickHandler(i));
    }

    function getDotClickHandler(n) {
        return function(e) {
            if (e.target.classList.contains('on')) {
                return;
            }
            if (transitioningRightNow) {
                return;
            }
            clearTimeout(timer);
            moveImages(n);
        };
    }

    function moveImages(next) {
        transitioningRightNow = true;
        // remove onscreen and add exit classes to the current image and dot
        images[current].classList.remove('onscreen');
        images[current].classList.add('exit');
        dots[current].classList.remove('on');
        // console.log('The current image is ' + current);

        if (typeof next == 'undefined') {
            current++;
            if (current >= images.length) {
                current = 0;
            }
        } else {
            current = next;
        }
        // add onscreen class to the next image and dot
        images[current].classList.add('onscreen');
        dots[current].classList.add('on');
        console.log('The NEW current image is ' + current);
    }
})();
