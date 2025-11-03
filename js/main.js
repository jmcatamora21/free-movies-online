import mediaNotif from "../module.js";
var type = 'movies';
var baseUrl = window.location.origin;

var options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzNzM5NzQwMjk2YTdkNWU5YTRlYjhlZjU1ODZiMzJjMiIsIm5iZiI6MTcyMzA5NjQ1Ni4wMTE2MzksInN1YiI6IjY2YTcyZWU0YWNkYzZjZGFmYWIxOWRhNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.TDXBSYS4CWW-MH2DE14gYRHQ5mV_un9foW8rhfWAnf8'
    }
};

//window.open('../filipino-films/', '_self');

function search(s, type) {
    $(".show-options").hide();
    $(".pg").remove();
    if (type == 'movie') {
        fetch(`https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(s)}&include_adult=false`, options)
        .then(response => response.json())
        .then(response => {
            response = response.results;
    
            document.getElementById("con-title").innerHTML = "Result for: " + s;
            document.getElementById("main").innerHTML = "";
            $(".page-navigation").hide();
    
            let x = 0;
            for (let j = response.length - 1; j >= 0; j--) {
                if (response[j].release_date != '') {
                    let releaseDate = new Date(response[j].release_date);
                    let year = releaseDate.getFullYear();
                    year = year.toString();
                    
                    if (response[j].poster_path != null) {
                        let url = `https://image.tmdb.org/t/p/w400${response[j].poster_path}`;
                        let img = new Image();
                        img.src = url;
                        img.onload = function() {
                            document.getElementById("main").insertAdjacentHTML("afterbegin", `
                            <div>
                                <div class="movie" data-id='${response[j].id}' data-title="${response[j].title}">
                                    <img src="${url}" alt="${response[j].title}"/>
                                    <p class="text-center"><span>(${year})</span><br>${response[j].title} </p>
                                </div>
                            </div>`);
                            
    
                            $(".movie").on("click", function(event){
                                event.stopImmediatePropagation();
                                mediaNotif();
                                let data = $(this).data("id");
                    
                                $("html, body").css("overflow", "hidden");
                    
                                let str = "";
                                if ($(window).width() > 600) {
                                    str = `Download ${$(this).data("title")}`;
                                } else {
                                    str = `Download`;
                                }
                                
                                let videoUrl = `https://vidsrc.me/embed/movie?tmdb=${data}`; // Replace with your actual video URL
                                
                                document.body.insertAdjacentHTML("afterbegin", `
                                <div class="watch-window">
                                    <div>
                                        <div class="dl-button" onclick="window.open('https://mordoops.com/4/7777606', '_blank')">${str}</div>
                                        <div class="change-server-button">Change server</div>
                                        <div class="close-button">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="var(--orange)" class="bi bi-x-square-fill" viewBox="0 0 16 16">
                                            <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zm3.354 4.646L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 1 1 .708-.708"/>
                                            </svg>
                                        </div>
                                        <iframe src="${videoUrl}" onerror="handleError()" allowfullscreen></iframe>
                                    </div>
                                </div>`);
                                $(".dl-button, .change-server-button").css("bottom", "-35px");
                                
                                let serverChanged = false;
                                $(".change-server-button").click(function(){
                                    if (!serverChanged){
                                        
                                        serverChanged = true;
                                        $(".watch-window iframe").attr("src", `https://multiembed.mov/directstream.php?video_id=${data}&tmdb=1`)
                                    } else {
                                        serverChanged = false;
                                        $(".watch-window iframe").attr("src", `https://vidsrc.me/embed/movie?tmdb=${data}` )
                                    }
                                    
                                })
                    
                                $(".close-button").click(function(event){
                                    event.stopImmediatePropagation();
                                    $("html, body").css("overflow", "auto");
                                    $(".watch-window").remove();
                                })
                                
                                
                                
                            })
                        }
    
                        x += 1;
                    }
                }
            }
    
            if (x == 0) {
                document.getElementById("main").insertAdjacentHTML("afterbegin", `
                <div>Not found</div>`);
            }
    
            if ($(window).width() > 600) {
                $(".search-window").remove();
                $("html, body").css("overflow", "auto");
            }
        })
    } else {
        fetch(`https://api.themoviedb.org/3/search/tv?query=${encodeURIComponent(s)}&include_adult=false`, options)
        .then(response => response.json())
        .then(response => {
            response = response.results;
    
            document.getElementById("con-title").innerHTML = "Result for: " + s;
            document.getElementById("main").innerHTML = "";
            $(".page-navigation").hide();
    
            let x = 0;
            for (let j = response.length - 1; j >= 0; j--) {
                if (response[j].first_air_date != '') {
                    let releaseDate = new Date(response[j].first_air_date);
                    let year = releaseDate.getFullYear();
                    year = year.toString();
                    
                    if (response[j].poster_path != null) {
                        let url = `https://image.tmdb.org/t/p/w400${response[j].poster_path}`;
                        let img = new Image();
                        img.src = url;
                        img.onload = function() {
                            document.getElementById("main").insertAdjacentHTML("afterbegin", `
                            <div>
                                <div class="series" data-id='${response[j].id}' data-title="${response[j].name}">
                                    <img src="${url}" alt="${response[j].name}"/>
                                    <p class="text-center"><span>(${year})</span><br>${response[j].name} </p>
                                </div>
                            </div>`);
    
                            $(".series").on("click", function(event){
                                event.stopImmediatePropagation();
                                mediaNotif();
                                let data = $(this).data("id");
                                $("html, body").css("overflow", "hidden");
        
                                const options = {
                                    method: 'GET',
                                    headers: {
                                        accept: 'application/json',
                                        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzNzM5NzQwMjk2YTdkNWU5YTRlYjhlZjU1ODZiMzJjMiIsIm5iZiI6MTcyMzQzNzkxMC4zNDU1ODUsInN1YiI6IjY2YTcyZWU0YWNkYzZjZGFmYWIxOWRhNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.E55fxbj6KLmsakJ255HNXD4D2KjcCAmaYMdlt-AlirA'
                                    }
                                };
                                    
                                fetch(`https://api.themoviedb.org/3/tv/${data}?language=en-US`, options)
                                .then(response => response.json())
                                .then(response => {
                                    let seasons = response.seasons;
                                    
                                    let str = "";
                                    if ($(window).width() > 600) {
                                        str = `Download ${$(this).data("title")}`;
                                    } else {
                                        str = `Download`;
                                    }
                                    let s = "";
                                    for (let i = 0; i < seasons.length; i++) {
                                        s += `
                                        <div data-season-number="${seasons[i].season_number}" data-ep-count="${seasons[i].episode_count}">Season ${seasons[i].season_number}</div>`;
                                    }
                                    
                                    
                                    let videoUrl = `https://vidsrc.me/embed/tv?tmdb=${data}&season=1&episode=1`; // Replace with your actual video URL
                                    var server = 1;
                                    var season_num = 1;
                                    var ep_num = 1;
                                    document.body.insertAdjacentHTML("afterbegin", `
                                    <div class="watch-window">
                                        <div>
                                            <div class="dl-button" onclick="window.open('https://mordoops.com/4/7777606', '_blank');">${str}</div>
                                            <div class="change-server-button">Change server</div>
                                            <div class="seasons-container" id="seasons-container">${s}</div>
                                            <div class="close-button">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="var(--orange)" class="bi bi-x-square-fill" viewBox="0 0 16 16">
                                                <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zm3.354 4.646L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 1 1 .708-.708"/>
                                                </svg>
                                            </div>
                                            <iframe id="show" src="${videoUrl}" allowfullscreen></iframe>
                                        </div>
                                    </div>`);
                                    
                                    
                                    $(".dl-button, .change-server-button").css("bottom", "-90px");
                                    let serverChanged = false;
                                    $(".change-server-button").click(function(){
                                        if (!serverChanged) {
                                            $(".watch-window iframe").attr("src", `https://multiembed.mov/directstream.php?video_id=${data}&tmdb=1&s=${season_num}&e=${ep_num}`);
                                            serverChanged = true;
                                        } else {
                                            $(".watch-window iframe").attr("src", `https://vidsrc.me/embed/tv?tmdb=${data}&season=${season_num}&episode=${ep_num}`); 
                                            serverChanged = false;
                                        }
                                    
                                    })
                                        
                                    
                                    function attachSeasonClickEvents() {
                                        $(".seasons-container > div").click(function(event){
                                            event.stopImmediatePropagation();
                                            let epCount = parseInt($(this).data("ep-count"));
                                            let season = parseInt($(this).data("season-number"));
                                            let seasonsContainer = document.getElementById("seasons-container");
                                            seasonsContainer.innerHTML = "";
                                            for (let i = epCount; i >= 1; i--) {
                                                seasonsContainer.insertAdjacentHTML("afterbegin", `
                                                <div class="episode" data-ep="${i}">Episode ${i}</div>`);
                                            }
        
                                            seasonsContainer.insertAdjacentHTML("afterbegin", `
                                            <div class="back">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#fff" class="bi bi-chevron-double-left" viewBox="0 0 16 16">
                                                <path fill-rule="evenodd" d="M8.354 1.646a.5.5 0 0 1 0 .708L2.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0"/>
                                                <path fill-rule="evenodd" d="M12.354 1.646a.5.5 0 0 1 0 .708L6.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0"/>
                                                </svg>
                                            </div>`);
        
                                            $(".episode").click(function(event){
                                                event.stopImmediatePropagation();
                                                $(".episode").removeClass("active");
                                                $(this).addClass("active");
                                                let ep = $(this).data("ep");
                                                ep_num = parseInt(ep);
                                                season_num = season;
                                                if(serverChanged){
                                                 
                                                    $(".watch-window iframe").attr("src", `https://multiembed.mov/directstream.php?video_id=${data}&tmdb=1&s=${season_num}&e=${ep_num}`)
                                                } else {
                                                   
                                                    $(".watch-window iframe").attr("src", `https://vidsrc.me/embed/tv?tmdb=${data}&season=${season_num}&episode=${ep_num}`); 
                                                }
                                            
                                                
                                            })
        
                                            $(".back").click(function(event){
                                                event.stopImmediatePropagation();
                                                seasonsContainer.innerHTML = "";
                                                seasonsContainer.insertAdjacentHTML("afterbegin", `${s}`);
                                                attachSeasonClickEvents();
                                            })
                                        })
                                    }
        
                                    attachSeasonClickEvents();
        
                                    let slider = document.getElementById("seasons-container");
                                    let isDown = false;
                                    let startX;
                                    let scrollLeft;
        
                                    slider.addEventListener('mousedown', (e) => {
                                        isDown = true;
                                        slider.classList.add('active');
                                        startX = e.pageX - slider.offsetLeft;
                                        scrollLeft = slider.scrollLeft;
                                    });
        
                                    slider.addEventListener('mouseleave', () => {
                                        isDown = false;
                                        slider.classList.remove('active');
                                    });
        
                                    slider.addEventListener('mouseup', () => {
                                        isDown = false;
                                        slider.classList.remove('active');
                                    });
        
                                    slider.addEventListener('mousemove', (e) => {
                                        if (!isDown) return;
                                        e.preventDefault();
                                        const x = e.pageX - slider.offsetLeft;
                                        const walk = (x - startX) * 2; // scroll-fast
                                        slider.scrollLeft = scrollLeft - walk;
                                    });
        
                                    $(".close-button").click(function(event){
                                        event.stopImmediatePropagation();
                                        $("html, body").css("overflow", "auto");
                                        $(".watch-window").remove();
                                    })
                                    
                                    
        
                                    
                                })
                            })
                        }
    
                        x += 1;
                    }
                }
            }
    
            if (x == 0) {
                document.getElementById("main").insertAdjacentHTML("afterbegin", `
                <div>Not found :(</div><br><br>`);
            }
    
            if ($(window).width() > 600) {
                $(".search-window").remove();
                $("html, body").css("overflow", "auto");
            }
        })
    }
    
}

