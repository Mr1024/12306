(new Gallery).addStage("advPresent", {
    header: {
        title: "中秋节礼物"
    },
    temp: !0,
    init: function() {
        $(".advImage, .advBtn", $('[_stage="advPresent"]')).click(function() {
            Statistics.trigger(56);
            chrome.tabs.create({
                url: config.urls.advPresent
            })
        })
    },
    prepare: function() {
        Statistics.trigger(55)
    }
})
