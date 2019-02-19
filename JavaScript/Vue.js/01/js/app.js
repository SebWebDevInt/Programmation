new Vue({
    el: '#app',
    data: {
        lien_url: 'https://www.google.fr',
        lien_texte: 'Bonjour !',
        succes: true,
        affichage: true,
        cls: 'alert-info',
        personnes: ['Seb', 'Patrick', 'Jeannot']
    },
    methods: {
        toogleAffichage: function() {
            this.affichage = !this.affichage;
        }
    }
})