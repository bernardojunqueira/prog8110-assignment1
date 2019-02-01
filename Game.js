const GameState = Object.freeze({
    BEGINNING: Symbol("beginning"),
    SIGN: Symbol("sign"),
    TOWN: Symbol("town"),
    SALOON: Symbol("saloon"),
    DRINK: Symbol("drink"),
    POKER: Symbol("poker"),
    GREET: Symbol("greet"),
    IGNORE: Symbol("ignore"),
    POSTOFFICE: Symbol("postoffice"),
    MAP: Symbol("map"),
    CITIES: Symbol("cities"),
    DOCTOR: Symbol("doctor"),
    STORE: Symbol("store"),
    STORE_EXIT: Symbol("store_exit"),
    NOGUN: Symbol("nogun"),
    PISTOL: Symbol("pistol")
});

export default class Game{
    constructor(){
        this.stateCur = GameState.BEGINNING;
    }
    
    makeAMove(sInput)
    {
        let sReply = "";
        switch(this.stateCur){
            case GameState.BEGINNING:
                sReply = "You are still on the dirt road. You have been traveling for weeks and weeks. Finally, you approach a sign. It reads: Gichester, 15 miles. The sign is old and weak. It looks like it was made years ago. Do you trust it?";
                this.stateCur = GameState.SIGN;
                break;

            case GameState.SIGN:
                if(sInput.toLowerCase().match("yes")){
                    sReply = "You ride, and make it to a fine looking town, with a saloon, doctor's office, a general store and a postal service. Small homes are collected in random clusters. You hitch your horse at the post office and decide to explore the town.";
                    this.stateCur = GameState.TOWN;
                }else{
                    sReply ="You ignore the sign, being the legend you are, and die of thirst.";
                    this.stateCur = GameState.BEGINNING;
                }
                break;

            case GameState.TOWN:
                if(sInput.toLowerCase().match("saloon")){
                    sReply = "The saloon is old and shabby, but it feels homey. There is a game of poker going on and a bar with a couple of men. One is passed out, the other is having a conversation with the bartender."
                    this.stateCur = GameState.SALOON;
                }else if(sInput.toLowerCase().match("doctor") || sInput.toLowerCase().match("office")){
                    sReply = 'The doctor looks at you and smiles. "I haven\'t seen you here before. Anyways, what\'s wrong with you?"';
                    this.stateCur = GameState.DOCTOR ;
                } else if(sInput.toLowerCase().match("general") || sInput.toLowerCase().match("store")) {
                    sReply = 'The Manager looks at you and smiles. "Hey, you\'re new! You need a gun, I bet?"';
                    this.stateCur = GameState.STORE;
                } else {
                    sReply = "Oops, try again... here are some hints: saloon, doctor's office, general store";
                }
                break;

            case GameState.SALOON:
                if(sInput.toLowerCase().match("order") || sInput.toLowerCase().match("drink")){
                    sReply = 'You approach the two talking men. You clear your throat and ask, "Can I have a beer, please?" The bartender looks at you and says, "One beer coming up." As he prepares it, you look at the man he was talking to.'
                    this.stateCur = GameState.DRINK;
                } else if(sInput.toLowerCase().match("play") || sInput.toLowerCase().match("poker")){
                    sReply = "You lose $15. You exit the game, smiling but angry. You needed that money.";
                    this.stateCur = GameState.POKER;
                } else {
                    sReply = "Oops, try again... here's a hint: you can order a drink or play poker";
                }
                break;

            case GameState.DRINK:
                if(sInput.toLowerCase().match("greet")){
                    sReply = "He makes no move to talk to you. You awkwardly nod your head and wait for your drink.";
                    this.stateCur = GameState.GREET;
                } else if(sInput.toLowerCase().match("ignore")){
                    sReply = 'You make no move to talk to him, he makes no move to talk to you. The bartender approaches with your beer. "Trying to talk to old Charles here, are you?" You nod your head. "He doesn\'t talk to anyone much, \'cept me of course."';
                    this.stateCur = GameState.IGNORE;
                } else {
                    sReply = "Oops, try again... here's a hint: you should greet or ignore him";
                }
                break;
            
            case GameState.GREET:
                sReply = 'You approach the two talking men. You clear your throat and ask, "Can I have a beer, please?" The bartender looks at you and says, "One beer coming up." As he prepares it, you look at the man he was talking to.';
                this.stateCur = GameState.DRINK;
                break;

            case GameState.IGNORE:
                if(sInput.toLowerCase().match("drink") || sInput.toLowerCase().match("beer")){
                    sReply = "You down the beer...";
                    this.stateCur = GameState.POSTOFFICE;
                } else if(sInput.toLowerCase().match("talk") || sInput.toLowerCase().match("bartender")){
                    sReply = 'You talk to the bartender, who says that you should go to the City of Berkton. "The one to the right of Gichester. You might have to fight some thugs, but it\'s worth it."';
                    this.stateCur = GameState.POSTOFFICE;
                } else {
                    sReply = "Oops, try again... here's a hint: you can drink your beer or talk to the bartender";
                }
                break;

            case GameState.POSTOFFICE:
                sReply = "You go back to the Town overlook and enter the post office. There is a great big map on the wall.";
                this.stateCur = GameState.MAP;
                break;

            case GameState.MAP:
                if(sInput.toLowerCase().match("look") || sInput.toLowerCase().match("map")){
                    sReply = "You take a look at the great big map on the wall. It shows two cities close to Gichester, but their names are smudged. There is one city to the left and one to the right of Gichester.";
                    this.stateCur = GameState.CITIES;
                } else if(sInput.toLowerCase().match("outside")){
                    sReply = "You ride, and make it to a fine looking town, with a saloon, doctor's office, a general store and a postal service. Small homes are collected in random clusters. You hitch your horse at the post office and decide to explore the town.";
                    this.stateCur = GameState.TOWN; 
                } else {
                    sReply = "Oops, try again... here's a hint: you can look at the map or go outside";
                }
                break;

            case GameState.CITIES:
                if(sInput.toLowerCase().match("left") || sInput.toLowerCase().match("right")) {

                    sReply = "I ran out of ideas... too many if and case statements. Thanks for playing!"
                    this.stateCur = GameState.BEGINNING;

                } else if(sInput.toLowerCase().match("outside")) {
                    sReply = "You ride, and make it to a fine looking town, with a saloon, doctor's office, a general store and a postal service. Small homes are collected in random clusters. You hitch your horse at the post office and decide to explore the town.";
                    this.stateCur = GameState.TOWN; 
                } else {
                    sReply = "Oops, try again... here's a hint: you can go to a city left or right of Gichester or go outside";
                }
                break;
            case GameState.POKER:
                sReply = "The saloon is old and shabby, but it feels homey. There is a game of poker going on and a bar with a couple of men. One is passed out, the other is having a conversation with the bartender."
                this.stateCur = GameState.SALOON;
                break;

            case GameState.DOCTOR:
                if(sInput.toLowerCase().match("nothing")){
                    sReply = "You ride, and make it to a fine looking town, with a saloon, doctor's office, a general store and a postal service. Small homes are collected in random clusters. You hitch your horse at the post office and decide to explore the town.";
                    this.stateCur = GameState.TOWN;
                } else {
                    sReply = "Oops, try again... here's a hint: maybe you don't have nothing";
                }
                break;

            case GameState.STORE:
                if(sInput.toLowerCase().match("yes")){
                    sReply = 'He laughs. "I knew it! I can always tell what people need. Come here." You follow him to a back room. On the shelves are pistols. will you buy?';
                    this.stateCur = GameState.PISTOL;
                } else if(sInput.toLowerCase().match("no")){
                    sReply = '"Alright, well what are you here for then?"';
                    this.stateCur = GameState.NOGUN;
                } else {
                    sReply = "Oops, try again... here's a hint: it's a matter of yes or no";
                }
                break;

            case GameState.NOGUN:
                if(sInput.toLowerCase().match("nothing")){
                    sReply = 'The Manager looks at you and smiles. "Hey, you\'re new! You need a gun, I bet?"';
                    this.stateCur = GameState.STORE; 
                } else {
                    sReply = "Oops, try again... here's a hint: maybe you don't need nothing";
                }
                break;

            case GameState.PISTOL:
                if(sInput.toLowerCase().match("yes") || sInput.toLowerCase().match("pistol")){
                    sReply = 'You pick a black one. "Fine choice" the manager says. He takes you back and rings you up. "Thanks for your business!" He says as you exit the store.';
                    this.stateCur = GameState.STORE_EXIT;
                } else if(sInput.toLowerCase().match("no")) {
                    sReply = 'The Manager looks at you and smiles. "Hey, you\'re new! You need a gun, I bet?"';
                    this.stateCur = GameState.STORE; 
                } else {
                    sReply = "Oops, try again... here's a hint: it's a matter of yes or no";
                }
                break;

            case GameState.STORE_EXIT:
                sReply = "You ride, and make it to a fine looking town, with a saloon, doctor's office, a general store and a postal service. Small homes are collected in random clusters. You hitch your horse at the post office and decide to explore the town.";
                this.stateCur = GameState.TOWN;
                break;
        }
        return(sReply);
    }
}