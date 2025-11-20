/* Constantes de paramétrage */
var CONST_URL_SERVEUR = 'http://127.0.0.1:8080';
var CONST_VERSION_SERVEUR = '1.0.0';
 
var CONST_TEMPS_JEU_ORDINATEUR = 2000;
var CONST_TEMPS_FIN_MANCHE = 4000;
var CONST_VITESSE_SOLO = 90;
var CONST_VITESSE_EN_LIGNE = 30;
var CONST_LNG = 'fr';
var SIO_GOF = false;

/* Variables d'application */
var chrono = false;
var tempo_robot = false;
var tempo_fin_manche = false;
var temps_restant;
var vitesse_partie = CONST_VITESSE_SOLO;
var pseudo = '';
var partie_solo = false;
var online = false;

var app = {
	initialize: function() {
		document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
	},
	onDeviceReady: function() {
		this.receivedEvent('deviceready');
		$('#jsi_txt_uuid').val(device.uuid);
	}
};

app.initialize();

function changementLangue() {
	$('.lng-auto').each(function() {
		if (typeof $(this).attr('data-placeholder') !== 'undefined') {
			if (typeof CONST_TRAD[CONST_LNG][$(this).attr('data-placeholder')] !== 'undefined') {
				$(this).attr('placeholder', CONST_TRAD[CONST_LNG][$(this).attr('data-placeholder')]);
			}
		}
		if (typeof $(this).attr('data-html') !== 'undefined') {
			if (typeof CONST_TRAD[CONST_LNG][$(this).attr('data-html')] !== 'undefined') {
				$(this).html(CONST_TRAD[CONST_LNG][$(this).attr('data-html')]);
			}
		}
	});
}

function changementEcran(id_ecran) {
	if ($('#' + id_ecran + ':visible').length === 0) {
		$('.ecran:visible').fadeOut(300, function() {
			$('#' + id_ecran).fadeIn(300, function() {
				$('.ecran').each(function() {
					if ($(this).attr('id') !== id_ecran) {
						$(this).hide();
					}
					else {
						$(this).show();
					}
				});
			});
		});
	}
}

function partieReinit() {
	$('#jsi_chat_ouvrir').show();
	
	$('#ecran_partie .auto_nom').html('');
	$('#ecran_partie .auto_pts').html('');
	$('#ecran_partie .cartes').html('');
	
	$('#jou_gauche').removeClass('joueur_0 joueur_1 joueur_2 joueur_3');
	$('#jou_face').removeClass('joueur_0 joueur_1 joueur_2 joueur_3');
	$('#jou_droite').removeClass('joueur_0 joueur_1 joueur_2 joueur_3');
	$('#ma_main').removeClass('joueur_0 joueur_1 joueur_2 joueur_3');
	
	$('#chrono').attr('data-temps', '0');
	
	$('.tapis_centre .cartes').html('');
	
	$('#jeu_annonce').html('');
	$('#jeu_annonce').hide();
	
	$('#chat').removeClass('open');
	$('#jsi_chat_ouvrir').removeClass('open');
}

