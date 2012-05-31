$(function() {
  var LATEST_BLOGS_ARTICLES = {};
  var WATCH_CYCLE = 60 * 1000;  //1 minute
  var UST_URL = 'http://www.ustream.tv/channel/momoclotv';
  
  function watchUpdate(name) {
    $.ajax({
      url: entryURL(name),
      error: function() {
        console.log("cannot query article for " + name + ": retry!");
        setTimeout(function() {
          watchUpdate(name);
        }, 10000);
      },
      success: function(data) {
        blogEntryList(data)
          .slice(0, 1)          //get the latest article
          .each(function(i) {
            var latest = blogEntrySpec($(this));
            if (latest.link == LATEST_BLOGS_ARTICLES[name].link) {
              console.log(name + " does not update her blog!");
            }
            else {
              // notification
              console.log(name + " writes new article!");
              LATEST_BLOGS_ARTICLES[name] = latest;
              var n = webkitNotifications.createNotification(
                blogIcon($(data)),
                japaneseName(name) + " がブログを更新しました!",
                latest.title);
              n.onclick = function() {
                chrome.tabs.create({url: latest.link});
                n.cancel();
              };
              n.show();
              LATEST_BLOGS_ARTICLES[name].notification = n; //to avoid GC problem
            }
            setTimeout(function() {
              watchUpdate(name);
            }, WATCH_CYCLE);
          });
      }
    });
  };
  
  function initializeEachBlogArticle(name) {
    console.log("initializing " + name);
    $.ajax({
      url: entryURL(name),
      error: function() {
        console.log("cannot initialize article for " + name + ": retry!");
        setTimeout(function() {
          initializeEachBlogArticle(name);
        }, 10000);
      },
      timeout: 10000,
      success: function(data) {
        console.log("get the data for " + name);
        blogEntryList(data)
          .slice(0, 1)          //get the latest article
          .each(function(i) {
            LATEST_BLOGS_ARTICLES[name] = blogEntrySpec($(this));
            console.log("initialize: " + LATEST_BLOGS_ARTICLES[name].title);
            watchUpdate(name);
          });
      }
    });
  };
  function initializeBlogArticles() {
    for (var name in accounts) {
      initializeEachBlogArticle(name);
    }
  };
    
  setTimeout(function() {
    console.log("start!");
    initializeBlogArticles();
  }, 1000);
  var n;
  // UST
  var ustream_onlinp = false;
  function ustWatch() {
    $.ajax({
      url: UST_URL,
      error: function() {
        console.log("cannot access console.log");
        setTimeout(function() {
          ustWatch();
        }, WATCH_CYCLE);
      },
      success: function(data) {
        if (data.match(/現在、番組はオフラインです/) ||
            data.match(/Channel is offline/)) {
          console.log("ustream is offline");
          ustream_onlinp = false;
          return;
        }
        else {
          if (!ustream_onlinp) {
            var icon = data.match(/class="image".+src="([^"]+)/gi)
              ? RegExp.$1 : 'img/icon.png';
            n = webkitNotifications.createNotification(icon,
                                                       "momoclotv",
                                                       'ustreamはじまってるよ!');
            n.onclick = function () {
              chrome.tabs.create({ url : UST_URL});
              notification.cancel();
            };
            n.show();
          }
        }
        setTimeout(function() {
          ustWatch();
        }, WATCH_CYCLE);
      }
    });
  };
  ustWatch();
});
