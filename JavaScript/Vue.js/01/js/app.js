new Vue({
    el: '#app',
    data: {
        lien_url: 'https://www.google.fr',
        lien_texte: 'Bonjour !',
        succes: true,
        affichage: true,
        cls: 'alert-info',
        personnes: ['Seb', 'Patrick', 'Jeannot'],
        nom: 'Neiter',
        prenom: 'Sébastien',
        secondes: 0,
        console: ''
    },
    methods: {
        toogleAffichage: function() {
            this.affichage = !this.affichage;
        }
    },
    computed: {
        nom_complet: {
            get: function() {
                return this.prenom + ' ' + this.nom;
            },
            set: function(val) {
                if (val.indexOf(' ') !== false) {
                    var arr_param = val.split(' ')
                    this.prenom = arr_param[0]
                    this.nom = arr_param[1]
                }
            }
        }
    },
    watch: {
        succes: function(val) {
            this.console = this.console + '<br />var succes = ' + (val ? 'true' : 'false') + '.';
        }
    },
    mounted: function () {
        this.console = this.console + 'Evénement mounted déclenché.';
        this.$interval = setInterval(() => {
            this.secondes++;
        }, 1000);
    },
    destroyed: function () {
        clearInterval(this.$interval);
    }
});
