/**
 * Created by nick on 19/12/15.
 */
function addNewModule() {
    $("#modules").append($("#module-template .module").clone());
    assignRemoveButton();
}

function saveDetails() {
    console.log("saving details");
    // to save in cookies
}

function assignRemoveButton() {
    $(".remove-button").on("click", function() {
        $(this).closest(".module").remove();
    });
}

$(function() {
    var NUM_MODULES_TO_START_WITH = 5;
    for (var i = 0; i < NUM_MODULES_TO_START_WITH; i++) {
        addNewModule();
    }
    assignRemoveButton()
});