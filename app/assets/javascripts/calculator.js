/**
 * Created by nick on 19/12/15.
 */
function addNewModule() {
    $("#modules").append($("#module-template .module").clone());
    assignRemoveButton();
}

function saveDetails() {
    console.log("saving details");
    // TODO to save in cookies
}

function calculate() {
    console.log("calculating!");

    var semester = {};
    semester.totalMc = 0;
    semester.gradedMc = 0;
    semester.totalGradePoint = 0.000;
    semester.cap = 0.000;

    $("#modules .module").each(function() {
        var grade = parseFloat($(this).find(".grade").val());
        var mc = parseInt($(this).find(".mc").val());
        var gradePoint = grade * mc;

        semester.totalMc += mc;
        if (grade >= 0) {
            semester.gradedMc += mc;
            semester.totalGradePoint += gradePoint;
        }

        semester.cap = semester.totalGradePoint / semester.gradedMc;
        console.log(semester.gradedMc);
    });

    $("#semester-cap").html(semester.cap.toFixed(3));
    $("#semester-total-mc").html(semester.totalMc);
    $("#semester-graded-mc").html(semester.gradedMc);

    var overall = {};
    overall.gradedMc = 0;
    overall.totalGradePoint = 0.000;
    overall.cap = 0.000;

    var prevCap = 0;
    var prevCapUnparsed = $("#prev-cap").val();
    if (prevCapUnparsed != "") {
        prevCap = parseFloat($("#prev-cap").val());
        if (prevCap < 0) {
            prevCap = 0;
        }
    }

    var prevGradedMc = 0;
    var prevGradedMcUnparsed = $("#prev-graded-mc").val();
    if (prevGradedMcUnparsed != "") {
        prevGradedMc = parseInt($("#prev-graded-mc").val());
        if (prevGradedMc < 0) {
            prevGradedMc = 0;
        }
    }

    var prevGradePoint = prevCap * prevGradedMc;
    console.log(prevGradePoint);
    console.log(prevCap);
    console.log(prevGradedMc);
    console.log(prevGradePoint);

    overall.totalGradePoint = semester.totalGradePoint + prevGradePoint;
    overall.gradedMc = prevGradedMc + semester.gradedMc;
    if (overall.gradedMc != 0) {
        overall.cap = overall.totalGradePoint / overall.gradedMc;
    }

    console.log(overall.cap);

    $("#overall-cap").html(overall.cap.toFixed(3));
    $("#overall-graded-mc").html(overall.gradedMc);

    // scroll to the results part
    $('html, body').animate({
        scrollTop: $("#calculation-results").offset().top
    }, 800);
    // highlight that shit
    $(".results-box").effect("highlight", {}, 800);
}

function assignRemoveButton() {
    $(".remove-button").on("click", function() {
        $(this).closest(".module").remove();
    });
}

function assignAddButton() {
    $(".add-button").on("click", function() {
        addNewModule();
    });
}

function assignCalcButton() {
    $(".calculate-button").on("click", function() {
        calculate();
    });
}

$(function() {
    var NUM_MODULES_TO_START_WITH = 5;
    for (var i = 0; i < NUM_MODULES_TO_START_WITH; i++) {
        addNewModule();
    }
    assignRemoveButton();
    assignAddButton();
    assignCalcButton();
});