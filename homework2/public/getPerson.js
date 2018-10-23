$(document).ready(function() {
    $('form').submit(function(event) {
        event.preventDefault();

        $.ajax({
            type: 'GET',
            url: '/person/' + $("#id").val(),
            contentType: 'application/json',
            dataType: 'json'
        })
        .done(function(jsonString) {
            // Replace the current person information with the new one.
            $('p').text(JSON.stringify(jsonString));
        })
        .fail(function( xhr, status, errorThrown ) {
            alert("There was a problem.");
            console.log( "Error: " + errorThrown );
            console.log( "Status: " + status );
            console.dir( xhr );
        })
    });

    $('<p></p>').insertAfter('#person');
    let url = window.location.href.toString().split('/');
    let id;
    if (url[url.length - 1] == "") {
        id = url[url.length - 2];
    } else {
        id = url[url.length - 1];
    }
    $.get("/person/" + id, function(data) {
        $('p').text(JSON.stringify(data));
    }, 'json');
});