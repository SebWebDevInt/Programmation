class Team
{
    players: string[];

    constructor() {
        this.players = [];
    }

    addPlayer(player) {
        //this.players = this.players.concat(player);
        this.players = [...this.players, player];
    }
    
    removePlayer(player) {
        /*
        this.players = this.players.filter((p) => {
            return player !== p;
        });
        */
       this.players = this.players.filter(p => player !== p);
    }
}

let team1 = new Team();
team1.addPlayer('Seb');
team1.addPlayer('Marie');
team1.removePlayer('Marie');
team1.addPlayer('Patrick');

console.log(team1.players);