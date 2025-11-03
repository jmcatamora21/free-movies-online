$(document).ready(function(){
    var baseUrl = window.location.origin;
    $(".logo-container").click(function(event){
        event.stopImmediatePropagation();
        window.open(baseUrl, "_self");
    })

    setTimeout(() => {
        $(".preload-logo").animate({
            "opacity" : "0"
        }, "fast")
        $(".preload").addClass("preload2");
    }, 1000)
    
    setTimeout(function () {
        $(".preload-logo").remove();
        $(".preload").remove();
    }, 2000);

    $(".side-bar ul li, header ul li").click(function(event){
        event.stopImmediatePropagation();
        let t =$(this).data('type');
        
        if (t == 'movies') {
            window.open(baseUrl + "free-movies-online/movies/", "_self");
        } else if (t == "series"){
            window.open(baseUrl + "free-movies-online/series/", "_self");
        } else if (t == "home"){
            window.open(baseUrl + "free-movies-online/", "_self");
        } else if (t == "privacy"){
            window.open(baseUrl + "free-movies-online/privacy-policy/", "_self");
        }
    })

    function swapElements(el1, el2) {
        // Get the parent node of the elements
        const parent1 = el1.parentNode;
        const parent2 = el2.parentNode;
    
        // Get the next sibling of the elements
        const sibling1 = el1.nextSibling === el2 ? el1 : el1.nextSibling;
        const sibling2 = el2.nextSibling === el1 ? el2 : el2.nextSibling;
    
        // Move el1 to the position of el2
        parent2.insertBefore(el1, sibling2);
    
        // Move el2 to the position of el1
        parent1.insertBefore(el2, sibling1);
    }
    
    // Usage
    const element1 = document.getElementById('copyright');
    const element2 = document.getElementById('tmdb');
    swapElements(element1, element2);

    let hidden = true;
    $(".bars").click(function(event){
        event.stopImmediatePropagation();
        if (hidden) {
            $(".side-bar").animate({
                "left" : "0",
            }, 500);
            
            $(".bars div:nth-child(2)").hide();
            $(".bars div:nth-child(1)").addClass("r1");
            $(".bars div:nth-child(3)").addClass("r2");
            $(".bars div:nth-child(1)").removeClass("rb1");
            $(".bars div:nth-child(3)").removeClass("rb2");
            hidden = false;
            
        } else {
                $(".side-bar").animate({
                "left" : "-81vw",
            }, 500);
            $(".bars div:nth-child(2)").show("1000");
            $(".bars div:nth-child(1)").addClass("rb1");
            $(".bars div:nth-child(3)").addClass("rb2");
            $(".bars div:nth-child(1)").removeClass("r1");
            $(".bars div:nth-child(3)").removeClass("r2");

            hidden = true;

        }
    })
})