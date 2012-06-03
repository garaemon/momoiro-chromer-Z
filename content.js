$(function() {
  BIRTHDAYS = {
    kanako: {
      day: 12,
      month: 7,
      color: "red"
    },
    shiori: {
      day: 4,
      month: 6,
      color: "yellow"
    },
    ayaka: {
      day: 11,
      month: 6,
      color: "pink"
    },
    momoka: {
      day: 15,
      month: 3,
      color: "green"
    },
    reni: {
      day: 21,
      month: 6,
      color: "purple"
    }
  }
  var today = new Date();
  for (var key in BIRTHDAYS) {
    var spec = BIRTHDAYS[key];
    if (spec.day == (today.getDate())
        && spec.month == (today.getMonth() + 1)) {
      console.log("hey");
      $("body").css("background-color", spec.color);
    }
  }
});