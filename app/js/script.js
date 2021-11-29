$(document).ready(function () {
	body = $('body')


	//modals
	var modalState = {
		"isModalShow": false, //state show modal
		"scrollPos": 0
	};

	let fixScrollWindow = () => {
		modalState.scrollPos = $(window).scrollTop();
		body.css({
			overflowY: 'hidden',
			top: -modalState.scrollPos,
			width: '100%',
			paddingRight: scrollWidth
		});
	}

	let unFixScrollWindow = () => {
		body.css({
			overflow: '',
			position: '',
			top: modalState.scrollPos,
			paddingRight: 0
		});
		$(window).scrollTop(modalState.scrollPos);
	}

	var scrollWidth = window.innerWidth - $(document).width();
	var openModal = function () {
		if (!$('.modal-layer').hasClass('active')) {
			$('.modal-layer').addClass('active');
			fixScrollWindow()
		}
		modalState.isModalShow = true;
	};

	var closeModal = function () {
		unFixScrollWindow();
		$('.modal').addClass('modal-hide-animation');
		setTimeout(function () {
			$('.modal').removeClass('modal-hide-animation');
			$('.modal').removeClass('active');
			$('.modal-layer').removeClass('active');
		}, 400);
		modalState.isModalShow = false;
	};

	var initModal = function (el) {
		openModal();
		$('.modal').each(function () {
			if ($(this).data('modal') === el) {
				$(this).addClass('active')
			} else {
				$(this).removeClass('active')
			}
		});
		var modalHeightCont = $(window).height();
		$('.modal-filter').height(modalHeightCont);
		console.log(32);
	};

	$('.js-modal').click(function () {
		initModal($(this).data("modal"));
	});

	$('.js-modal-close').click(function () {
		closeModal();
	});

	body.on('mousedown', function (e) {
		e.target.className === 'modal-wrap' ? closeModal() : false
	});

	$(document).on('keyup', function (e) {
		e.key === 'Escape' ? closeModal() : ''
	})
	//modals===end

	// fix top-menu
	var shrinkHeader = 250;
	var head = $('.header-wrap');
	var heightHeader = head.height();
	$(window).scroll(function () {
		var scroll = $(this).scrollTop();
		if (scroll >= shrinkHeader) {
			body.css('paddingTop', heightHeader);
			head.addClass('shrink');
		} else {
			body.css('paddingTop', 0);
			head.removeClass('shrink');
		}
	});
	// fix top-menu === end

	// ============ TRIGGER EVENT ============

	// toggle single
	body.on('click', '.js-toggle', function () {
		$(this).toggleClass("active")
	})
	// toggle single === end

	// slide toggle
	body.on('click', '.js-slide', function () {
		$(this).closest('.js-slide-wrap').find('.js-slide-cont').slideToggle(500);
	});
	// slide toggle === end

	// toggle class one from list
	var actionTick;
	(
		actionTick = function () {
			body.on('click', '.js-tick', function () {
				var parent = $(this).closest('.js-tick-cont');
				parent.find('.js-tick').removeClass('active');
				$(this).addClass('active')
			});
		}
	)()
	// toggle class one from list === end

	//toggle class + neighbor
	body.on('click', '.js-commutator-el', function () {
		var thisItem = $(this).data("item");
		var thisGroup = $(this).data("group") || false;
		var isEach = $(this).data("each") || false;
		var selector;
		$(this).toggleClass("active")
		if ($('.js-commutator-cont').data('group')) {
			selector = $(".js-commutator-cont[data-group=" + thisGroup + "");
		} else {
			selector = $(".js-commutator-cont");
		}
		selector.each(function () {
			if ($(this).data("item") === thisItem) {
				$(this).toggleClass('active');
			} else {
				isEach ? $(this).removeClass("active") : false
			}
		})
	})
	//toggle class + neighbor === end

	// switch
	body.on('click', '.js-switch', function (e) {
		if (e.target.className != 'style-input') {
			var typeItem = $(this).data("item");
			if ($(this).closest('.js-switch-wrap').length < 0) {
				var groupItem = $(this).data("group");
				var selector = $('.js-switch[data-group=' + groupItem + ']');
				var size = selector.size()
				selector.each(function () {
					$(this).removeClass("active");
				});
				$('.js-switch-cont').each(function () {
					if ($(this).data("group") === groupItem) {
						if ($(this).data("item") === typeItem) {
							if (size === 0) {
								$(this).toggleClass("hidden")
							} else {
								$(this).removeClass("hidden")
							}
						} else {
							$(this).addClass("hidden");
						}
					}
				});
			} else {
				var parent = $(this).closest('.js-switch-wrap');
				parent.find('.js-switch').removeClass('active')
				parent.find('.js-switch-cont').each(function () {
					if ($(this).data("item") === typeItem) {
						$(this).removeClass("hidden")
					} else {
						$(this).addClass("hidden");
					}
				});
			}
			$(this).addClass("active");
		}
	});
	// switch === end

	// Tab toggle
	var actionTab;
	(
		actionTab = function () {
			body.on('click', '.js-tab', function () {
				var current = $(this).index();
				var parent = $(this).closest('.js-tab-wrap')
				parent.find('.js-tab-cont').removeClass('active')
				parent.find('.js-tab-cont').eq(current).addClass('active')
			});
		}
	)()
	// Tab toggle  === end

	// accordion row toggle
	body.on('click', '.js-accordion-head', function (e) {
		var current = $(this).closest('.js-accordion-el').index()
		$(this).closest('.js-accordion').find('.js-accordion-el').each(function () {
			if ($(this).index() != current) {
				$(this).find('.js-accordion-head').removeClass('active')
				$(this).find('.js-accordion-content').slideUp('active')
			} else {
				$(this).find('.js-accordion-content').slideToggle('active')
				$(this).find('.js-accordion-head').toggleClass('active')
			}
		})
	});
	// accordion row toggle === end

	// ============ TRIGGER EVENT END ============

	// dropdown
	$('.dropdown').click(function () {
		$(this).attr('tabindex', 1).focus();
		$(this).toggleClass('active');
		$(this).find('.dropdown-menu').slideToggle(300);
	});
	$('.dropdown').focusout(function () {
		$(this).removeClass('active');
		$(this).find('.dropdown-menu').slideUp(300);
	});
	$('.dropdown .dropdown-menu__el').click(function () {
		var parent = $(this).parents('.dropdown')
		parent.find('.dropdown-current__val').html($(this).html());
		parent.find('input').attr('value', $(this).data('value'));
	});
	// dropdown === end

	// Переключение с кнопки на инкремент
	// increment btn
	body.on('click', '.js-btn-incr', function (e) {
		let parent = $(this).closest(".js-btn-incr__wrap")
		parent.find(".js-btn-incr").addClass('hidden');
		parent.find(".js-incr-wrap").removeClass('hidden');
	});
	body.on('click', '.js-inc-nav--minus', function (e) {
		if (incrEl.value === 1) {
			console.log(incrEl.value);
			let parent = $(this).closest(".js-btn-incr__wrap")
			parent.find(".js-btn-incr").removeClass('hidden');
			parent.find(".js-incr-wrap").addClass('hidden');
		}
	})
	// increment btn === end

	// incr
	var incrEl = {}
	body.on('click', '.js-inc-nav', function (e) {
		incrEl.parent = $(this).closest(".js-incr-wrap");
		incrEl.value = parseInt(incrEl.parent.find('.js-incr-val').html());
		incrEl.state = incrEl.parent.find('.js-incr-val')
		incrEl.min = incrEl.parent.data('min') * 1 || 1
	});
	body.on('click', '.js-inc-nav--minus', function (e) {
		incrEl.value = incrEl.value <= incrEl.min ? incrEl.min : --incrEl.value
		incrEl.state.html(incrEl.value);
		//console.log(incrEl.value);
	});
	body.on('click', '.js-inc-nav--plus', function (e) {
		++incrEl.value;
		incrEl.value = incrEl.value > 100 ? 100 : incrEl.value;
		incrEl.state.html(incrEl.value);
	});
	// incr === end

	// animate scroll to id
	$(".js-scroll-to").mPageScroll2id({
		offset: 100,
	});
	$(".js-slide-block-close.js-scroll-to").click(function () {
		hideSlideMenu();
	});
	// animate scroll to id === end


	// slide menu
	var hideSlideMenu = function (el) {
		$(".head-toggle").removeClass('active');
		$(".slide-block").removeClass("active");
		$(".filter").removeClass("active");
		unFixScrollWindow();
	}
	$('.js-slide-block-toggle').click(function (event) {
		$(".js-slide-block-toggle").not(this).removeClass('active');
		$(".filter").toggleClass("active");
		fixScrollWindow();
		var current = $(this).data("menu");
		$(".slide-block").each(function () {
			if ($(this).data("menu") === current) {
				$(this).toggleClass("active")
			} else {
				$(this).removeClass("active")
			}
		})
		$(this).toggleClass('active');
	});

	$('.js-slide-block-close').click(function (event) {
		hideSlideMenu();
	});
	// slide menu === end

	//window.condition = {};
	//window.condition.info = info;
	//upload-btn === end
});
