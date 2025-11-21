function Equipe() {
    this.players = [];
}
Equipe.prototype.addPlayer = function (player) {
    this.players = this.players.concat([player]);
};
Equipe.prototype.removePlayer = function (player) {
    this.players = this.players.filter(function (p) {
        return player !== p;
    });
};
var equipe1 = new Equipe();
equipe1.addPlayer('Seb');
equipe1.addPlayer('Patrick');
equipe1.removePlayer('Patrick');
console.log(equipe1.players);
