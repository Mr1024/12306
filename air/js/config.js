var config = {
    appId: "gkbheeokbgmmnbjhhlphckobccejghjn",
    appearance: {
        width: 340,
        height: 400
    },
    history: {
        length: 8,
        width: 222
    },
    query: {
        defaultFrom: "北京",
        defaultTo: "上海",
        delay: 400,
        interval: 400,
        other: 4
    },
    promotion: {
        limit: 3,
        slient: 864e5
    },
    monitor: {
        limit: 4,
        extraLeast: 5,
        minTime: 500,
        interval: 6e5,
        flip: 6e4,
        absolute: 864e5,
        retryTimes: 3,
        retryInterval: 36e5
    },
    cheap: {
        interval: 6e5,
        delay: 500
    },
    urls: {
        train: "https://dynamic.12306.cn/otsweb/",
        ex12306: "http://static.liebao.cn/_softdownload/9d0d790e-d78f-43b3-8e4a-34f7ec57e851.crx",
        feedback: "http://bbs.liebao.cn/thread-135982-1-1.html",
        cheapTicket: "http://api.liebao.cn/flight-extension/cheapTravel.php?location=",
        cheapNotice: "http://api.liebao.cn/flight-extension/cheapTravel.php?new=1&location=",
        kuxunSuffix: "&fromid=kliebao-20130131",
        lottery: "http://bbs.liebao.cn/thread-138725-1-1.html",
        welcome: "http://www.liebao.cn/go/ticket/welcome.html",
        location: "http://weather.123.duba.net/weatherinfo/?callback=getFromFlight",
        weather: "http://weatherapi.market.xiaomi.com/wtr/data/weather2?city_id=",
        advPresent: "http://tuan.duba.com/zt/autumn.html",
        advBusTicket: "http://www.trip8080.com/"
    },
    adv: {
        mid8range: [13778784e5, 13797792e5],
        presentInterval: 864e5,
        ticketTimes: 30
    },
    for12306: {
        ticketTimes: 30
    }
}
