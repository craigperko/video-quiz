/*
<<<<<<< HEAD
JQuery Plugin used to overlay a quiz question on top of a youtube video. Requires quiz.js to do the
actual quiz part.

See readme.
*/

=======
JQuery Plugin used to overlay a quiz question on top of a youtube video.

Sample Usage:

var videoId = 'someYouTubeVideoID';

$('#videoContainer').videoQuiz({
    'videoId': videoId,
    questions: [{
        text: "Does this work?",
        answers: [{
            left: 30,
            top: 30
        },
        {
            left: 140,
            top: 150
        }]
    }]
});

*/
>>>>>>> 6359b9765eb4e4959e36d2fda4b7db19109b3e78
 (function($j) {

    var iFrameApiInitted = false,
    iFrameApiInitBegin = false;

    var neededPlayersPostInit = [];

    var addPlayerIFrame = function(videoId, containerDOM, width, height, bookmark) {

        height = height || '323';
        width = width || '530';
        if (!iFrameApiInitted) {
            neededPlayersPostInit.push(arguments);
            initIFrameApi();
            return;
        }

        var onReady;
        if (bookmark) {
            onReady = function(event) {
                event.target.seekTo(bookmark);
            }
        }
        else {
            onReady = onPlayerReady;
        }

        videoQuizOnPlayerRead = onReady;
        videoQuizOnPlayerStateChange = onPlayerStateChange;
        var player = new YT.Player(containerDOM, {
            height: height,
            width: width,
            videoId: videoId,
            playerVars: {
                wmode: "transparent"
            },
            events: {
                'onReady': videoQuizOnPlayerRead,
                'onStateChange': videoQuizOnPlayerStateChange = onPlayerStateChange
            }
        });
        return player;
    };

    var initIFrameApi = function() {
        if (! (iFrameApiInitted || iFrameApiInitBegin)) {
            iFrameApiInitBegin = true;
            onYouTubePlayerAPIReady = function() {

                iFrameApiInitted = true;
                iFrameApiInitBegin = false;
                if (neededPlayersPostInit && neededPlayersPostInit.length > 0) {
                    $j.each(neededPlayersPostInit,
                    function() {
                        addPlayerIFrame.apply(null, this);
                    })
                }

            }
            // 2. This code loads the IFrame Player API code asynchronously.
            var tag = document.createElement('script');
            tag.src = "http://www.youtube.com/player_api";
            var firstScriptTag = document.getElementsByTagName('script')[0];
            firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
        }
    };

    var onPlayerStateChange = function(event) {
        //Youtube api said as of 9.14.11 event.data but that's undefined, now seems to be event.target.a.playerState
        //10.14.11 even more confusing now i'm finding it in event.target.f not event.target.a but can't find any documentation of this
        //behavior
<<<<<<< HEAD
		
		// CP The data it sends appears to be limited to START (3), PAUSE (2), and PLAYING (1). This doesn't appear to send
		// seek events, although the yt player prints seek events to the console, so they exist SOMEWHERE.
		
        //console.log('onPlayerStateChange');
        //console.log(event);
=======
        console.log('onPlayerStateChange');
        console.log(event);
>>>>>>> 6359b9765eb4e4959e36d2fda4b7db19109b3e78
        var findPlayer = event.data || event.target.a || event.target.f;
        if (findPlayer && findPlayer.playerState == YT.PlayerState.PLAYING && !done) {
            //setTimeout(stopVideo, 6000);
            done = true;
        }
<<<<<<< HEAD
		playerStateInterpreter(event.data);
    };
	
	var playerStateInterpreter = function(event) {
		// CP Change the state of the quiz to the state of the video.
		var quiz = quizList[activeQuiz];
		quiz.videoState = event;
		
		switch (event)
		{
			default: console.log("Unknown state change from player: " + event); break;
			case 1: console.log("PLAYING"); break;
			case 2: console.log("PAUSE"); break;
			case 3: console.log("PLAY"); break;
		}
	};
=======
    };
>>>>>>> 6359b9765eb4e4959e36d2fda4b7db19109b3e78

    var onPlayerReady = function(event) {
        //   event.target.playVideo();
        console.log('ready');
        console.log(event);
    }
    var methods = {
        init: function(options) {
<<<<<<< HEAD
			var quiz = options.quiz;
			
			if (! quiz)
			{
				alert("You have passed nothing as your quiz, which doesn't even give us a video ID. So nothing is going to happen.");
				return;
			}
			
			quiz = new Quiz(quiz);
			
			var unwrappedDiv = this[0];
            addPlayerIFrame(quiz.videoId, unwrappedDiv, quiz.width, quiz.height);
=======
            options = options || {};
            var unwrappedDiv = this[0];

            addPlayerIFrame(options.videoId, unwrappedDiv, options.width, options.height);

            var questionContainer = this.find('.questionContainer');
            if (questionContainer.length === 0) {
                questionContainer = $('<div class="questionContainer"/>').appendTo(this);
            }
            if (options.questions) {
                var questionDOM;
                $.each(options.questions,
                function() {
                    if (this.text) {
                        //text is optional. afterall the question may be in the video itself.
                        questionDOM = $('<div class="questionText"/>').text(this.text).appendTo(questionContainer);
                    }

                    var answers = this.answers;
                    $.each(answers,
                    function(index) {
                        var answer_id = this.id || ('answer_' + index);
                        var cb = $('<input type="checkbox"/>').attr('id', answer_id).css('left', this.left).css('top', this.top).appendTo(questionDOM);
                    });
                    var ok = $('<button class="done">Done</button>').appendTo(questionContainer);
                });
            }
>>>>>>> 6359b9765eb4e4959e36d2fda4b7db19109b3e78
        }
    };

    $j.fn.videoQuiz = function(method) {
<<<<<<< HEAD
		// Method calling logic
=======

        // Method calling logic
>>>>>>> 6359b9765eb4e4959e36d2fda4b7db19109b3e78
        if (methods[method]) {
            return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
        } else if (typeof method === 'object' || !method) {
            return methods.init.apply(this, arguments);
        } else {
            $j.error('Method ' + method + ' does not exist on jQuery.vertex');
        }

    };

})(jQuery);
<<<<<<< HEAD

=======
>>>>>>> 6359b9765eb4e4959e36d2fda4b7db19109b3e78
