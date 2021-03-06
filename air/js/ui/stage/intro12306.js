(new Gallery).addStage("intro12306", {
    header: {
        title: "火车票购买助手"
    },
    init: function() {
        var n = chrome.infobars || chrome.experimental && chrome.experimental.infobars;
        n ? $("#cn12306Otn").attr("data-targeturl", "https://kyfw.12306.cn/otn/") : $("#cn12306Otn").attr("data-targeturl", chrome.extension.getURL("/infobar/main.html?new"));
        $("#cn12306About").attr("data-targeturl", chrome.extension.getURL("/pages/about.html"));
        $("#cn12306Sppeding").attr("data-targeturl", chrome.extension.getURL("/pages/serverstatus.html"));
        $("div.intro12306 li[data-targeturl]").click(function() {
            var n = this.dataset.targeturl;
            chrome.tabs.create({
                url: n
            })
        })
    },
    prepare: function() {
        Statistics.trigger(5)
    }
})
