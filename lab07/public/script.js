$( document ).ready(function() {

    $("#dataBtn").button();
    $("#dataBtn").click(function(){
        // Check if the element exists. If not, add it.
        if($("#data").length === 0) {
            $("<em>", {html: "<span id='data'>...</span>"}).appendTo("body");
        }

        $.ajax({
            // The URL for the request
            url: "/hello",

            // Whether this is a POST or GET request
            type: "GET",

            // The data to send (will be converted to a query string)
            data: {
                name: "Hello, Lab 07!"
            }
        })
        .done(function(result) {
            $("#data").html(result.content);
        })
        .fail(function(xhr) {
            $("#data").html(xhr.statusText);
        })
    });

});