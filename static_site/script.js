$(".screen").hide();
$("#splashScreen").show();
//$("#movieScreen").show();
//$("#peopleScreen").show();



$("#splashBtn").click(function() {
    $("#screenList").hide();
    $(".screen").hide();
    $("#splashScreen").show()
});
$("#movieBtn").click(function() {
    $("#screenList").hide();
    $(".screen").hide();
    $("#movieScreen").show()
});
$("#peopleBtn").click(function() {
    $("#screenList").hide();
    $(".screen").hide();
    $("#peopleScreen").show()
});