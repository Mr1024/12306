(new Gallery).addStage("advBusTicket", {
    header: {
        title: "抢汽车票"
    },
    temp: !0,
    init: function() {
        $(".advImage, .advBtn", $('[_stage="advBusTicket"]')).click(function() {
            Statistics.trigger(54);
            chrome.tabs.create({
                url: config.urls.advBusTicket
            })
        })
    },
    prepare: function() {
        Statistics.trigger(53)
    }
})
