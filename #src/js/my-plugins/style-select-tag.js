//- Стилизация выпадающего списка
	// Оболочки выпадающих списков
	let selectWrappers = document.querySelectorAll('.style-select');
	let multiOpen = false; // Режим мульти открытости
	if (selectWrappers) {
		// Для каждого элемента из selectWrappers
		for (let i = 0; i < selectWrappers.length; i++) {
			// Основные элементы:
				// Select
				let select = selectWrappers[i].querySelector('select'); // Элементы select
					select.style.display = 'none'; // Скрываем список
				// Label
				let label = selectWrappers[i].querySelector('label'); // Элементы label
					label.classList.add('style-select__label');
				// Option
				let options = select.querySelectorAll('option'); // Элементы option
	
			// Создаем нужные элементы для подстановки
				// Замена тегу select
				let ul_select = document.createElement('ul'); 
					ul_select.classList.add('style-select__list');

				// Элемент li с функцией "не выбрано"
				let li_noSelect = document.createElement('li');
					li_noSelect.classList.add('style-select__list-no-select');
					li_noSelect.style.cursor = 'pointer';
					li_noSelect.textContent = 'Не выбрано';
				
				// Элемент в котором отображается выбранный пункт
				let span_preview = document.createElement('span'); 
					span_preview.classList.add('style-select__selected-elem-preview');
					span_preview.style.cursor = 'pointer';
	
				// Создаем элементы li_option с содержимым option
				for (let i = 0; i < options.length; i++ ) {
					let optionText = options[i].textContent;
					let li_option = document.createElement('li'); // замена тегу options
						li_option.classList.add('style-select__list-item');
						li_option.style.cursor = 'pointer';
						li_option.textContent = optionText;
						ul_select.insertAdjacentElement('beforeend', li_option);
				};

				// Вставляю в список кнопочку "не выбрано" 
				ul_select.insertAdjacentElement('beforeend', li_noSelect);
				
				// Вставляю элементы в документ после Label
				label.insertAdjacentElement('afterend', ul_select);
				label.insertAdjacentElement('afterend', span_preview)

				// Событие клика на оболочке style-select
				span_preview.addEventListener('click',function(){
					// Если режим мультиоткрытости
					if (multiOpen) { 
						openList();
					// Режим одиночного открытия
					} else if (!multiOpen) { 
						for (let j = 0; j < selectWrappers.length; j++) {
							if (i != j) {
								selectWrappers[j].classList.remove('style-select_active');
								selectWrappers[j].querySelector('.style-select__list').classList.remove('style-select__list_active');
								selectWrappers[j].querySelector('.style-select__selected-elem-preview').classList.remove('style-select__selected-elem-preview_active');
								selectWrappers[j].querySelector('.style-select__list').style.maxHeight = '';
							};
						};
						openList();	
					};
				}, false);

				function openList() {
					selectWrappers[i].classList.toggle('style-select_active');
					selectWrappers[i].querySelector('.style-select__list').classList.toggle('style-select__list_active');
					span_preview.classList.toggle('style-select__selected-elem-preview_active');
					if (selectWrappers[i].querySelector('.style-select__list').classList.contains('style-select__list_active')) {
						selectWrappers[i].querySelector('.style-select__list').style.maxHeight = ul_select.scrollHeight + 'px';
					} else if (!selectWrappers[i].querySelector('.style-select__list').classList.contains('style-select__list_active')) {
						selectWrappers[i].querySelector('.style-select__list').style.maxHeight = '';
					};
				};

				// Работа с пунктами списка
				let listItems = selectWrappers[i].querySelectorAll('.style-select__list-item');
				console.log(listItems);
				/* При клике на элемент списка устанавливает атрибут селектед 
				 * нужному элементу формы. А также берет текст нажатого элемента 
				 * и вставляет его в предпросмотр*/
				for (let j = 0; j < listItems.length; j++) {
					let wordLength = 5;
					listItems[j].addEventListener('click', function(){
						for (let i = 0; i < options.length; i++ ) {
							options[i].removeAttribute('selected');
						};
						options[j].setAttribute('selected','');
						
						let pastAllText = listItems[j].textContent;
					
						span_preview.textContent = pastAllText;
						openList();
						for (let elem of listItems) {
							elem.style.fontWeight = '';
							elem.style.backgroundColor = '';
						};
						listItems[j].style.fontWeight = '700';
						listItems[j].style.backgroundColor = 'rgba(200, 200, 200, 0.5)';
					}, false);
				};

				/* При клике на элемент не выбрано - удалить атрибуты селектед 
				 * B чистить просмотр выбранного элемента.*/
				li_noSelect.addEventListener('click', function() {
					for (let i = 0; i < options.length; i++ ) {
						options[i].removeAttribute('selected');	
					};
					for (let elem of listItems) {
						elem.style.fontWeight = '';
						elem.style.backgroundColor = '';
					};
					span_preview.textContent = '';
					openList();
				}, false);
		};

		//- Отслеживание клика для закрытия фильтра
		function closeFilterList(event) {
			//let formTarget = event.target.closest('form.catalog-filter__form');
			let formTarget = event.target.closest('.style-select');
			if (formTarget) {
				return;
			} else {
				for (let j = 0; j < selectWrappers.length; j++) {
					selectWrappers[j].classList.remove('style-select_active');
					selectWrappers[j].querySelector('.style-select__list').classList.remove('style-select__list_active');
					selectWrappers[j].querySelector('.style-select__selected-elem-preview').classList.remove('style-select__selected-elem-preview_active');
					selectWrappers[j].querySelector('.style-select__list').style.maxHeight = '';
				};
			};
		};
		document.addEventListener('click', closeFilterList, false);
	};
	
/* Scss Классы:
.style-select {
	&__label {} // Заголовок списка
	&__selected-elem-preview {} // Показ выбранного элемента
	&__selected-elem-preview_active {} // Показ выбранного элемента активен
	&__list {} // Список выриантов
	&__list_active {} // Активный список выриантов
	&__list-item {} // Элемент списка
}

.style-select_active {
	&__label {} // Заголовок списка
	&__selected-elem-preview {} // Показ выбранного элемента
	&__selected-elem-preview_active {} // Показ выбранного элемента активен
	&__list {} // Список выриантов
	&__list_active {} // Активный список выриантов
	&__list-item {} // Элемент списка
}
*/