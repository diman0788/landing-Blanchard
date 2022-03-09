// burger

document.querySelector('#burger').addEventListener('click', function () {
  document.querySelector('#menu').classList.toggle('is-active')
  document.body.classList.toggle('overflow')
  document.querySelector('.header-left__btn').classList.toggle('open')
  document.querySelectorAll('.header-nav-list__item').forEach(function (e) {
   e.addEventListener('click', function() {
     document.querySelector('#menu').classList.remove('is-active')
     document.body.classList.remove('overflow')
     document.querySelector('.header-left__btn').classList.remove('open')
   })
   document.querySelector('.header-nav__btn').addEventListener('click', function() {
    document.querySelector('#menu').classList.remove('is-active')
    document.body.classList.remove('overflow')
    document.querySelector('.header-left__btn').classList.remove('open')
  })
  })
})

// плавный скрол
const smoothLinks = document.querySelectorAll('a[href^="#"]');
for (let smoothLink of smoothLinks) {
  smoothLink.addEventListener('click', (e) => {
    e.preventDefault();
    const id = smoothLink.getAttribute('href');

    document.querySelector(id).scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  });
}

// header

let intervelId;

document.querySelectorAll('.header-bottom-lift__btn').forEach(e => {
  e.addEventListener('click', e => {
    const menu = e.currentTarget.dataset.path_header;
    document.querySelectorAll('.header-bottom-left__dropdaun').forEach(e => {
      if (!document.querySelector(`[data-target=${menu}]`).classList.contains('open')) {
        e.classList.remove('dropdaun-is-active');
        e.classList.remove('open');
        document.querySelector(`[data-target=${menu}]`).classList.add('dropdaun-is-active')
        intervelId = setTimeout(() => {
          document.querySelector(`[data-target=${menu}]`).classList.add('open');
        }, 0)
      }

      if (document.querySelector(`[data-target=${menu}]`).classList.contains('open')) {
        document.querySelector(`[data-target=${menu}]`).classList.remove('dropdaun-is-active')
        intervelId = setTimeout(() => {
          document.querySelector(`[data-target=${menu}]`).classList.remove('open');
        }, 0)
      }

      window.onclick = e => {
        if (e.target == document.querySelector(`[data-target=${menu}]`) || e.target == document.querySelector(`[data-path_header=${menu}]`)) {
          return;
        } else {
          document.querySelector(`[data-target=${menu}]`).classList.remove('dropdaun-is-active');
          document.querySelector(`[data-target=${menu}]`).classList.remove('open');
        }
      }
    })
  })
})

// gallery

const galSwiper = new Swiper('.gallery-right-swiper-container', {
    pagination: {
        el: '.gallery-right-swiper-button__pagination',
        type: 'fraction',
        simulateTouch: true,
        touchRatio: 1,
        touchAngle: 45,
        grabCursor: true,
    },
    navigation: {
        nextEl: '.gallery-right-swiper-button__next',
        prevEl: '.gallery-right-swiper-button__prev',
    },
    slidesPerView: 1,
    watchOverflow: true,
    slidesPerGroup: 1,
    centeredSlides: false,
    initialSlide: 1,

    breakpoints: {
        480: {
            slidesPerView: 2,
            slidesPerGroup: 2,
            spaceBetween: 14
        },
        750: {
            slidesPerView: 2,
            slidesPerGroup: 2,
            spaceBetween: 34
        },
        769: {
            slidesPerView: 3,
            slidesPerGroup: 3,
            spaceBetween: 34
        },
        1050: {
            slidesPerView: 2,
            slidesPerGroup: 2,
            spaceBetween: 34
        },
        1480: {
            slidesPerView: 3,
            slidesPerGroup: 3,
            spaceBetween: 50
        }
    },
});

// select

const mySelekt = () => {
    const element = document.querySelector('.section-left__select');
    const choices = new Choices(element, {
        position: 'bottom',
        searchEnabled: false,
        itemSelectText: ' ',
    });
};

mySelekt();

