function getSplash()
{
    $(".screen").hide();
    //showing splash screen
    $("#splashScreen").show();

    //ajax request to get random movie details
    var getSplash = $.ajax({
        url: "services/splash.php",
        type: "POST",
        dataType: "json"
    });
    //if ajax request Success
    getSplash.done(function (data) {
        //setting content for HTML template to null
        var content = "";
        $.each(data, function (i, item) {
            var movie_id = item.movie_id;
            var movie_name = item.movie_name;
            var image_id = item.cover_id;
            var image_name = item.cover_name;
            //path to movie image
            var movie_image = "./uploads/" + image_id +
                "/" + image_name;
                // content for HTML template for each movie details
                content+=
                `<div class="movie" data-id="` + movie_id + `">
                    <div class="movieImg" style="background-image: url(`+movie_image+`)"></div>
                    <div class="movieLabel"><h4>` + movie_name + `</h4></div>
                </div>`;

        });
        $("#moviesList").html(content);

        //window.scrollTo(0, 0);
        $(window).scrollTop(0);
    });
    //if ajax request Success
    getSplash.fail(function (jqXHR, textStatus) {
        alert("Something went Wrong! (getSplash)" +
            textStatus);
    });
}
function getPeople(people_id)
{

    $(".screen").hide();
    $("#peopleScreen").show()
    var getPeople = $.ajax({
        url: "services/people.php",
        type: "POST",
        data: {
            people_id: people_id
        },
        dataType: "json"
    });
    //if ajax request Success
    getPeople.done(function (data) {
        //setting content for HTML template to null
        var content = "";
        var people_name = data.people_name;
        var people_biography = data.people_biography;
        var born = data.born;
        var died = data.died;

        var cover_image_id = data.cover_image_id;
        var cover_image_name = data.cover_image_name;

        //path to movie image
        var people_image = "./uploads/" + cover_image_id +
                "/" + cover_image_name;

        $("#peopleName_head").html(people_name);
        $("#peopleImg").css("background-image",`url(`+people_image+`)`);
        $("#peopleBio span").html(people_biography);
        $("#peopleBorn span").html(born);
        $("#peopleDied span").html(died);

        content = "";
        //related movies
        $.each(data.movies, function (i, item) {

        
            var movie_id = item.movie_id;
            var movie_name = item.movie_name;
            var id = item.image_id;
            var name = item.image_name;

            var movie_image = "./uploads/" + id +
                "/" + name;
            if(i<4)
            {
                content += 
                `<div class="relatedMovie pointer" data-id="`+movie_id+`">
                    <div class="relatedMovieImg" style="background-image:url(`+movie_image+`)"></div>
                    <div class="name movieName boxLabel">`+movie_name+`</div>
                </div>`;
            }
        });
        $("#actorMovies").html(content);

        var content = "";
        //screensho
        $.each(data.people_images, function (i, item) {
            var id = item.id;
            var name = item.name;

            var movie_image = "./uploads/" + id +
                "/" + name;
            if(i<4)
            {
                content += 
                `<div class="screenshot">
                    <div class="screenshotImg" style="background-image:url(`+movie_image+`)"></div>
                    <div class="boxLabel"></div>
                </div>`;
            }
        });
        $("#personScreenshot").html(content);

        //window.scrollTo(0, 0);
        $(window).scrollTop(0);
    });
    //if ajax request Success
    getPeople.fail(function (jqXHR, textStatus) {
        alert("Something went Wrong! (getSplash)" +
            textStatus);
    });

    


    $("#peopleScreen").show();
    $(window).scrollTop(0);
}
function getMovie(movie_id)
{

    $(".screen").hide();
    $("#movieScreen").show()
    //ajax request to get specific movie details with movie id {movie_id}
    var getMovie = $.ajax({
        url: "services/movie.php",
        type: "POST",
        data: {
            movie_id: movie_id
        },
        dataType: "json"
    });
    //ajax request success
    getMovie.done(function (data) {
        $(".movieName").html(data.movie_name);

        $("#ratingCircle").html(data.movie_rating);
        $("#movieIMDB span").html(data.movie_rating);
        $("#movieRelease span").html(data.movie_date_me);
        $("#movierating span").html(data.category);
        $("#movieDur span").html(data.hours+"Hr "+data.minutes+"Mints");
        $("#movieGenre span").html(data.genre+" ");
        $("#movieLan span").html(data.language);
        $("#movieColour span").html(data.colour);
        $("#movieWriter span").html(data.writers);
        $("#movieBio p").html(data.description);

        var main_movie_image = "./uploads/" + data.cover_image_id +
            "/" + data.cover_image_name;

        //$(".main_movie_image").attr("src", main_movie_image).attr("alt", data.movie_name);
        $("#movieMainImg").css("background-image",`url(`+main_movie_image+`)`);

        var content = "";
        //cast

        
        $.each(data.cast, function (i, item) {
            var people_id = item.people_id;
            var name = item.name;
            var image_id = item.image_id;
            var image_name = item.image_name;
            var character_name = item.character_name;

            var people_image = "./uploads/" + image_id +
                "/" + image_name;
            if(i<4)
            {
                content += 
                `<div class="stars pointer" data-id="` + people_id + `">
                    <div class="starsImg" style="background-image:url(`+people_image+`)"></div>
                    <div class="starsName boxLabel">`+name+`</div>
                </div>`;

            }

        });
        $("#stars").html(content);

        var content = "";
        //screenshot
        $.each(data.movie_images, function (i, item) {
            var id = item.id;
            var name = item.name;

            var movie_image = "./uploads/" + id +
                "/" + name;
            if(i<4)
            {
                content += 
                `<div class="screenshot">
                    <div class="screenshotImg" style="background-image:url(`+movie_image+`)"></div>
                    <div class="boxLabel">Scene 1</div>
                </div>`;
            }
        });

        $("#screenshots").html(content);


        content = "";
        //related movies
        $.each(data.related_movies, function (i, item) {
            var movie_id = item.movie_id;
            var movie_name = item.movie_name;
            var id = item.id;
            var name = item.name;

            var movie_image = "./uploads/" + id +
                "/" + name;
            if(i<4)
            {
                content += 
                `<div class="relatedMovie pointer" data-id="`+movie_id+`">
                    <div class="movieImg" style="background-image:url(`+movie_image+`)"></div>
                    <div class="movieName boxLabel">`+movie_name+`</div>
                </div>`;
            }
        });
        $("#relatedMovies").html(content);
    
        $(window).scrollTop(0);

    });

    
}
function getSearch(search_text)
{

    $("#searchList").show();

    if(search_text==="")
    {

    $("#searchList").hide();
    }
    var getMovie = $.ajax({
        url: "services/search.php",
        type: "POST",
        data: {
            search_text: search_text
        },
        dataType: "json"
    });
    //ajax request success
    getMovie.done(function (data) {
        var content = "";

        $.each(data, function (i, item) {
            var type = item.type;
            if (type == "1") {
                var id = item.movie_id;
                var name = item.movie_name;
                var image_id = item.cover_id;
                var image_name = item.cover_name;
                var className = "typeMovie";
            } else {
                var id = item.people_id;
                var name = item.name;
                var image_id = item.cover_id;
                var image_name = item.cover_name;
                var className = "typePeople";
            }

            var image = "./uploads/" + image_id +
                "/" + image_name;


            content += `<div data-id="` + id + `" data-type="` + className + `" class="search_container ` + className + ` clearFloat">
                            <div class="left">
                                <img src="` + image + `" alt="` + name + `">
                            </div>
                            <div class="right">` + name + `</div>
                        </div>`;

        });
        $("#searchList").html(content);
    });
}
$("#movieScreen").show();
//$("#peopleScreen").show();

$(document).ready(function () {

    getSplash();
    $(document).on("click", "body .movie", function () {
        var movie_id = $(this).attr("data-id");
        getMovie(movie_id);
    });
    $(document).on("click", "body .relatedMovie", function () {
        var movie_id = $(this).attr("data-id");
        getMovie(movie_id);
        $(".screen").hide();
        $("#movieScreen").show()
    });
    //staring onClick
    $(document).on("click", "body .stars", function () {
        var people_id = $(this).attr("data-id");
        getPeople(people_id);
        $(".screen").hide();
        $("#peopleScreen").show()
    });
    
    $("#searchList").hide();
    $(document).on("keyup", "#searchBar", function () {
        var search_text = $(this).val();

        getSearch(search_text);
    });
   /*  $(document).on("focusout", "#searchBar", function () {
        $("#searchList").hide();
    }); */

    $(document).on("click", ".search_container", function () {
        let id = $(this).data("id");
        let type = $(this).data("type");
        $("#searchList").hide();

        if(type == "typeMovie")
        {
            getMovie(id);
        }
        else if(type == "typePeople")
        {
            getPeople(id);
        }
    });$(document).on("click", "#logo, #logoImg", function () {
        getSplash();
    });
});

