(() => {

	hamburgerMenu();
	fixMenu();

	function fixMenu() {

		window.onscroll = () => {

			if ( pageYOffset > 0 ) {

				header.classList.add('fix');
				main.style.marginTop =  header.offsetHeight + 'px';

			} else {

				header.classList.remove('fix');
				main.style.marginTop =  0 + 'px';
			}
		}
	}

	function hamburgerMenu() {

		document.addEventListener('click', (event) => {

				var e = event.target;
				var targetElem = event.target.getAttribute('href');
				var links = document.querySelectorAll('.header__nav-item');

				while(!e.classList.contains('hamb')) {
					if (e.tagName == 'BODY') { e = null; break }
					e = e.parentNode;
				}

			if (e) {

				nav.classList.toggle('active')
				for (let link of links) link.classList.toggle('submenu-open');
				e = null;
			}

			else if (event.target.classList.contains('scroll')) {

				event.preventDefault();

				if (targetElem.length != 0) {
					$('html, body').animate({ scrollTop: ($(targetElem).offset().top - $('.header').innerHeight())}, 1000);

					if (window.innerWidth < 1100) {

					nav.classList.toggle('active');
					hamburger.classList.remove('is-active');
					for (let link of links) link.classList.remove('submenu-open')
					}
				}
			}

			else if (event.target.classList.contains('active')) {
				return;
			}      

			else  {

				if ($(window).width() < 1100) {

					for (let link of links) {link.style.opacity = '0px'; link.classList.remove('submenu-open')}
					nav.classList.remove('active')
					hamburger.classList.remove('is-active')
				}
			}
		})
	}
})();
(() => {

	if (document.body.clientWidth < 768) {
		toggleprogramMobile()
	} else {
		toggleprogram()
	}

	toggleFaculties();

	function toggleFaculties() {

		if (!document.querySelector('#directions')) return;

		let
			tabs = directions.querySelectorAll("[data-button]"),
			content = directions.querySelector('.content');

		for (let tab of tabs) {

			tab.addEventListener('click', function () {

				let
					activeTab = this.closest('.content').querySelector('.tab-item.active'),
					infoBlocks = this.closest('.content').querySelectorAll("[data-info]"),
					activeInfoBlock = this.closest('.content').querySelector('.info-item.active');

				activeTab.classList.remove('active')
				activeInfoBlock.classList.remove('active')

				this.classList.add('active')

				for (let infoBlock of infoBlocks) {

					if (infoBlock.dataset.info === this.dataset.button) {
						infoBlock.classList.add('active');
					}
				}
			})
		}
	}

	function toggleprogram() {

		let
			tabs = program.querySelectorAll("[data-button]"),
			content = program.querySelector('.content');

		for (let tab of tabs) {

			tab.addEventListener('click', function () {

				let
					activeTab = this.closest('.content').querySelector('.tab-item.active'),
					infoBlocks = this.closest('.content').querySelectorAll("[data-info]"),
					activeInfoBlock = this.closest('.content').querySelector('.info-item.active');

				activeTab.classList.remove('active')
				activeInfoBlock.classList.remove('active')

				this.classList.add('active')

				for (let infoBlock of infoBlocks) {

					if (infoBlock.dataset.info === this.dataset.button) {
						infoBlock.classList.add('active');
					}
				}
			})
		}
	}

	function toggleprogramMobile() {

		let
			tabs = program.querySelectorAll("[data-button]"),
			infoBlocks = program.querySelectorAll("[data-info]"),
			content = program.querySelector('.content');

		for (let tab of tabs) {

			for (let infoBlock of infoBlocks) {

				if (tab.dataset.button === infoBlock.dataset.info) {

					tab.insertAdjacentElement('afterend', infoBlock);
				}
			}
		}

		infoBlocks[0].classList.add('active');
		infoBlocks[0].style.height = infoBlocks[0].scrollHeight + 75 + 'px';

		for (let tab of tabs) {

			tab.addEventListener('click', function () {

				let actveElem = document.querySelector('.program__info-item.active');

				actveElem.classList.remove('active');
				actveElem.previousSibling.classList.remove('active');
				actveElem.style.height = '0px';

				setTimeout(() => {

					$('html, body').animate({
						scrollTop: ($(this).offset().top - 90)
					}, 250);
				}, 750);

				setTimeout(() => {


					this.classList.add('active');
					this.nextSibling.classList.add('active');

					this.classList.contains('active') ?
						this.nextSibling.style.height =
						this.nextSibling.scrollHeight + 'px' :
						this.nextSibling.style.height = '0px';
				}, 500);
			})
		}
	}

})();

