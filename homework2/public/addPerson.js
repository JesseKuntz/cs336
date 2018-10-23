$(document).ready(function() {
    $('form').submit(function(event) {
        event.preventDefault();

        var myData = {"firstName": $( "#first" ).val(),
                        "lastName": $( "#last" ).val(),
                        "loginID": $( "#id" ).val(),
                        "startDate": $( "#date" ).val()}

        $.ajax({
            type: 'POST',
            url: '/people',
            contentType: 'application/json',
            data: JSON.stringify(myData),
            dataType: 'json'
        })
        .done(function(jsonString) {
            // Keep the list at the bottom of the page updated.
            $('ul').append('<li>' + JSON.stringify(jsonString) + '</li>');
        })
        .fail(function( xhr, status, errorThrown ) {
            alert("There was a problem.");
            console.log("Error: " + errorThrown);
            console.log("Status: " + status);
            console.dir(xhr);
        })
    });

    // Display a list of people that are currently in the people.json file.
    $('<ul></ul>').insertAfter('#people');

    $.get("/people", function(data) {
        for (const person of data) {
            $('ul').append('<li>' + JSON.stringify(person) + '</li>');
        }
    }, 'json');

});