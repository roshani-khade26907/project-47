class Player{
    constructor(){
        this.index=null;
        this.name=null;
        this.score=0;
        this.distance=0;
        this.rank=null;

    }

    getCount(){
        var getCountRef=database.ref("playerCount");
        getCountRef.on("value",function(data){
            playerCount=data.val()
        })
    }

    updateCount(count){
        database.ref("/").update({
            playerCount:count
        })

    }

    update(){
        var playerIndex="players/player"+this.index;
        database.ref(playerIndex).set({
            name:this.name,
            score:this.score,
            distance:this.distance,
            
        })
    }

    getRank(){
        var rankRef=database.ref("rank")
        rankRef.on("value",function(data){
            this.rank=data.val()
        })
    }

    static updateRank(rank){
        database.ref("/").update({
            rank:rank
        })
    }

    static getPlayerInfo(){
        var PIRef=database.ref("players")
        PIRef.on("value",function(data){
            allPlayers=data.val()
        })
    }
}