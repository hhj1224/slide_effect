$(document).ready(function(){
    var swiper = new Swiper('.card_slide', {
        autoplay: {
            delay: 5000,
            disableOnInteraction: false
        },
        speed: 1000,
        loop: true,
        slidesPerView: 3.5,
        spaceBetween: 30,
        navigation: {
            nextEl: '.slide_next',
            prevEl: '.slide_prev',
        },
        pagination: {
            el: '.swiper-pagination',
            type: 'fraction',
        },
        //slideToClickedSlide: true
    });

    //변수정리
    var $square = $('.square');//네모
    var $wrap = $('.slide_effect05');//전체영역
    var $track_wrap = $('.card_slide .swiper-wrapper');//슬라이드 감싸는 영역
    var $slide = $('.swiper-slide');//슬라이드 아이템
    var $p = $('.text_area p')//텍스트 받아올 영역
    var $bar = $('.nav_bar');//슬라이드 네비바
    

    //슬라이드 변환 전
    swiper.on('slideChangeTransitionStart', function(){
        /*초기화*/
        $wrap.removeClass('show');
        $slide.removeClass('delay d0 d1 d2 d3');

        var p = $('.swiper-slide-active').prev().children('p').text();

        $slide.addClass('delay');
        $('.swiper-slide-active').addClass('d0');
        $square.addClass('on');
        $p.text(p);
        $bar.removeClass('go');

        paging();

        //안보여야 하는 요소들
        $('.swiper-slide-prev').prev().children('img').css('opacity','0');
        $('.swiper-slide-prev').children('img').css('opacity','0');
	});

    //슬라이드 변환 후
    swiper.on('slideChangeTransitionEnd', function(){
        $slide.removeClass('delay');
        $square.removeClass('on');
        $wrap.addClass('show');
        $bar.addClass('go');

        var n0 = $('.swiper-slide-active');
        var n1 = n0.next();
        var n2 = n1.next();
        var n3 = n2.next();
        n0.addClass('d0');
        n1.addClass('d1');
        n2.addClass('d2');
        n3.addClass('d3');

        $('.swiper-slide-prev').children('img').css('opacity','1');
        $('.swiper-slide-prev').prev().children('img').css('opacity','1');
	});

    //슬라이드 next 변환전
    swiper.on('slideNextTransitionStart', function(){
        var c = $('.swiper-slide-active').attr('data-swiper-slide-index');
        $wrap.removeClass('prev');
        $wrap.addClass('next');
        $track_wrap.css('transition-timing-function', 'cubic-bezier(.98,.1,.62,.1)');
        $square.css('z-index','11');
        setTimeout(function(){
            $square.css('z-index','10');
        },110)
        
        img_trans();
	});

    //슬라이드 prev 변환전
    swiper.on('slidePrevTransitionStart', function(){
        var c = $('.swiper-slide-active').attr('data-swiper-slide-index');
        $wrap.removeClass('next');
        $wrap.addClass('prev');
        $square.removeClass('on');
        $square.addClass('back');
        $track_wrap.css('transition-timing-function', 'cubic-bezier(.8,.29,.72,.93)');
        //딜레이
        setTimeout(function(){
            $wrap.attr('data-num', c);
        },0)
        $square.css('z-index','11');

        img_trans();
	});

    //슬라이드 prev 변환후
    swiper.on('slidePrevTransitionEnd', function(){
        $square.removeClass('back');
	});

    //페이징 체크
    function paging(){
        var num = $('.swiper-pagination-current').text();
        if(num == 2){
            swiper.attachEvents()
        }
    }
    img_trans();
    
    //이미지 체크
    function img_trans(){
        //배경이미지 자동 변경
        var $slide_img = $('.swiper-slide-prev').children('img').attr('src');
        var $active_img = $('.swiper-slide-active').children('img').attr('src');
        var next = $wrap.hasClass('next');
        var prev = $wrap.hasClass('prev');

        console.log($active_img);
        //next일때는 배경 이미지 딜레이 필요
        if(next == true){
            setTimeout(function(){
                $wrap.css({
                    "background-image":"url("+ $slide_img+ ")",
                    "background-size":"cover"
                });
            },600)

            $square.css({
                "background-image":"url("+ $slide_img+ ")",
                "background-size":"cover"
            });
        //prev일때는 네모이미지 변경 필요
        }else if(prev == true){
            $wrap.css({
                "background-image":"url("+ $slide_img+ ")",
                "background-size":"cover"
            });

            $square.css({
                "background-image":"url("+ $active_img+ ")",
                "background-size":"cover"
            });
        }else{
            $wrap.css({
                "background-image":"url("+ $slide_img+ ")",
                "background-size":"cover"
            });
        }        
    }


});

