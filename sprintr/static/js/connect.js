$(document).ready(function() {
    var robot_connected = false;
    var printer_connected = false;

    // Connect to robot when user clicks connect button
    $("#connect-robot-btn").on("click", function() {

        //prevent default form submission
        event.preventDefault();

        var robot_ip = document.getElementById("robot-url").value;
        console.log("robot_ip: " + robot_ip);

        req = $.ajax({
            url : '/connect_robot',
            type : 'POST',
            data: { robot : robot_ip },
            success: function(_response) {
                console.log("response: " + _response.result);
            },
            error: function(_status, _xhr, _error) {
                console.log("error");
            },

        //display alert if connection is successful or not
        }).done(function(data) {
            if (data.result == "success") {
                //alert("Connection successful!");
                $("#connect-robot-btn").prop("disabled", true);
                $("#robot-success").text("Connected to robot at " + robot_ip + "!").show();
                $("#robot-error").hide();
                robot_connected = true;
                check_connection();
            } else {
                //alert("Connection failed!");
                $("#robot-error").text("Connection failed!").show();
                $("#robot-success").hide();
            }
        });
    });


    // This is the function that is called when the user submits printer ipb
    $("#connect-printer-btn").on("click", function() {

        //prevent default form submission
        event.preventDefault();

        var printer_ip = document.getElementById("printer-ip").value;
        console.log("printer_ip: " + printer_ip);

        //send the printer ip to the server 
        req  = $.ajax({
            url : '/connect_printer',
            type : 'POST',
            data: { printer : printer_ip },
            success: function(_response) {
                console.log("response: " + _response.result);
            },
            error: function(_status, _xhr, _error) {
                console.log("error");
            },
        })
        // display alert if connection is successful or not
        .done(function(data) {
            if (data.result == "success") {
                //alert("Connection successful!");
                $("#connect-printer-btn").prop("disabled", true);
                $("#printer-success").text("Connected to printer at " + printer_ip + "!").show();
                $("#printer-error").hide();
                printer_connected = true;
                check_connection();
            } else {
                //alert("Connection failed!");
                $("#printer-error").text("Connection failed!").show();
                $("#printer-success").hide();
            }

        });
    });

    //check connection
    function check_connection() {
        if (robot_connected && printer_connected) {
            console.log("both connected");
            $("#connection-complete-btn").show();    
        };
    };
});