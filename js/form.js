class Form{
    constructor(){
        this.input=createInput("Name");
        this.button=createButton("PLAY");
        this.title=createElement("h2");
        this.greeting=createElement("h2");
        this.reset = createButton('Reset');
        
    }

    hide(){
        this.input.hide();
        this.button.hide();
        this.title.hide();
        this.greeting.hide();
        
    }

    display(){
        this.title.html("Water Collector");
        this.title.position(450,50);
        this.title.style("font-size","80px");
        this.title.style("color","darkBlue");

        this.input.position(620,300);
        this.input.style("width","200px");
        this.input.style("height","30px");
        this.input.style("background","skyBlue");

        this.button.position(670,450);
        this.button.style("width","100px");
        this.button.style("height","20px");
        this.button.style("background","skyBlue");

        this.reset.position(1110, 10);
        this.reset.style('width', '100px');
        this.reset.style('height', '30px');
        this.reset.style('background', 'lightpink');


        this.button.mousePressed(() => {
            this.input.hide();
            this.button.hide();
            player.name=this.input.value();
            playerCount+=1;
            player.index=playerCount
            player.update()
            player.updateCount(playerCount)
            this.greeting.html("Hello "+player.name );
            this.greeting.position(600,300)
        })

        this.reset.mousePressed(() => {
            player.updateCount(0);
            game.update(0);
            Player.updateRank(0);



            var playerInfoRef = database.ref('players');
            playerInfoRef.remove();

            
        });

    }

   

}