$(function () {
    /* Inits */
    initLazy();
    /* Lazy */
    function initLazy() {

        let
            lazyArr = [].slice.call(document.querySelectorAll('.lazy')),
            active = false,
            threshold = 200
            ;

        const lazyLoad = function (e) {
            if (active === false) {
                active = true;

                setTimeout(function () {
                    lazyArr.forEach(function (lazyObj) {
                        if ((lazyObj.getBoundingClientRect().top <= window.innerHeight + threshold && lazyObj.getBoundingClientRect().bottom >= -threshold) && getComputedStyle(lazyObj).display !== 'none') {

                            if (lazyObj.dataset.src) {
                                let
                                    img = new Image(),
                                    src = lazyObj.dataset.src
                                    ;
                                img.src = src;
                                img.onload = function () {
                                    if (!!lazyObj.parent) {
                                        lazyObj.parent.replaceChild(img, lazyObj);
                                    } else {
                                        lazyObj.src = src;
                                    }
                                }
                                lazyObj.removeAttribute('data-src');
                            }

                            if (lazyObj.dataset.srcset) {
                                lazyObj.srcset = lazyObj.dataset.srcset;
                                lazyObj.removeAttribute('data-srcset');
                            }

                            lazyObj.classList.remove('lazy');
                            lazyObj.classList.add('lazy-loaded');

                            lazyArr = lazyArr.filter(function (obj) {
                                return obj !== lazyObj;
                            });

                            if (lazyArr.length === 0) {
                                document.removeEventListener('scroll', lazyLoad);
                                window.removeEventListener('resize', lazyLoad);
                                window.removeEventListener('orientationchange', lazyLoad);
                            }
                        }
                    });

                    active = false;
                }, 200);
            }
        };

        lazyLoad();

        document.addEventListener('scroll', lazyLoad);
        window.addEventListener('resize', lazyLoad);
        window.addEventListener('orientationchange', lazyLoad);
    }

    // Smooth scroll (filter link)
    $('[data-scroll]').on('click', function (event) {
        event.preventDefault();

        const blockId = $(this).data('scroll'),
            blockOffset = $(blockId).offset().top;

        $('html, body').animate({
            scrollTop: blockOffset - 150
        }, 1000)


        $('.header__nav').removeClass('nav-active')
        $('.header__logo').removeClass('hide-logo')
        $('.burger').removeClass('burger-active')

    })


    // Логика табов часто задаваемых вопросов

    $('.accordion-questions__tab').click(function () {
        let $tabs = $('.accordion-questions__tab'),
            $contents = $('.accordion-questions__content'),
            $tab = $(this),
            id = $tab.attr('data-tab'),
            $content = $('.accordion-questions__content[data-tab="' + id + '"]');

        $tabs.not($tab).removeClass('accordion-questions__tab_active');
        $tab.toggleClass('accordion-questions__tab_active');

        $contents.not($content).removeClass('accordion-questions__content_active');
        $content.toggleClass('accordion-questions__content_active');
    });



    /* Слайдеры */
    let $program_slider = $('.main__items'),
        settingsProgram = {
            mobileFirst: true,
            dots: false,
            infinite: false,
            centerMode: false,
            slidesToShow: 1.5,
            slidesToScroll: 1,

            centerPadding: '70px',
            responsive: [
                {
                    breakpoint: 425,
                    settings: {
                        slidesToShow: 2

                    }
                },
                {
                    breakpoint: 565,
                    settings: "unslick"

                }
            ]

        }


    $program_slider.slick(settingsProgram);


    $(window).on('resize', function () {
        if (!$program_slider.hasClass('slick-initialized')) {
            return $program_slider.slick(settingsProgram);
        }
    });

    $('.result__slider').slick({
        dots: true
    });

    let $speakers_slider = $('.advantages__content'),
        settingsSpeakers = {
            mobileFirst: true,
            infinite: false,
            centerMode: false,
            slidesToShow: 1.3,
            slidesToScroll: 1,

            centerPadding: '80px',
            responsive: [
                {
                    breakpoint: 576,
                    settings: "unslick"
                }
            ]

        }


    $speakers_slider.slick(settingsSpeakers);

    $(window).on('resize', function () {
        if (!$speakers_slider.hasClass('slick-initialized')) {
            return $speakers_slider.slick(settingsSpeakers);
        }
    });


});




