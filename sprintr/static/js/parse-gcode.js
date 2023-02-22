$(document).ready(function() {


    // This is the function that is called when the user clicks the "Send GCode" button
    $(".send-gcode").on("click", function() {

        //prevent default form submission
        event.preventDefault();
        // Get the GCode from the text box
        var gcode = document.getElementById("gcode-entry").value;
    
        // Send the GCode to the server
        req  = $.ajax({
            url : '/send_gcode',
            type : 'POST',
            data : { command : gcode },
            success: function(_response) {
                console.log("response: " + _response);
            },
            error: function(_status, _xhr, _error) {
                console.log("error");
            }
        });

        //clear the text box
        document.getElementById("gcode-entry").value = "";


        document.getElementById("gcode-response").value += gcode + "\n ";
        $('#gcode-response').scrollTop($('#gcode-response')[0].scrollHeight);

        console.log("gcode: " + gcode);
        

    });


    // var textarea = document.getElementById('gcode-response');
    // textarea.scrollBottom = textarea.scrollHeight;


    $("#home-robot").on("click", function() {
            
            //prevent default form submission
            event.preventDefault();
    
            //send the printer ip to the server 
            req  = $.ajax({
                url : '/home_robot',
                type : 'POST',
                success: function(_response) {
                    console.log("response: " + _response.result);
                },
                error: function(_status, _xhr, _error) {
                    console.log("error");
                }
            });
    
        });

    //stop the robot
    $("#stop-robot").on("click", function() {
            
            //prevent default form submission
            event.preventDefault();
    
            //send the printer ip to the server 
            req  = $.ajax({
                url : '/stop_robot',
                type : 'POST',
                success: function(_response) {
                    console.log("response: " + _response.result);
                },
                error: function(_status, _xhr, _error) {
                    console.log("error");
                }
            });
    
        });   
});