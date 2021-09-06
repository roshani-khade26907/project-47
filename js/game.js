class Game{
    constructor(){}
    
    async start(){
        if(gameState===0){
            player=new Player();
            var playerCountRef=await database.ref("playerCount").once("value")
            if(playerCountRef.exists()){
                playerCount=playerCountRef.val();
                player.getCount()
            }
            form=new Form()
            form.display();

                       
        }
        player1=createSprite(350,500);
        player1.addImage(bucket);
        player1.scale=0.7;

        player2=createSprite(1100,500); 
        player2.addImage(bucket2);
        player2.scale=0.7;

        players=[player1,player2];
    }

    play(){
        //console.log("working");
        form.hide();
        image(bg2,0,0,1400,600);
        Player.getPlayerInfo()
        player.getRank();
        var x=100;
        var y=500;
        var index=0;
        drawSprites();
        for(var plr in allPlayers){
            index=index+1;
            x=1000-allPlayers[plr].distance
            y=500;
            players[index-1].x=x;
            players[index-1].y=y;
            if(index===player.index){
                textSize(27);
                fill("black");
                text(allPlayers[plr].name,x-30,y+40);
            }
            textSize(29);
            fill("black");
            strokeWeight(5)
            text(allPlayers.player1.name+" : "+allPlayers.player1.score,50,50);
            text(allPlayers.player2.name+" : "+allPlayers.player2.score,50,90);
        
        }
        if(keyIsDown(RIGHT_ARROW)&&player.index!==null){
            player.distance-=15;
            player.update();

        }
        if(keyIsDown(LEFT_ARROW)&&player.index!==null){
            player.distance+=15;
            player.update();
            
        }
        if(frameCount%20===0){
            drop=createSprite(random(100,1300),0,50,50);
            drop.scale=0.08
            drop.velocityX=-2;
            drop.velocityY=10;
            drop.lifetime=300;
            drop.addImage(dropImage);
            dropsG.add(drop);
        }
        if(frameCount%50===0){
            BDrop=createSprite(random(100,1300),0,50,50);
            BDrop.scale=0.08
            BDrop.velocityX=-2;
            BDrop.velocityY=10;
            BDrop.lifetime=300;
            BDrop.addImage(bDropImage);
            BDropsG.add(BDrop);
        }
        if(player.index!=null){
            for(var d=0;d<dropsG.length;d++){
                if(dropsG.get(d).isTouching(players)){
                    dropsG.get(d).destroy();
                    player.score=player.score+5;
                    player.update();
                }
            }
            for(var b=0;b<BDropsG.length;b++){
                if(BDropsG.get(b).isTouching(players)){
                    BDropsG.get(b).destroy();
                    player.score=player.score-3;
                    player.update();
                }
            }
            
        }

        if(player.score>=25){
            gameState=2;
            player.rank=player.rank+1;
            Player.updateRank(player.rank);
            player.update();
            alert("YOUR RANK IS "+player.rank)
            alert(player.name+player.rank)

        }

    }

    end(){
        console.log("you won!");
        console.log(player.rank);
        this.gameOver();
    }

    gameOver(){
        textSize(50);
        fill("purple");
        text("WELL PLAYED "+ player.name,450,270);
        text("GAMEOVER" ,500,350)

    }

    getState(){
        var gameStateRef=database.ref("gameState")
        gameStateRef.on("value",function(data){
            gameState=data.val();
        })
    }

    update(state){
        database.ref("/").update({
            gameState:state
        });
    }

}