var GENRES = [{genre: 'Action', name: 'action'},{genre: 'Animated TV Shows',
name: 'animated-tv-shows'}, {genre:
'Anime', name : 'anime'}, {genre: 'Chinese',
name: 'chinese'}, {genre: 'Ghibli', name: 'studio-ghibli'}, {genre: 'Fantasy' , name: 'fantasy'}, {genre: 'Filipino', name: 'filipino-films'}, {genre: 'Horror',
name: 'horror'}, {genre: 'Korean', name: 'korean'}, {genre: 'Sci-Fi', name:
'sci-fi'}, {genre: 'Thriller', name: 'thriller'}, {genre: 'War', name: 'war'}];

  async function fetch_genres() {
      const requests = [
          fetch('https://api.themoviedb.org/3/search/movie?query=deadpool%20%26%20wolverine&include_adult=false&language=en-US&page=1', options),
          
          fetch('https://api.themoviedb.org/3/search/tv?query=family%20guy&include_adult=false&language=en-US&page=1', options),
          fetch('https://api.themoviedb.org/3/search/tv?query=jujutsu&include_adult=false&language=en-US&page=1', options),
          fetch('https://api.themoviedb.org/3/search/tv?query=a%20love%20so%20beautiful&first_air_date_year=2017&include_adult=false&language=en-US&page=1', options),
          fetch('https://api.themoviedb.org/3/search/movie?query=howl%27s%20moving%20castle&include_adult=false&language=en-US&page=1', options),
          fetch('https://api.themoviedb.org/3/search/movie?query=damsel&include_adult=false&language=en-US&page=1', options),
          fetch('https://api.themoviedb.org/3/search/movie?query=my%20zombabe&include_adult=false&language=en-US&page=1', options),
          fetch('https://api.themoviedb.org/3/search/movie?query=kuyang&include_adult=false&language=en-US&page=1', options),
          fetch('https://api.themoviedb.org/3/search/tv?query=alchemy%20of%20souls&include_adult=false&language=en-US&page=1', options),
          fetch('https://api.themoviedb.org/3/search/movie?query=65&include_adult=false&language=en-US&page=1', options),
          fetch('https://api.themoviedb.org/3/search/movie?query=trigger%20warning&include_adult=false&language=en-US&page=1', options),
          fetch('https://api.themoviedb.org/3/search/movie?query=the%20wall&include_adult=false&language=en-US&page=1', options)
      ];
  
      try {
          const responses = await Promise.all(requests);
          const jsonResponses = await Promise.all(responses.map(res => res.json()));
          
          // Extract the first image URL from each response
          const imageUrls = jsonResponses.map(response => {
              if (response.results && response.results.length > 0) {
                  return `https://image.tmdb.org/t/p/w500${response.results[0].poster_path}`;
              }
              return null;
          });
  
          // Filter out null values (in case no image was found)
          const validImageUrls = imageUrls.filter(url => url !== null);

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
          
            for (let i = 0; i < validImageUrls.length; i++) {
              document.getElementById("main").insertAdjacentHTML("beforeend", `
              <div data-genre="${GENRES[i].name}">
                  <div>
                      <img src="${validImageUrls[i]}" alt="${GENRES[i].genre}"/>
                      <p class="text-center"><span>${GENRES[i].genre}</span></p>
                  </div>
              </div>`);
            }
            document.getElementById("main").insertAdjacentHTML("beforeend", `
            <div data-genre="movies">
                <div>
                    <img src="https://placehold.jp/121211/0cad0c/200x350.png?text=MOVIES" alt="Movies"/>
                    <p class="text-center"><span></span></p>
                </div>
            </div>`);
            document.getElementById("main").insertAdjacentHTML("beforeend", `
            <div data-genre="series">
                <div>
                    <img src="https://placehold.jp/121211/0cad0c/200x350.png?text=SERIES" alt="Series"/>
                    <p class="text-center"><span></span></p>
                </div>
            </div>`);

          $(".main > div").click(function(event){
              event.stopImmediatePropagation();
              let genre = $(this).data("genre");
              window.open(window.location.pathname + `${genre}/`, "_self");
          })
  
      // Now you can do something with the image URLs, such as displaying them
      } catch (error) {
          console.error('Error fetching data:', error);
      }
  }
  fetch_genres();

        
