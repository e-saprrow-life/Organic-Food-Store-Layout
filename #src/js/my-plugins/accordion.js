function addAccordion() {
	/* Добавляет на страницу аккордеон.
     * Классы css:
        ._accordion {}
        ._accordion__title {}
        ._accordion__content {}
     
     * Классы scss:
        ._accordion {
            &__title {}
            &__content {}
        }
    */
    let param = {
        multiOpenAccordion: true, // Позволяет оставаться открытым другим вкладкам
        clickOutHide: true,      // Если клик снаружи блока то скрыть контент
		openSpeed: 0.3, 	    // Скорость открытия аккордеона в мс.
		animationType: 'ease', // тип анимации открытия аккордеона
    };

    let accordion = document.querySelectorAll('._accordion');

    if (accordion) {
		// Действие для каждого отдельного аккордеона
		for (let i = 0; i < accordion.length; i++) {
			let accordionTitle = accordion[i].querySelector('._accordion__title');
				accordionTitle.style.cssText = `
				-moz-user-select: none;
				-khtml-user-select: none;
					   user-select: none; 
					cursor: pointer;
				`;
        	let accordionContent = accordion[i].querySelector('._accordion__content');
				accordionContent.style.cssText = `
					max-height: 0px;
					overflow: hidden;
					transition: max-height ${param.openSpeed}s ${param.animationType} 0s; 
				`;

            function openAccordion() {
                accordion[i].classList.toggle('_accordion__active');
                accordionTitle.classList.toggle('_accordion__title_active');
                accordionContent.classList.toggle('_accordion__content_active');

                if (accordion[i].classList.contains('_accordion__active')) {
                    accordionContent.style.maxHeight = accordionContent.scrollHeight + 'px';
                } else if (!accordion[i].classList.contains('_accordion__active')) {
                    accordionContent.style.maxHeight =  0 + 'px';
                };
            };


			if (param.multiOpenAccordion) {
				accordionTitle.addEventListener('click', openAccordion, false);
			} else if (!param.multiOpenAccordion) {
				accordionTitle.addEventListener('click', function(){
					for (let j = 0; j < accordion.length; j++) {
						if (i != j) {
							accordion[j].classList.remove('_accordion__active');
							accordion[j].querySelector('._accordion__title').classList.remove('_accordion__title_active');
							accordion[j].querySelector('._accordion__content').classList.remove('_accordion__content_active');
							accordion[j].querySelector('._accordion__content').style.maxHeight =  0 + 'px';
						};
					};
					openAccordion();
				}, false);
			};
		};

        if (param.clickOutHide) {
            function closeAccordionIfClickOut(event) {
                let target = event.target.closest('._accordion');
                if (!target) {
                    for (let j = 0; j < accordion.length; j++) {
						accordion[j].classList.remove('_accordion__active');
						accordion[j].querySelector('._accordion__title').classList.remove('_accordion__title_active');
						accordion[j].querySelector('._accordion__content').classList.remove('_accordion__content_active');
						accordion[j].querySelector('._accordion__content').style.maxHeight =  0 + 'px';
					};
                };
            };
            document.addEventListener('click', closeAccordionIfClickOut, false);
        };
    };
};
addAccordion();