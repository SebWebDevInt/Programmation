/*
function Team() {
    this.players = [];
}

Team.prototype.addPlayer = function(player) {
    this.players = this.players.concat([player]);
}

Team.prototype.removePlayer = function(player) {
    this.players = this.players.filter(function(p) {
        return player !== p;
    });
}

var team1 = new Team();
team1.addPlayer('Seb');
team1.addPlayer('Patrick');
team1.removePlayer('Patrick');
console.log(team1.players);
*/
var Team = /** @class */ (function () {
    function Team() {
        this.players = [];
    }
    Team.prototype.addPlayer = function (player) {
        //this.players = this.players.concat(player);
        this.players = this.players.concat([player]);
    };
    Team.prototype.removePlayer = function (player) {
        /*
        this.players = this.players.filter((p) => {
            return player !== p;
        });
        */
        this.players = this.players.filter(function (p) { return player !== p; });
    };
    return Team;
}());
var team1 = new Team();
team1.addPlayer('Seb');
team1.addPlayer('Marie');
team1.removePlayer('Marie');
team1.addPlayer('Patrick');
console.log(team1.players);
