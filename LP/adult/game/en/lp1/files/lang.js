(function(window){
	var lang = function(str) {
		var localize = navigator.language || navigator.userLanguage;
        var def = 'en';
		if(typeof localize == 'undefined') {
			localize = def;
		}
		else {
			var local = localize.split('-');
			localize = local[0];
		}
		var store = {
			'es': {
				'title': 'Destructores de coño',
				'p1-step1-1': '¡Cierra la puerta antes de comenzar este juego!',
                'p1-step1-2': '¡intenta no correrte!',
				'p1-step1-3': 'Juega',
                'p1-step2-1': 'Créala, fóllala',
                'p1-step2-2': 'Déjala embarazada',
                'p1-step2-3': 'No, gracias',
                'p1-step2-4': 'Continuar',
                'p1-step3-1': 'Elige tu primera',
                'p1-step3-2': 'pareja sexual',
                'p1-step3-3': '&#171; Lisa',
                'p1-step3-4': 'Elsa &#187;',
                'p1-step4-1': 'Advertencia',
                'p1-step4-2': '¡Intenta no correrte!',
                'p1-step4-3': 'Juega',
                
			},
			'en': {
				'title': 'Pussy destroyers',
				'p1-step1-1': 'Lock Your Door Before You Play This Game!',
                'p1-step1-2': 'Try Not to Cum!',
				'p1-step1-3': 'Play Game',
                'p1-step2-1': 'Build Her, Fuck Her',
                'p1-step2-2': 'Impregnate',
                'p1-step2-3': 'No, Thanks',
                'p1-step2-4': 'Continue',
                'p1-step3-1': 'Choose Your First',
                'p1-step3-2': 'Sex Partner',
                'p1-step3-3': '&#171; Lisa',
                'p1-step3-4': 'Elsa &#187;',
                'p1-step4-1': 'Warning',
                'p1-step4-2': 'Try Not To Cum',
                'p1-step4-3': 'Play Game',
                
			},
            'fr': {
				'title': 'Destructeurs de chatte',
				'p1-step1-1': 'Verrouillez votre porte avant de commncer à jouer à ce jeu!',
                'p1-step1-2': 'Essayez de ne ne pas jouir!',
				'p1-step1-3': 'Jouer au jeu',
                'p1-step2-1': 'Travaille-la, baise-la',
                'p1-step2-2': 'Féconder',
                'p1-step2-3': 'Non, merci',
                'p1-step2-4': 'Continuez',
                'p1-step3-1': 'Choisissez votre premier',
                'p1-step3-2': 'Partenaire sexuel',
                'p1-step3-3': '&#171; Lisa',
                'p1-step3-4': 'Elsa &#187;',
                'p1-step4-1': 'Attention',
                'p1-step4-2': 'Essayez de ne pas jouir!',
                'p1-step4-3': 'Jouer au jeu',
                
			},
            'de': {
				'title': 'Muschizerstörer',
				'p1-step1-1': 'Schließ deine Tür ab, bevor du dieses Spiel spielst!',
                'p1-step1-2': 'Versuche nicht zu kommen!',
				'p1-step1-3': 'Spielen',
                'p1-step2-1': 'Erschaff sie dir, fick sie!',
                'p1-step2-2': 'Schwängere sie!',
                'p1-step2-3': 'Nein, danke',
                'p1-step2-4': 'Weiter',
                'p1-step3-1': 'Wähle deinen ersten',
                'p1-step3-2': 'Sexpartner',
                'p1-step3-3': '&#171; Lisa',
                'p1-step3-4': 'Elsa &#187;',
                'p1-step4-1': 'Warnung',
                'p1-step4-2': 'Versuche nicht zu kommen!',
                'p1-step4-3': 'Spielen',
                
			},
            'it': {
				'title': 'Distruttori di fighe',
				'p1-step1-1': 'Chiuditi a chiave prima di iniziare questo gioco!',
                'p1-step1-2': 'Cerca di non venire!',
				'p1-step1-3': 'Inizia il gioco',
                'p1-step2-1': 'Creala, scopala',
                'p1-step2-2': 'Ingravidala',
                'p1-step2-3': 'No, grazie',
                'p1-step2-4': 'Continua',
                'p1-step3-1': 'Scegli la tua prima',
                'p1-step3-2': 'Partner sessuale',
                'p1-step3-3': '&#171; Lisa',
                'p1-step3-4': 'Elsa &#187;',
                'p1-step4-1': 'Attenzione',
                'p1-step4-2': 'Cerca di non venire!',
                'p1-step4-3': 'Inizia il gioco',
                
			},
            //ru
            'ru': {
				'title': 'Pussy destroyers',
				'p1-step1-1': 'Прежде чем играть, закрой за собой дверь!',
                'p1-step1-2': 'Постарайся не кончить быстро!',
				'p1-step1-3': 'Играть',
                'p1-step2-1': 'Создай девушку мечты',
                'p1-step2-2': 'и трахай ее',
                'p1-step2-3': 'Нет, спасибо',
                'p1-step2-4': 'Продолжить',
                'p1-step3-1': 'Выбери своего первого',
                'p1-step3-2': 'партнера для секса',
                'p1-step3-3': '&#171; Елена',
                'p1-step3-4': 'Эльза &#187;',
                'p1-step4-1': 'Внимание',
                'p1-step4-2': 'Постарайся не кончить!',
                'p1-step4-3': 'Играть',
			},
            //pt
            'pt': {
				'title': 'GameBater - Tenta Não Te Vir',
				'p1-step1-1': 'Tranca a Porta Antes de Jogar!',
                'p1-step1-2': 'Tenta Não Te Vit!',
				'p1-step1-3': 'Jogar',
                'p1-step2-1': 'CONSTRÓI-A, FODE-A',
                'p1-step2-2': 'ENGRAVIDAR',
                'p1-step2-3': 'Não, obrigado',
                'p1-step2-4': 'Continua',
                'p1-step3-1': 'ESCOLHE O TEU PRIMEIRO',
                'p1-step3-2': 'PARCEIRO SEXUAL',
                'p1-step3-3': '&#171; Lisa',
                'p1-step3-4': 'Elsa &#187;',
                'p1-step4-1': 'CUIDADO',
                'p1-step4-2': 'TENTA NÃO TE VIR!',
                'p1-step4-3': 'Jogar',
			},
            //pl
			'pl': {
				'title': 'GameBater - Spróbuj nie dojść',
				'p1-step1-1': 'Zamknij drzwi zanim zaczniesz grać w tę grę!',
                'p1-step1-2': 'Spróbuj nie dojść!',
				'p1-step1-3': 'Zagraj w grę',
                'p1-step2-1': 'STWÓRZ JĄ, ZERŻNIJ',
                'p1-step2-2': 'ZAPŁODNIJ',
                'p1-step2-3': 'Nie, dzięki',
                'p1-step2-4': 'Kontynuuj',
                'p1-step3-1': 'WYBIERZ SWOJĄ PIERWSZĄ',
                'p1-step3-2': 'SEKS PARTNERKĘ',
                'p1-step3-3': '&#171; Lisa',
                'p1-step3-4': 'Elsa &#187;',
                'p1-step4-1': 'OSTRZEŻENIE',
                'p1-step4-2': 'SPRÓBUJ NIE DOJŚĆ!',
                'p1-step4-3': 'Zagraj w grę',
			}
		}	
		if(typeof store[localize] == 'undefined') {
            localize = def;
        }
        
		return store[localize][str];
      
	}
	document.title = lang('title');
	window.lang = lang;
})(window);
