var header = document.getElementById('header');
var hidden = false;
var static = true;


    var scroll = new LocomotiveScroll({
        el: document.querySelector('#jsScroll'),
        smooth: true,
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


    
