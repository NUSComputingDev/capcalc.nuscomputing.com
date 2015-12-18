/**
 * Created by nick on 19/12/15.
 */
function addNewModule() {
    $("#modules").append($("#module-template .row").clone());
    //$("body").append();
    console.log("hello");
}

function saveDetails() {
    console.log("saving details");
}

$(function() {
    var NUM_MODULES_TO_START_WITH = 5;
    for (var i = 0; i < NUM_MODULES_TO_START_WITH; i++) {
        addNewModule();
    }
});
$(document).ready(function() {
    console.log("asd");
});