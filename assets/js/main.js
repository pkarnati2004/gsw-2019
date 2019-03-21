function countdown() {
    // Set the date we're counting down to
    var countDownDate = new Date("Dec 1, 2018 15:37:25").getTime();

    // Update the count down every 1 second
    var x = setInterval(function() {

        // Get todays date and time
        var now = new Date().getTime();

        // Find the distance between now and the count down date
        var distance = countDownDate - now;

        // Time calculations for days, hours, minutes and seconds
        var days = Math.floor(distance / (1000 * 60 * 60 * 24));
        var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((distance % (1000 * 60)) / 1000);

        // Output the result in an element with id="demo"
        document.getElementById("demo").innerHTML = days + "d " + hours + "h " +
            minutes + "m " + seconds + "s ";

        // If the count down is over, write some text 
        if (distance < 0) {
            clearInterval(x);
            document.getElementById("demo").innerHTML = "EXPIRED";
        }
    }, 1000);
}

function getSpeakers() {
    var filename = 'data/bios2.csv'
    Papa.parse(filename, {
        download: true,
        header: true,
        complete: function(results) {
            console.log(results);

            var speakers = results['data']
            var rows = speakers.length
            console.log(rows);

            for (var i = 1; i < rows; i++) {
                var currentSpeaker = speakers[i];
                console.log(currentSpeaker);

                var name = currentSpeaker['WebName'];

                var first = currentSpeaker['First Name']

                var anchor = name.replace(/ /g, "_");

                var path = currentSpeaker['headshot'];
                var bio = currentSpeaker['Bio'];
                var title = currentSpeaker['Job Title'];

                var wait = currentSpeaker['Wait']

                // if (bio.length == 0) {
                //     var bio = currentSpeaker['Bio'];
                // }

                var associationMarkup = currentSpeaker['MIT'] == 'Y' ?
                    '<img class=\'speaker-picture-association\' src=\'images/speaker/mit.png\'/>' : '';

                var imageMarkup = '<div class=\'speaker col-sm-6 col-md-3\'>' +
                    associationMarkup +
                    '<img class=\'speaker-picture\' src=\'images/speaker-img/' + path + '\'>';
                // markup += imageMarkup + name + '</div>';

                speakerInfoMarkup = '<div class=\'row speaker-expanded-bio\'>' +
                    '<span class=\"anchor\" id=\"' + anchor + '\"></span>' +
                    imageMarkup + '</div><div class=\'col-sm-6 col-md-9 speaker-expanded-text\'>' +
                    '<div class=\'speaker-expanded-name\'>' + name + '</div>' +
                    '<div class=\'speaker-expanded-position\'>' + title + '</div>' +
                    bio + '</div></div>';

                keynoteMarkup = '<div class=\'speaker row\'>' +
                    associationMarkup +
                    '<img class=\'speaker-picture-keynote\' src=\'images/speaker-img/' + path + '\'>';
                keynoteMoreMarkeup = '<div class=\'col-lg-12 speaker-expanded-bio\'>' +
                    keynoteMarkup + '</div><div class=\'row speaker-expanded-text\'>' +
                    '<div class=\'speaker-expanded-name\' style=\'text-align: center\'>' + name + '</div>' +
                    '<div class=\'speaker-expanded-position\' style=\'text-align: center\'>' + title + '</div>' +
                    bio + '</div></div>';

                // if (currentSpeaker['Keynote'] == 'Y') {
                //     $(keynoteMoreMarkeup).appendTo('#keynote-section-expanded');
                // } else {
                //     $(speakerInfoMarkup).appendTo('#speaker-section-expanded');
                // }

                speakerSmallMarkup = '</div><div class="team-speaker col-md-4" style="padding: 20"><a href="#modal-text-' + first + '"data-modal-id="modal-text" data-toggle="modal">' +
                    associationMarkup +
                    '<img class="team-picture" src=\'images/speaker-img/' + path + '\'>' +
                    '<div class="team-name">' + name + '</div>' +
                    '<div class="team-role" style="font-size: 0.6em">' + title + '</div>' +
                    // '<div class="team-area">MIT Health Sciences Technology</div>' +
                    '</div>'

                modalMarkup = '<div class="modal fade" id="modal-text-' + first + '" tabindex="-1" role="dialog" aria-labelledby="modal-text-label">' +
                    '<div class="modal-dialog" role="document">' +
                    '<div class="modal-content"> <div class="modal-header"> <button type="button" class="close" data-dismiss="modal" aria-label="Close" onclick="document.getElementById(\'video\').pause();">' +
                    ' <span aria-hidden="true">&times;</span> </button> </div>' +
                    ' <div class="modal-body">' +

                    speakerInfoMarkup

                    ' </div></div></div> </div>';

                if (wait != 'Y') {
                    $(speakerSmallMarkup).appendTo('#speaker-section-expanded');
                    $(modalMarkup).appendTo('#speaker-modals');
                }

                console.log(speakerInfoMarkup);


            }

        }
    });
}

// getSpeakers()

// countdown()