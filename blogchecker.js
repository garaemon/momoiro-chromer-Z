// blogchecker.js
$(function() {
  var MAX_ARTICLE_NUM = 3;

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
        blogEntryList(data)
          .slice(0, MAX_ARTICLE_NUM)
          .each(function(i) {
            links.push(blogEntrySpec($(this)));
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