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
			
			'en': {
				'title': 'Guaranteed 100% Satisfaction Free Sex Game - FreeSexGame.com',
				'p1-step1-1': '<img src="./files/choose-your-gender.png" width="522" height="304" alt="">',
				'p1-step1-2': '<img src="./files/female-cropped.png" width="215" height="201">',
				'p1-step1-3': '<img src="./files/male-cropped.png" width="215" height="201">',
				'p1-step2-1': '<img src="./files/choose-your-partner.png" width="636" height="304" alt="">',
				'p1-step2-2': '<img src="./files/natalia.png" width="318" height="116" class="desktop">',
				'p1-step2-3': '<img src="./files/natalia-cropped.png" width="233" height="111" class="mobile">',
				'p1-step2-4': '<img src="./files/adrianna.png" width="376" height="115" class="desktop">',
				'p1-step2-5': '<img src="./files/adrianna-cropped.png" width="301" height="115" class="mobile">',
				'p1-step3-1': '<img src="./files/choose-your-dick-size.png" width="493" height="233" class="copy" alt="">',
				'p1-step3-2': '<img src="./files/massive.png" width="242" height="108" alt="">',
				'p1-step3-3': '<img src="./files/anaconda.png" width="294" height="112" alt="">',
				'p1-step4-1': '<img src="./files/choose-your-breast-size.png" width="701" height="248" alt="">',
				'p1-step4-2': '<img src="./files/small-4.png" width="186" height="111" alt="">',
				'p1-step4-3': '<img src="./files/large-4.png" width="173" height="112" alt="">',
				'p1-step4-4': '<img src="./files/large-4.png" width="173" height="112" alt="">',
				'p1-step5-1': '<img src="./files/choose-your-ass-size.png" width="499" height="252" alt=""></img>',
				'p1-step5-2': '<img src="./files/small-5.png" width="184" height="113" alt="">',
				'p1-step5-3': '<img src="./files/large-5.png" width="174" height="113" alt="">',
				'p1-step5-4': '<img src="./files/massive-5.png" width="244" height="113" alt="">',
                'p1-step6-1': '<img src="./files/confirm-your-age.png" width="593" height="320" alt="">',
				'p1-step6-2': '<img src="./files/continue.png" width="429" height="141" alt="">',
                
			},
		}	
		if(typeof store[localize] == 'undefined') {
            localize = def;
        }
        
		return store[localize][str];
      
	}
	document.title = lang('title');
	window.lang = lang;
})(window);