class Modal {
    constructor(options) {
        let defaultOptions = {
            isOpen: () => {},
            isClose: () => {},
        };
        this.options = Object.assign(defaultOptions, options);
        this.modal = document.querySelector('.modal');
        this.speed = false;
        this.animation = false;
        this.isOpen = false;
        this.modalContainer = false;
        this.previousActiveElement = false;
        this.fixBlocks = document.querySelectorAll('.fix-block');
        this.focusElements = [
            'a[href]',
            'input',
            'button',
            'select',
            'textarea',
            '[tabindex]',
        ];
        this.events();
    }

    events() {
        if (this.modal) {
            document.addEventListener(
                'click',
                function(e) {
                    const clickedElement = e.target.closest('[data-path]');
                    if (clickedElement) {
                        let target = clickedElement.dataset.path;
                        let animation = clickedElement.dataset.animation;
                        let speed = clickedElement.dataset.speed;
                        this.animation = animation ? animation : 'fade';
                        this.speed = speed ? parseInt(speed) : 300;
                        this.modalContainer = document.querySelector(
                            `[data-target="${target}"]`
                        );
                        this.open();
                        return;
                    }

                    if (e.target.closest('.gallery-modal-card-close')) {
                        this.close();
                        return;
                    }
                }.bind(this)
            );

            window.addEventListener(
                'keydown',
                function(e) {
                    if (e.keyCode == 27) {
                        if (this.isOpen) {
                            this.close();
                        }
                    }

                    if (e.keyCode == 9 && this.isOpen) {
                        this.focusCatch(e);
                        return;
                    }
                }.bind(this)
            );

            this.modal.addEventListener(
                'click',
                function(e) {
                    if (!e.target.classList.contains('gallery-modal-card') &&
                        !e.target.closest('.gallery-modal-card') &&
                        this.isOpen
                    ) {
                        this.close();
                    }
                }.bind(this)
            );
        }
    }

    open() {
        this.previousActiveElement = document.activeElement;

        this.modal.style.setProperty('--transition-time', `${this.speed / 1000}s`);
        this.modal.classList.add('is-open');
        this.disableScroll();

        this.modalContainer.classList.add('modal-open');
        this.modalContainer.classList.add(this.animation);

        setTimeout(() => {
            this.options.isOpen(this);
            this.modalContainer.classList.add('animate-open');
            this.isOpen = true;
            this.focusTrap();
        }, this.speed);
    }

    close() {
        if (this.modalContainer) {
            this.modalContainer.classList.remove('animate-open');
            this.modalContainer.classList.remove(this.animation);
            this.modal.classList.remove('is-open');
            this.modalContainer.classList.remove('modal-open');

            this.enableScroll();
            this.options.isClose(this);
            this.isOpen = false;
            this.focusTrap();
        }
    }

    focusCatch(e) {
        const focusable = this.modalContainer.querySelectorAll(this.focusElements);
        const focusArray = Array.prototype.slice.call(focusable);
        const focusedIndex = focusArray.indexOf(document.activeElement);

        if (e.shiftKey && focusedIndex === 0) {
            focusArray[focusArray.length - 1].focus();
            e.preventDefault();
        }

        if (!e.shiftKey && focusedIndex === focusArray.length - 1) {
            focusArray[0].focus();
            e.preventDefault();
        }
    }

    focusTrap() {
        const focusable = this.modalContainer.querySelectorAll(this.focusElements);
        if (this.isOpen) {
            focusable[0].focus();
        } else {
            this.previousActiveElement.focus();
        }
    }

    disableScroll() {
        let pagePosition = window.scrollY;
        this.lockPadding();
        document.body.classList.add('disable-scroll');
        document.body.dataset.position = pagePosition;
        document.body.style.top = -pagePosition + 'px';
    }

    enableScroll() {
        let pagePosition = parseInt(document.body.dataset.position, 10);
        this.unlockPadding();
        document.body.style.top = 'auto';
        document.body.classList.remove('disable-scroll');
        window.scroll({ top: pagePosition, left: 0 });
        document.body.removeAttribute('data-position');
    }

    lockPadding() {
        let paddingOffset = window.innerWidth - document.body.offsetWidth + 'px';
        this.fixBlocks.forEach((el) => {
            el.style.paddingRight = paddingOffset;
        });
        document.body.style.paddingRight = paddingOffset;
    }

    unlockPadding() {
        this.fixBlocks.forEach((el) => {
            el.style.paddingRight = '0px';
        });
        document.body.style.paddingRight = '0px';
    }
}