function champsAuto(partie) {
	$('#ma_main .carte').removeClass('selection');
	
	$('.auto_j0').html(partie.joueurs[0]);
	$('.auto_s0').html(partie.pts[0]);
	$('.auto_j1').html(partie.joueurs[1]);
	$('.auto_s1').html(partie.pts[1]);
	$('.auto_j2').html(partie.joueurs[2]);
	$('.auto_s2').html(partie.pts[2]);
	$('.auto_j3').html(partie.joueurs[3]);
	$('.auto_s3').html(partie.pts[3]);

	$('#ma_main').removeClass('attente');
	$('.jou_autre').removeClass('attente');
	if (partie.joueurs[partie.joueur_actif] === pseudo) {
		$('#ma_main').addClass('attente');
		
		$('#jsi_jouer').show();
		$('#jsi_passer').show();
		$('#jsi_donner').hide();
		
		if (partie.etat === 2) {
			$('#bloc_enchere').show();
		}
		$('#actions').slideDown();
		if (chrono === false && partie.etat !== 3) {
			var double_temps = true;
			for (var c = 0; c < partie.cartes.length; c++) {
				if (partie.cartes[c].joueur === -1) {
					double_temps = false;
				}
			}
			if (partie.etat === 2 || double_temps) {
				chronoLancer(true);
			}
			else {
				chronoLancer(false);
			}
		}
	}
	else {
		if ($('#jou_face').find('.auto_j' + partie.joueur_actif).length === 1) { $('#jou_face').addClass('attente'); }
		if ($('#jou_gauche').find('.auto_j' + partie.joueur_actif).length === 1) { $('#jou_gauche').addClass('attente'); }
		if ($('#jou_droite').find('.auto_j' + partie.joueur_actif).length === 1) { $('#jou_droite').addClass('attente'); }
		$('#actions').slideUp();
	}
}

function poseCartes(partie) {
	$('.tapis_centre .cartes').html('');
	$('.tapis_centre .cartes').removeClass('nb1').removeClass('nb2').removeClass('nb3').removeClass('nb4').removeClass('nb5').removeClass('nb6').removeClass('nb7');
	for (var i = 0; i < partie.main_active.length; i++) {
		$('.tapis_centre .cartes').append('<div id="carte_' + i + '" class="id_' + i + ' carte cou_' + partie.cartes[partie.main_active[i]].couleur + ' val_' + partie.cartes[partie.main_active[i]].valeur + '"></div>');
	}
	organiserCarteTapis();
}

function isInscriptionComplete(partie) {
	if (partie.joueurs[0] === '' || partie.joueurs[1] === '' || partie.joueurs[2] === '' || partie.joueurs[3] === '') {
		return false;
	}
	else {
		return true;
	}
}

function organiserCarte() {
	var nb = $('#ma_main .cartes .carte').length;
	var pos = 15;
	$('#ma_main .cartes .carte').each(function() {
		$(this).css('left', pos + '%');
		pos = pos + 10;
	});
}

function organiserCarteTapis() {
	// Voir comment rafraichir le DOM pour l'instant j'ai trouvé que la manière de lire les valeurs avant
	var nb = 0;
	$('.tapis_centre .cartes .carte').each(function() {
		nb = $(this).css('left');
	});
	nb = $('.tapis_centre .cartes .carte').length;
	$('.tapis_centre .cartes').addClass('nb' + nb);
}

function afficherCartes(partie) {
	$('#ma_main .cartes').html('');
	$('.jou_autre .cartes').html('');
	for (var i = 0; i < partie.cartes.length; i++) {
		if (partie.cartes[i].joueur !== -1) {
			if (partie.joueurs[partie.cartes[i].joueur] === pseudo) {
				$('#ma_main .cartes').append('<div id="carte_' + i + '" class="id_' + i + ' carte cou_' + partie.cartes[i].couleur + ' val_' + partie.cartes[i].valeur + '"></div>');
			}
			else {
				// Inverser le commentaire des lignes pour jouer à carte découvertes pour debug
				//$('.joueur_' + partie.cartes[i].joueur + ' .cartes').append('<div id="carte_' + i + '" class="id_' + i + ' carte cou_' + partie.cartes[i].couleur + ' val_' + partie.cartes[i].valeur + '">' + partie.cartes[i].valeur + '</div>');
				$('.joueur_' + partie.cartes[i].joueur + ' .cartes').append('<div class="carte_dos"></div>');
			}
		}
	}
}

function chronoLancer(extra) {
	temps_restant = vitesse_partie;
	if (extra) { temps_restant = temps_restant + 15; }
	chrono = setInterval(function(){ chronoActualiser(); }, 1000);
	$('#chrono').attr('data-temps', '0');
}

