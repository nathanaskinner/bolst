var header = document.getElementById('header');
var hidden = false;
var static = true;


    var scroll = new LocomotiveScroll({
        el: document.querySelector('#jsScroll'),
        smooth: true,
        offset: [0, 120],
        getSpeed: true,
        getDirection: true,
        reloadOnContextChange:true,
        multiplier: 1.0,
        class: 'in-view',
        smartphone: {
            smooth: false
        },
        tablet: {
            smooth: false
        },
        smoothMobile: 0,
    });

    scroll.on('scroll', function(instance){
        var headerHeight = header.getBoundingClientRect().height;
        if(instance.direction === 'down' && static){
            if(instance.scroll.y > headerHeight){
                header.classList.add('pinned');
                if(header.classList.contains('home')){
                    header.classList.remove('navbar-light','bg-light');
                    header.classList.add('navbar-dark','bg-dark');
                }
                static = false;
            }
        }
        if(instance.direction === 'up' && !static){
            if(instance.scroll.y <= headerHeight){
                header.classList.remove('pinned');
                if(header.classList.contains('home')){
                    header.classList.remove('navbar-dark','bg-dark');
                    header.classList.add('navbar-light','bg-light');
                }
                static = true;
            }
        }
        if(instance.direction === 'down' && !hidden){
            if(instance.scroll.y>(headerHeight+200)){
                header.classList.remove('pinned');
                header.classList.add('unpinned');
                hidden = true;
            }
        }
        if(instance.direction === 'up' && hidden){
            //console.log('show');
            header.classList.remove('unpinned');
            header.classList.add('pinned');
            hidden = false;
        }
    });

    $(window).on("load", function() {
        scroll.update();
     });

     $('.button--video').modaal({
        type: 'video'
     });

 function openMobileDrawer() {
    var drawer = document.getElementById('mobileDrawer');
    drawer.classList.remove('is-closed');
 }

 function closeMobileDrawer() {
    var drawer = document.getElementById('mobileDrawer');
    drawer.classList.add('is-closed');
 }
    
 $( document ).ready(function() {
    $('#modalLink').modaal({
        custom_class: 'newsletter'
    });
    if(!Cookies.get('formSignedUp') || !Cookies.get('formNoThanks')){
        setTimeout(function() { 
            $('#modalLink').modaal('open');
        }, 6000);
    }
    $('#noThanks').click(function(e){
        e.preventDefault();
        $('#modalLink').modaal('close');
        Cookies.set('formNoThanks', true);
    });
});

$( document ).ready(function() {
    $("#newsletterForm").submit(function(e) {
        e.preventDefault(); // avoid to execute the actual submit of the form.
        var form = $(this);
        var url = form.attr('action');
        var name = $('#newsletterName').val();
        var email = $('#newsletterEmail').val();
        var gotcha = $('#newsletterGotcha').val();
        var submit = $('#newsletterSubmit');
        var message = $('#newsletterMessage');
        $.ajax({
            url: url,
            method: "POST",
            dataType: "json",
            data: {
                name: name,
                email: email,
                _gotcha: gotcha
            },
            beforeSend: function() {
                submit.text('Signing you up...');
            },
            success: function(data) {
                setTimeout(function() { 
                    form.addClass('is-hidden');
                    message.removeClass('is-hidden');
                    message.append('<div class="text-center text-large">Thank you for signing up!</div>');
                }, 3000);
                setTimeout(function() {
                    $('#modalLink').modaal('close');
                }, 6000);
                Cookies.set('formSignedUp', true);
            },
            error: function(err) {
                message.removeClass('is-hidden');
                $contactForm.append('<div class="text-center text-large">Oops, there was an error.</div>');
                submit.text('Sign up to download now');
            }
        });
    });

});
    