const modal = new Modal();

// accordion

$( function() {
  $( "#accordion" ).accordion({
        heightStyle: 'content'
  });
});

// events

const eventSwiper = new Swiper('.section-events-swiper-container', {
  pagination: {
      el: '.section-events__pagination',
      type: 'bullets',
      clickable: true,
      simulateTouch: true,
  },
  navigation: {
      nextEl: '.section-events__button-next',
      },

      loop: true,
      slidesPerView: 1,
      watchOverflow: false,
      slidesPerGroup: 1,
      centeredSlides: false,
      initialSlide: 0,

  breakpoints: {
          480: {
            slidesPerView: 2,
            slidesPerGroup: 2,
            spaceBetween: 14
          },
          560: {
              slidesPerView: 2,
              slidesPerGroup: 2,
              spaceBetween: 33,
          },
          869: {
              slidesPerView: 2,
              slidesPerGroup: 3,
              spaceBetween: 34,
          },
          1014: {
              slidesPerView: 3,
              slidesPerGroup: 3,
              spaceBetween: 24,
          },
          1480: {
              slidesPerView: 3,
              slidesPerGroup: 3,
              spaceBetween: 50,
          }
  },
});


// projects

const projectsSwiper = new Swiper('.projects-bottom__partners', {

  navigation: {
      nextEl: '.projects-bottom__next',
      prevEl: '.projects-bottom__prev',
  },
  slidesPerView: 1,
  watchOverflow: true,
  slidesPerGroup: 1,
  centeredSlides: false,
  initialSlide: 1,

  breakpoints: {
          480: {
            slidesPerView: 2,
            slidesPerGroup: 2,
            spaceBetween: 14,
          },
          750: {
              slidesPerView: 2,
              slidesPerGroup: 2,
              spaceBetween: 34,
          },
          769: {
              slidesPerView: 3,
              slidesPerGroup: 3,
              spaceBetween: 34,
          },
          1014: {
              slidesPerView: 2,
              slidesPerGroup: 2,
              spaceBetween: 44,
          },
          1480: {
              slidesPerView: 3,
              slidesPerGroup: 1,
              spaceBetween: 50,
          }
  },
});

// justValidate

var selector = document.querySelector("input[type='tel']");
    var im = new Inputmask("+7(999)999-99-99");
    im.mask(selector);

new JustValidate('.contacts-form', {
    rules: {
      name: {
        required: true,
        minLength: 2,
        maxLength: 15
      },
      tel: {
        required: true,
        function:(name, value) => {
          const phone = selector.inputmask.unmaskedvalue()
          return Number(phone) && phone.length === 10
        }
      },
    },
    messages: {
      name: {
        required: "Ваше имя.",
        minLength: "Должно быть минимум 2 символа"
      },
      tel: {
        required: "Ваш телефон.",
        function: "Некорректный номер."
      },
    }
});



tippy('#tultip-1', {
  content: 'Пример современных тенденций - современная методология разработки',
  followCursor: true,
  theme: 'tultip',
});

tippy('#tultip-2', {
  content: 'Приятно, граждане, наблюдать, как сделанные на базе аналитики выводы вызывают у вас эмоции',
  followCursor: true,
  theme: 'tultip',
});

tippy('#tultip-3', {
  content: 'В стремлении повысить качество',
  followCursor: true,
  theme: 'tultip',
});

// tabs-catalog

document.querySelectorAll('.accordion-selector__btn').forEach(function(tabsBtn) {
  tabsBtn.addEventListener('click', function(event) {
   const path = event.currentTarget.dataset.path_catalog

    document.querySelectorAll('.tabs-content').forEach(function(tabsItem) {
      tabsItem.classList.remove('tabs-active')
    })
    document.querySelector(`[data-target="${path}"]`).classList.add('tabs-active')
  })
})

document.querySelectorAll('.accordion-selector__btn').forEach(function(tabsBtn) {
  tabsBtn.addEventListener('click', function(event) {
   const path = event.currentTarget.dataset.path_catalog

    document.querySelectorAll('.accordion-selector__btn').forEach(function(tabsList) {
      tabsList.classList.remove('tabs-active')
    })
    document.querySelector(`[data-path_catalog="${path}"]`).classList.add('tabs-active')
  })
})
