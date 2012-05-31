var accounts = {
  "reni": "takagi-sd",
  "kanako": "momota-sd",
  "shiori": "tamai-sd",
  "ayaka": "sasaki-sd",
  "momoka": "ariyasu-sd"
//  "momorikobuta": "momoclo-staff"
};

var fullNames = {
  "reni": "高城れに",
  "kanako": "百田夏菜子",
  "shiori": "玉井詩織",
  "ayaka": "佐々木彩夏",
  "momoka": "有安杏果"
  //"momorikobuta": "ももりこぶた"
};

function blogBaseURL(name) {
  return "http://ameblo.jp/" + accounts[name];
};
function entryURL(name) {
  return blogBaseURL(name) + "/entrylist.html";
};

function blogEntryList(data) {
  return $(data).find("#recent_entries_list ul li");
};

function blogEntrySpec(li) {
  return {
    title: li.find(".newentrytitle a").html(),
    link: li.find(".newentrytitle a").attr("href"),
    updated_at: li.find(".updatetime").html()
  };
};

function japaneseName(name) {
  return fullNames[name];
};

function blogIcon(html) {
  var ret = html.find("#person ul li a img").attr("src");
  return ret;
};
