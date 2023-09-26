import $ from 'jquery';

export default class SidebarJs {
    toggle() {
        // Toggle the side navigation
        $("#sidebarToggle, #sidebarToggleTop, .toggleRightBar").on('click', function(e) {
            e.preventDefault();
            $("body").toggleClass("sidebar-toggled");
            $(".sidebar").toggleClass("toggled");
            if ($(".sidebar").hasClass("toggled")) {
                $('.sidebar .collapse').collapse('hide');
                $(".aside-menu-right").show();
                $("#showRightBar").hide();
            }else{
                $(".aside-menu-right").hide();
                $("#showRightBar").show();
            }
        });

        // Toggle the side navigation
        $("#sidebarRightToggle").on('click', function(e) {
            e.preventDefault();
            $("body").toggleClass("aside-menu-lg-show");
            $(".aside-menu").toggleClass("toggled");
            if ($(".aside-menu").hasClass("toggled")) {
                $('.aside-menu .collapse').collapse('hide');
            };
        });

        $(".questionaireRightBar").on('click', function(e) {
            e.preventDefault();
            $(".aside-menu-right").toggleClass("collapsed");
            $(".arrowBtn").toggle();
        });

        // Close any open menu accordions when window is resized below 768px
        $(window).resize(function() {
            if ($(window).width() < 768) {
                $('.sidebar .collapse').collapse('hide');
            };
        });

        // Prevent the content wrapper from scrolling when the fixed side navigation hovered over
        $('body.fixed-nav .sidebar').on('mousewheel DOMMouseScroll wheel', function(e) {
            if ($(window).width() > 768) {
                var e0 = e.originalEvent,
                    delta = e0.wheelDelta || -e0.detail;
                this.scrollTop += (delta < 0 ? 1 : -1) * 30;
                e.preventDefault();
            }
        });
        $(".scoring-drop.btn-group .dropdown-menu").click(function (e) {
            e.stopPropagation();
          })

          
    //     $(".processes-tree-sec2-scrl-1").scroll(function(){
    //         $(".processes-tree-sec2-scrl-2")
    //             .scrollLeft($(".processes-tree-sec2-scrl-1").scrollLeft());
    //     });
    //     $(".processes-tree-sec2-scrl-2").scroll(function(){
    //         $(".processes-tree-sec2-scrl-1")
    //             .scrollLeft($(".processes-tree-sec2-scrl-2").scrollLeft());
    //     });
            
          
    }
}