$(document).ready(function() {
    let hidden = true;
    $(".side-bar ul li, header ul li").click(function(event){
        event.stopImmediatePropagation();
        let t =$(this).data('type');

        if (t == 'movies') {
            window.open(baseUrl + "/free-movies-online/movies/", "_self");
        } else if (t == "series"){
            window.open(baseUrl + "/free-movies-online/series/", "_self");
        } else if (t == "home"){
            window.open(baseUrl + "/free-movies-online/", "_self");
        } else if (t == "privacy"){
            window.open(baseUrl + "/free-movies-online/privacy-policy/", "_self");
        }
    })

    if ($(window).width() > 600) {
        $(".search").click(function(event){
            event.stopImmediatePropagation();
            let searchFor = 'movie';

            $("html, body").css("overflow", "hidden");
            document.body.insertAdjacentHTML("afterbegin", `
            <div class="search-window">
                <div>
                    <input type="text" autocomplete="off" id="search" placeholder="What to watch"/>
                        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="var(--orange)" class="bi bi-search" viewBox="0 0 16 16">
                    <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"/>
                    </svg>
                    <div class="type">
                        <div class="active" data-t="movie">Movie</div>
                        <div data-t="series">Series</div>
                    </div>
                </div>
            </div>`);

            document.getElementById('search').focus();

            $(".search-window").click(function(event){
                $("html, body").css("overflow", "auto");
                $(this).remove();
            })

            $(".type > div").click(function(event){
                event.stopImmediatePropagation();
                $(".type > div").removeClass("active");
                $(this).addClass("active");
                searchFor = $(this).data("t");
            })
    
            $(".search-window > div").click(function(event){
                event.stopImmediatePropagation();
            })

            let searchEl = document.getElementById("search");

            searchEl.addEventListener("keydown", function(event) {
                if (event.key === "Enter") {
                    search(this.value, searchFor);
                }
            });

            $(".search-window svg").click(function(event){
                event.stopImmediatePropagation();
                search(searchEl.value, searchFor);
            })
        })

    } else {
        let searchFor = 'movie';
        let searchEl = document.getElementById("s-search");

        searchEl.addEventListener("keydown", function(event) {
            if (event.key === "Enter") {
                search(this.value, searchFor);

                this.value = "";

                $(".side-bar").animate({
                    "left" : "-81vw",
                }, 500);
            }
        });

        $(".side-bar .type > div").click(function(event){
            event.stopImmediatePropagation();
            $(".type > div").removeClass("active");
            $(this).addClass("active");
            searchFor = $(this).data("t");
        })

        $(".side-bar .search a").click(function(event){
            event.stopImmediatePropagation();
            search(searchEl.value, searchFor);

            searchEl.value = "";

            $(".side-bar").animate({
                "left" : "-81vw",
            }, 500);
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
    }

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
