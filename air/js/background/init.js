(function(){var t=(new FlightMonitorBox).getAll(),n,i=[],r;(new FlightMonitorBox).getCount()>0?(Util.updateIcon("icons/icon_16.png"),(new TimerManager).getTimer("flip").start()):(Util.updateIcon("icons/gray.png"),(new TimerManager).getTimer("flip").halt());for(n in t)t[n].flight.getData(!0,!0,function(){chrome.browserAction.setBadgeText({text:""});delete t[n].error},function(r){chrome.browserAction.setBadgeText({text:"!"});t[n].error=r;r.name==="QuerySoldOutError"&&i.push({flightId:n,status:"售罄"});r.name==="QueryDateError"&&i.push({flightId:n,status:"过期"})},function(){(new FlightMonitorBox).persistenceOne(n);i.length&&(Storage.set("showStage",{name:"ticketAdvice",data:{errors:i,advice:"请您重新设置"}}),Util.popup());r=Math.floor(Math.random()*120)*1e3;t[n].monitor.lastTime=Util.date.now()-r;(new TimerManager).addTimer(getFlightTimer(n,config.monitor.interval-r));(new TimerManager).getTimer(n).start()})})(),function(){Storage.get(!1)&&(new TimerManager).getTimer("bargain").start()}()