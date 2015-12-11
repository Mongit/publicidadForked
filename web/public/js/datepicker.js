$(function() {
    $( "#fechaContrato" ).datepicker({
        defaultDate: "+1w",
        changeMonth: true,
        onClose: function( selectedDate ) {
            $("#fechaVncimiento").datepicker("option", "minDate", selectedDate);
        },
        dateFormat: "yy-mm-dd"
    });
    $( "#fechaVencimiento" ).datepicker({
        defaultDate: "+1w",
        changeMonth: true,
        onClose: function( selectedDate ) {
            $( "#fechaContrato" ).datepicker ( "option", "maxDate", selectedDate );       
        },
        dateFormat: "yy-mm-dd"
    });
    
});
