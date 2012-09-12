var index = 0;
var images = [];
var n = 0;
function load_test_data(){
    var im = [];
    for(i = 0; i < 11; ++i){
        im[i] = {
                    'large': 'https://s3.amazonaws.com/mikes.dev.demos/photostream_resources/' + i + '_full.png',
                    'thumb': 'https://s3.amazonaws.com/mikes.dev.demos/photostream_resources/' + i + '_tn.png'
                };
    }
    return im;
}

$(function(){
    
    $("#full_view").hide();
    n = 3;

    images = load_test_data();
    img_elem = [];
    //assign image element srcs for the first n images
    for(i = 0; i < images.length; ++i){
        //Create the image elment arrayys
        img_elem[i] = $(document.createElement("img"))
            .attr({ src: images[i].thumb, title: i, id: 'timg' + i, alt: 'timg' + i})
            .addClass("small_img")
            .click(display_large);
        //add image element to the visible thumbnails
        if(i <= n){
            $(".thumbnails").append(img_elem[i]);
        }
    }

    $("#hide_full_link").click(hide_full_image);

    
    //create n of img elements

    update_range();
    

    $("#prev_pic").click(move_left);
    $("#next_pic").click(move_right);
});


function display_large(){
   
   var id = $(this).attr('title');
   console.log("thumbnail " + id + " clicked");

   if($(".full_image").attr('src') === images[id].large){
        $("#full_view").slideToggle();
        return;
   }
   if($("#full_view").is(":visible") === false){
        $("#full_view").slideToggle();
   }

   $(".full_image").attr({src: images[id].large});

}

function move_left(){
    if(index === 0){
            //alert("whoops you went to far");
            console.log("went to far:" + index);
            return;
        }
        $("#timg" + (index + n)).detach();
        $(".thumbnails").prepend(img_elem[--index]);
        update_range();

}
function move_right(){
    if(index + n  >= images.length - 1 ){
            //alert("whoops you went to far");
            console.log("went to far:" + index);
            return;
        }
        
        $("#timg" + index).detach();
        $(".thumbnails").append(img_elem[(++index) + n]);
        update_range();
}

function update_range(){
    $("#photo_range").text(index + "-" + (index + n) + "/" + images.length);
}

function hide_full_image(){
    $("#full_view").slideToggle();
}

​