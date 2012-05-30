// blogchecker.js
$(function() {
  var MAX_ARTICLE_NUM = 3;
  var accounts = {
    "reni": "takagi-sd",
    "kanako": "momota-sd",
    "shiori": "tamai-sd",
    "ayaka": "sasaki-sd",
    "momoka": "ariyasu-sd"
  };
  function blogBaseURL(name) {
    return "http://ameblo.jp/" + accounts[name];
  };
  function entryURL(name) {
    return blogBaseURL(name) + "/entrylist.html";
  };

  function createBlogItem(spec) {
    return '<li><p>'
      + '<a href="'
      + spec.link + '">'
      + spec.title + '</a>'
      + ' (' + spec.updated_at + ') '
      + '</p></li>';
  };
  
  function updateRecentArticles(name) {
    var url = entryURL(name);
    $.ajax({
      url: url,
      error: function() {
                
      },
      success: function(data) {
        var links = [];
        $(data)
          .find("#recent_entries_list ul li")
          .slice(0, MAX_ARTICLE_NUM)
          .each(function(i) {
            console.log("hoge");
            links.push({
              title: $(this).find(".newentrytitle a").html(),
              link: $(this).find(".newentrytitle a").attr("href"),
              updated_at: $(this).find(".updatetime").html()
            });
          });
        $("#" + name + "-blog ul").append(links.map(function(x) {
          return createBlogItem(x);
        }).join(""));
        $("a").unbind("click")
        .click(function(e) {
          chrome.tabs.create({url: $(this).attr("href")});
        });
      }});
  };

  
  for (var name in accounts) {
    updateRecentArticles(name);
  }

});