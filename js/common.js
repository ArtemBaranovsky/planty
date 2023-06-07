$(document).ready(function() {
    const swiper = new Swiper('.swiper', {
        spaceBetween: 30,
        speed: 400,
        loop: true,
        parallax:true,
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        pagination: {
            el: '.swiper-pagination',
            type: 'bullets',
            clickable: true,
        },
        breakpoints: {
            576: {
                slidesPerView: 2,
            },
            992: {
                slidesPerView: 4,
            },
        },
    });

    $("#top_menu").mouseleave(function() {
        if ($(window).width() <= 992) {
            $("#top_menu").toggleClass("show");
        }
    });

    $(window).resize(function() {
        if ($(window).width() > 992) {
            $('#top_menu').removeClass('show');
        }
    });

    // Star animation
    var spriteData = {
        phase1: 'img/stars/star-1.svg',
        phase2: 'img/stars/star-2.svg',
        phase3: 'img/stars/star-3.svg',
        phase4: 'img/stars/star-4.svg'
    };

    function getRandomPhase() {
        const phases = Object.keys(spriteData);
        const randomIndex = Math.floor(Math.random() * phases.length);
        return phases[randomIndex];
    }

    function updateSpritePhase(element) {
        const currentPhase = element.data('currentPhase');
        const phases = Object.keys(spriteData);
        const currentPhaseIndex = phases.indexOf(currentPhase);
        const nextPhaseIndex = (currentPhaseIndex + 1) % phases.length;
        const nextPhase = phases[nextPhaseIndex];

        element.data('currentPhase', nextPhase);
        element.find('img').attr('src', spriteData[nextPhase]);

        // Обновление координат
        var xPos = Math.random() * ($(window).width() - 100);
        var yPos = Math.random() * ($(window).height() - 100);
        element.find('img').css({
            left: xPos + 'px',
            top: yPos + 'px'
        });
    }

    $('.star-sprite').each(function(index, element) {
        var phase = getRandomPhase();

        $(element).data('currentPhase', phase);
        addSprite($(element));

        setInterval(function() {
            updateSpritePhase($(element));
        }, 5000);
    });

    function addSprite(element) {
        const phase = element.data('currentPhase');
        const spriteUrl = spriteData[phase];
        const xPos = Math.random() * ($(window).width() - 100);
        const yPos = Math.random() * ($(window).height() - 100);
        const img = $('<img>').attr('src', spriteUrl).addClass('sprite');
        img.css({
            position: 'absolute',
            left: xPos + 'px',
            top: yPos + 'px'
        });

        element.html(img);

        setTimeout(function() {
            img.fadeOut(500, function() {
                img.remove();
                addSprite(element);
            });
        }, 3000);
    }

});