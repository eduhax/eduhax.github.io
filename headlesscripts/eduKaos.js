//https://github.com/haxball/haxball-issues/wiki/Headless-Host

var room = HBInit({
    roomName: "👂 eduKaoxBall 🐿",
    maxPlayers: 16,
    public: false,
    noPlayer: true
});

room.setDefaultStadium("Classic");
room.setTimeLimit(5);
room.setScoreLimit(5);
room.setTeamsLock(1);
room.setTeamColors(1, 45, 0xFFFFFF, [0x730000, 0xBF0000, 0x730000]);
room.setTeamColors(2, 135, 0xFFFFFF, [0x002147, 0x005FBD, 0x002147]);
//colors red 45 FFFFFF 730000 BF0000 730000
//colors blue 135 FFFFFF 002147 005FBD 002147

var oyuncular;
var skor;
var adminler = {
    nick: ["alsaPeran","Efekan","gupsekin","pembiş","luck"], // 
    pid: ["OUXJy2x6SpNJePWJLm14Kojtsg3R-RAj3fgfyLseIIg","bE8lDKBVGBeTbVigIKbM7bxb-h0hqW4bdmCydloXWcY","UMLedAAr1xpL6QLg07Bhq8nnr42CzbxMX-KWHEgLMq0","gbOli3KBCeT9fSb4u2sAvzgxZ55QtbXf00U5JjdCSJs","7WGF3RuM8TP6ze1CClmKdpxt-u3NGOCYctERswF7Pyo"],
};
var renkler = {
    mavi: 0x5689E5,
    kirmizi: 0xE56E56,
    altin: 0xDAA520,
    turuncu: 0xFF4500
}

function admin(player){
	oyuncular = room.getPlayerList();

    for(let i=0; i<oyuncular.length; i++)
    {
        if(player.auth == adminler.pid[i])
        {
            room.setPlayerAdmin(player.id,true);
        }
    }
}

function yetki(player){
	oyuncular = room.getPlayerList();
	
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

room.onPlayerAdminChange = function(changedPlayer,byPlayer){
	if(changedPlayer.name == adminler.nick[0])
		room.setPlayerAdmin(changedPlayer.id,true);
}

room.onPlayerJoin = function(player) {
	let tarih = new Date();
    oyuncular = room.getPlayerList();
    admin(player);
    yetki();
    if(oyuncular.length>=16)
	    room.sendAnnouncement("Boğuluyorum öyleyse varım... ("+ oyuncular.length + "/" + oyuncular.length + ")",null,renkler.turuncu,"normal",0);
	room.sendAnnouncement("https://eduhax.github.io",player.id,renkler.altin,"normal",0);
	console.log(tarih.getHours() + ":" + tarih.getMinutes() + "\n" + player.name + " oyuna katıldı.\n" + player.conn + "\n" + player.auth);
	
}

room.onPlayerLeave = function(player){
	let tarih = new Date();
    yetki();
	console.log(tarih.getHours() + ":" + tarih.getMinutes() + "\n" + player.name + " oyundan ayrıldı.\n");
}

room.onTeamVictory = function(scores){
    skor = room.getScores();
    if(skor.red>skor.blue)
    {
        room.sendAnnouncement("🔴 " + skor.red + " - " + skor.blue + " 🔵",null,renkler.kirmizi,"normal",0);
    }
    if(skor.blue>skor.red)
    {
        room.sendAnnouncement("🔴 " + skor.red + " - " + skor.blue + " 🔵",null,renkler.mavi,"normal",0);
    } 
}