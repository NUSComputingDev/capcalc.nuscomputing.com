function addNewModule() {
    $("#modules").prepend($("#module-template .module").clone().show("fade", {}, 300));
    assignRemoveButton();
}

function getPrevCap() {
    var prevCap = "";
    var prevCapUnparsed = $("#prev-cap").val();
    if (prevCapUnparsed !== "") {
        prevCap = parseFloat(prevCapUnparsed);
        if (prevCap < 0) {
            prevCap = 0;
        }
    }
    return prevCap;
}

function getPrevGradedMc() {
    var prevGradedMc = 0;
    var prevGradedMcUnparsed = $("#prev-graded-mc").val();
    if (prevGradedMcUnparsed !== "") {
        prevGradedMc = parseInt($("#prev-graded-mc").val());
        if (prevGradedMc < 0) {
            prevGradedMc = 0;
        }
    }
    return prevGradedMc;
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

    var prevCap = getPrevCap();
    var prevGradedMc = getPrevGradedMc();
    if (prevCap === 0 || prevGradedMc === 0) {
        prevCap = 0;
        prevGradedMc = 0;
    }
    var prevGradePoint = prevCap * prevGradedMc;

    overall.totalGradePoint = semester.totalGradePoint + prevGradePoint;
    overall.gradedMc = prevGradedMc + semester.gradedMc;
    if (overall.gradedMc != 0) {
        overall.cap = overall.totalGradePoint / overall.gradedMc;
    }

    $("#overall-cap").html(overall.cap.toFixed(3));
    $("#overall-graded-mc").html(overall.gradedMc);

    // scroll to the results part
    $('html, body').animate({
        scrollTop: $("#calculation-results").offset().top
    }, 500);

    // highlight boxes
    $(".results-box").effect("highlight", {}, 800);
}

function assignRemoveButton() {
    $(".remove-button").on("click", function() {
        $(this).closest(".module").hide("blind",
            {},
            300,
            function() {
                $(this).remove();
            });
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

function assignRecalcButton() {
    $(".recalculate-button").on("click", function() {
        // scroll to the modules part
        $('html, body').animate({
            scrollTop: $("#current-sem").offset().top
        }, 500);
    });
}

$(function() {

    // initialise prev sem details with saved values
    if (localStorage.getItem("existsPrev") !== null) {
        $("#prev-cap").val(localStorage.getItem("prevCap"));
        $("#prev-graded-mc").val(localStorage.getItem("prevGradedMc"));
    }

    // set the onchange for the fields
    $("#prev-cap").change(function() {
        localStorage.setItem("prevCap", getPrevCap());
        if (localStorage.getItem("prevCap") !== 0) {
            localStorage.setItem("existsPrev", true);
        } else {
            localStorage.removeItem("existsPrev");
        }
    });
    $("#prev-graded-mc").change(function() {
        localStorage.setItem("prevGradedMc", getPrevGradedMc());
        if (localStorage.getItem("prevGradedMc") !== 0) {
            localStorage.setItem("existsPrev", true);
        } else {
            localStorage.removeItem("existsPrev");
        }
    });


    // initialise with some modules
    var NUM_MODULES_TO_START_WITH = 5;
    for (var i = 0; i < NUM_MODULES_TO_START_WITH; i++) {
        addNewModule();
    }

    // assign all the buttons onclicks
    assignRemoveButton();
    assignAddButton();
    assignCalcButton();
    assignRecalcButton();
});