function chronoActualiser() {
	temps_restant--;
	
	if (temps_restant <= -2) {
		chronoArreter();
		if (online) {
			SIO_GOF.emit('cliev_chrono_fin', { 'salon': $('#jsi_salon').val() });
		}
		else {
			partie_solo.joueAuto();
		}
	}
	else if (temps_restant <= 0) {
		$('#chrono').attr('data-temps', '0');
		$('#actions').hide();
	}
	else if(temps_restant <= 10) {
		$('#chrono').attr('data-temps', temps_restant);
	}
}

function chronoArreter() {
	$('#chrono').attr('data-temps', '0');
	clearInterval(chrono);
	chrono = false;
}

function annonceAjouter(message) {
	$('#jeu_annonce').html($('#jeu_annonce').html() + message);
	if ($('#jeu_annonce:visible').length === 0) {
		$('#jeu_annonce').slideDown();
	}
}

function annonceCacher() {
	$('#jeu_annonce').hide();
	$('#jeu_annonce').html('');
}

function escapeHtml(text) {
	var map = {
		'&': '&amp;',
		'<': '&lt;',
		'>': '&gt;',
		'"': '&quot;',
		"'": '&#039;'
	};
	return text.replace(/[&<>"']/g, function(m) { return map[m]; });
}

/*------------------------------------------------------------------------------
                          Evènements du serveur de jeu                          
------------------------------------------------------------------------------*/

//SIO_GOF = io.connect(CONST_URL_SERVEUR + '/beloinche');
function initServeurIO() {
	SIO_GOF = io.connect(CONST_URL_SERVEUR + '/beloinche', { 'reconnect': true, 'reconnection delay': 2000, 'max reconnection attempts': 3 });

	SIO_GOF.on('serev_rejoindre', function (params) {
		$('#jsi_salon').val(params.partie.id);
		$('#jsi_id_joueur').val(params.id_joueur);
		if (params.partie.etat === -1) {
			$('#ecran_attente .auto_j0').html(params.partie.joueurs[0]);
			$('#ecran_attente .auto_j1').html(params.partie.joueurs[1]);
			$('#ecran_attente .auto_j2').html(params.partie.joueurs[2]);
			$('#ecran_attente .auto_j3').html(params.partie.joueurs[3]);
			changementEcran('ecran_attente');
		}
		else {
			changementEcran('ecran_partie');
		}
	});

	SIO_GOF.on('serev_partie_maj_inscription', function (partie) {
		$('#ecran_attente .auto_j0').html(partie.joueurs[0]);
		$('#ecran_attente .auto_j1').html(partie.joueurs[1]);
		$('#ecran_attente .auto_j2').html(partie.joueurs[2]);
		$('#ecran_attente .auto_j3').html(partie.joueurs[3]);
		changementEcran('ecran_attente');
	});

	SIO_GOF.on('serev_partie_lancement', function (partie) {
		eventPartieLancement(partie);
	});

	SIO_GOF.on('serev_joue', function (partie) {
		eventJoue(partie);
	});

	SIO_GOF.on('serev_joue_erreur', function (message) {
		eventAfficherAnnonce(CONST_TRAD[CONST_LNG][message]);
	});

	SIO_GOF.on('serev_passe', function (partie) {
		eventPasse(partie);
	});

	SIO_GOF.on('serev_echange', function (partie) {
		eventEchange(partie);
	});

	SIO_GOF.on('serev_fin_manche', function (partie) {
		eventFinManche(partie);
	});

	SIO_GOF.on('serev_fin_partie', function (partie) {
		eventFinPartie(partie);
	});

	SIO_GOF.on('serev_chat_ajouter', function (params) {
		if ($('#ecran_partie:visible').length === 1) {
			$('.jou_autre').each(function() {
				if ($(this).find('.auto_nom').html() === params.joueur) {
					var bulle = $(this).find('.bulle');
					bulle.html(CONST_TRAD[CONST_LNG][params.message]);
					bulle.fadeIn(100, function() {
						bulle.fadeOut(5000);
					});
				}
			});
		}
	});
	return true;
}

/*------------------------------------------------------------------------------
                              Evènements du jeu                                 
------------------------------------------------------------------------------*/

function eventPartieLancement(partie) {
	partieReinit();
	var jou = 3;

	if (partie.vitesse === 2) {
		vitesse_partie = CONST_VITESSE_EN_LIGNE;
	}
	else {
		vitesse_partie = CONST_VITESSE_SOLO;
	}
	
	if (partie.joueurs[0] === pseudo) { jou = 0; }
	if (partie.joueurs[1] === pseudo) { jou = 1; }
	if (partie.joueurs[2] === pseudo) { jou = 2; }
	
	$('#ma_main').addClass('joueur_' + jou);
	$('#ma_main .auto_nom').addClass('auto_j' + jou);
	$('#ma_main .auto_pts').addClass('auto_s' + jou);

	var jg = (jou + 1) % 4;
	var jf = (jou + 2) % 4;
	var jd = (jou + 3) % 4;
	$('#jou_gauche').addClass('joueur_' + jg);
	$('#jou_face').addClass('joueur_' + jf);
	$('#jou_droite').addClass('joueur_' + jd);
	$('#jou_gauche .auto_nom').addClass('auto_j' + jg);
	$('#jou_gauche .auto_pts').addClass('auto_s' + jg);
	$('#jou_face .auto_nom').addClass('auto_j' + jf);
	$('#jou_face .auto_pts').addClass('auto_s' + jf);
	$('#jou_droite .auto_nom').addClass('auto_j' + jd);
	$('#jou_droite .auto_pts').addClass('auto_s' + jd);

	$('#jsi_salon').val(partie.id);

	changementEcran('ecran_partie');
	annonceCacher();
	champsAuto(partie);
	afficherCartes(partie);
	organiserCarte();
	$('.joueur_' + partie.joueur_actif).addClass('main');
}

function eventJoue(partie) {
	var ortho_point = '';

	chronoArreter();
	annonceCacher();
	champsAuto(partie);
	poseCartes(partie);
	afficherCartes(partie);

	if (partie.etat === 2) {
		for (var j = 0; j < partie.joueurs.length; j++) {
			ortho_point = CONST_TRAD[CONST_LNG]['point'];
			if (partie.pts_derniere_manche[j] > 1) {
				ortho_point = CONST_TRAD[CONST_LNG]['points'];
			}
			annonceAjouter('<b>' + partie.joueurs[j] + '</b> : ' + partie.pts_derniere_manche[j] + ortho_point + '<br />');
		}
		annonceAjouter('<br />' + CONST_TRAD[CONST_LNG]['premier'] + ' : <b>' + partie.joueurs[partie.joueur_actif] + '</b><br />' + CONST_TRAD[CONST_LNG]['dernier'] + ' : <b>' + partie.joueurs[partie.joueur_dernier] + '</b>');

		$('.jou_autre').removeClass('premier').removeClass('dernier').removeClass('main');
		$('#ma_main').removeClass('premier').removeClass('dernier').removeClass('main');
		$('.joueur_' + partie.joueur_actif).addClass('premier').addClass('main');
		$('.joueur_' + partie.joueur_dernier).addClass('dernier');
	}
	else {
		$('.jou_autre').removeClass('maitre').removeClass('passe');
		$('#ma_main').removeClass('maitre').removeClass('passe');
		$('.joueur_' + partie.main_active_joueur).addClass('maitre');
	}
	organiserCarte();
}

function eventJoueRobot(partie) {
	clearTimeout(tempo_robot);
	tempo_robot = false;
	if (partie.online) {
		global_id_partie = this.id;
		tempo_robot = setTimeout(function(){ jouerAutoOnline(global_id_partie); }, CONST_TEMPS_JEU_ORDINATEUR);
	}
	else {
		if (partie_solo.joueurs_enligne[partie_solo.joueur_actif] === false) {
			tempo_robot = setTimeout(function(){ partie_solo.joueAuto(); }, CONST_TEMPS_JEU_ORDINATEUR);
		}
	}
}

function eventPasse(partie) {
	chronoArreter();
	annonceCacher();
	champsAuto(partie);
	if (partie.main_active_force === 0) {
		$('.tapis_centre .cartes').html('');
		$('.jou_autre').removeClass('main').removeClass('maitre').removeClass('passe');
		$('#ma_main').removeClass('main').removeClass('maitre').removeClass('passe');
		$('.joueur_' + partie.joueur_actif).addClass('main');
	}
	else {
		$('.joueur_' + partie.joueur_passe).addClass('passe');
	}
}

function eventEchange(partie) {
	chronoArreter();
	annonceCacher();
	champsAuto(partie);

	$('#jsi_jouer').show();
	$('#jsi_passer').hide();
	$('#jsi_donner').hide();

	$('.tapis_centre .cartes').html('');
	$('.tapis_centre .cartes').removeClass('nb1').removeClass('nb2').removeClass('nb3').removeClass('nb4').removeClass('nb5').removeClass('nb6').removeClass('nb7');
	$('.tapis_centre .cartes').append('<div id="carte_' + i + '" class="id_' + i + ' carte cou_' + partie.cartes[partie.joueur_dernier_carte].couleur + ' val_' + partie.cartes[partie.joueur_dernier_carte].valeur + '"></div>');
	$('.tapis_centre .cartes').append('<div id="carte_' + i + '" class="id_' + i + ' carte cou_' + partie.cartes[partie.joueur_premier_carte].couleur + ' val_' + partie.cartes[partie.joueur_premier_carte].valeur + '"></div>');
	eventAfficherAnnonce('<b>' + partie.joueurs[partie.joueur_dernier] + '</b><br />' + CONST_TRAD[CONST_LNG]['echange_avec'] + '<br /><b>' + partie.joueurs[partie.joueur_actif] + '</b>');

	$('#ma_main .cartes').html('');
	for (var i = 0; i < partie.cartes.length; i++) {
		if (partie.joueurs[partie.cartes[i].joueur] === pseudo) {
			$('#ma_main .cartes').append('<div id="carte_' + i + '" class="id_' + i + ' carte cou_' + partie.cartes[i].couleur + ' val_' + partie.cartes[i].valeur + '"></div>');
		}
	}
	organiserCarte();
	organiserCarteTapis();
}

function eventAfficherAnnonce(message) {
	$('#jeu_annonce').html(message);
	if ($('#jeu_annonce:visible').length === 0) {
		$('#jeu_annonce').slideDown();
	}
}

function eventFinManche(partie) {
	$('#jsi_jouer').hide();
	$('#jsi_passer').hide();
	$('#jsi_donner').hide();
	champsAuto(partie);
	tempo_fin_manche = setTimeout(function(){ lancementNouvelleManche(partie_solo); }, CONST_TEMPS_FIN_MANCHE);
}

function eventFinPartie(partie) {
	changementEcran('ecran_fin');
	return true;
}
/*
function jouerAuto(partie) {
	partie.joueAuto();
	return true;
}
*/
function lancementNouvelleManche(partie) {
	clearTimeout(tempo_fin_manche);
	tempo_fin_manche = false;
	partie.nouvelleManche();
	$('.tapis_centre .cartes').html('');
	champsAuto(partie);
	afficherCartes(partie);
	organiserCarte();
	organiserCarteTapis();
	if (partie.joueurs[partie.joueur_actif] === pseudo) {
		$('#jsi_jouer').hide();
		$('#jsi_passer').hide();
		$('#jsi_donner').show();
		annonceAjouter('<br /><br />' + CONST_TRAD[CONST_LNG]['donner_carte_a'] + ' <b>' + partie.joueurs[partie.joueur_dernier] + '</b>');
	}
	else {
		eventJoueRobot(partie);
	}
}

function jouerAutoOnline(id_partie) {
	/*
	var indp = getIndexPartieById(id_partie);
	if (indp !== -1) {
		parties[indp].joueAuto();
	}
	*/
	return true;
}
