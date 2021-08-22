var room = HBInit({
    roomName: "👂 eduHax KAPTANLI YENEN SAHADA",
    maxPlayers: 11,
    public: false,
    noPlayer: true
});

room.setDefaultStadium("Classic");
room.setTimeLimit(3);
room.setScoreLimit(5);
room.setTeamsLock(1);

room.setTeamColors(1, 60, 0x000000,[0xF4A460]);
room.setTeamColors(2, 60, 0x000000,[0x9300FF]);


//room.setTeamColors(1, 120, 0xCFCFCF, [0x6E0050],[0x5C0043],[0x6E0050]);
//room.setTeamColors(2, 60, 0xCFCFCF, [0x06606E],[0x304F54],[0x06606E]);
//colors red 120 CFCFCF 6E0050 5C0043 6E0050
//colors blue 60 CFCFCF 06606E 304F54 06606E

var oyuncular;
var tarih;
var adminler = {
    nick: ["alsaPeran","Efekan","gupsekin","luck","Ajora","dodo"],
    pid: ["OUXJy2x6SpNJePWJLm14Kojtsg3R-RAj3fgfyLseIIg",
	"jbpwx3B3qf7nVeXVUaH7FxCG3Fu7RD_cN1tK9Fx7laI",
	"d0XrTda2G2vqWgCzn-X1Ri41QRf4YkxK00ngOt4cbCA",
	"7WGF3RuM8TP6ze1CClmKdpxt-u3NGOCYctERswF7Pyo",
	"RiFLM2kYPV9RtH51t05ekr0OPMjvjATjGhWeKmfo1xU",
	"e3AvL-Ul2AQdyCe9-NIPJcEPYHfnIhwreepfro5Oo6c"]
};
var renkler = {
    mavi: 0x5689E5,
    kirmizi: 0xE56E56,
    altin: 0xDAA520
}

function yetki(player){
	oyuncular = room.getPlayerList();
	
	for(let i=0; i<oyuncular.length; i++)
    {
        if(player.auth == adminler.pid[i])
        {
            room.setPlayerAdmin(player.id,true);
        }
    }
	
    if(oyuncular.length>0)
	{
        let sayac = 0;
        for(let i=0; i<oyuncular.length; i++)
        {
            if(oyuncular[i].admin == false)
            {
                sayac++;
            }
        }
        
        if(sayac==oyuncular.length)
        {
            room.setPlayerAdmin(oyuncular[0].id,true);
            sayac=0;
        }
    }
    else
        return;
}

room.onPlayerJoin = function(player) {
	tarih = new Date();
    oyuncular = room.getPlayerList();
    yetki(player);
    if(oyuncular.length>=11)
	    room.sendAnnouncement("Kapasiteye ulaşıldı. ("+ oyuncular.length + "/" + oyuncular.length + ")",null,renkler.altin,"normal",0);
	
	console.log(tarih.getDate() + "/" + (tarih.getMonth()+1) + "/" + tarih.getFullYear() + " - " + tarih.getHours() + ":" + tarih.getMinutes() + "\n" + player.name + " oyuna katıldı.\n" + player.conn + "\n" + player.auth + "\n" + oyuncular.length + " kişi oyunda.\n");
	room.sendAnnouncement("Tüm takımın defans yapması YASAK! En az bir kişi defansın dışında olmalıdır.",player.id,renkler.altin,"normal",2);	
}

room.onPlayerLeave = function(player){
	tarih = new Date();
	oyuncular = room.getPlayerList();
    yetki(player);
	
	console.log(tarih.getDate() + "/" + (tarih.getMonth()+1) + "/" + tarih.getFullYear() + " - " + tarih.getHours() + ":" + tarih.getMinutes() + "\n" + player.name + " oyundan ayrıldı.\n" + oyuncular.length + " kişi kaldı.");
}
