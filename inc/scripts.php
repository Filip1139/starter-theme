<?php 

function register_scripts(){
    wp_register_style( 'theme-styles', get_template_directory_uri() .'/dist/css/main.css');
    wp_register_style( 'swiper-css', get_template_directory_uri() . '/node_modules/swiper/css/swiper.min.css');



    wp_register_script( 'theme-scripts', get_template_directory_uri() . '/dist/js/all.js' , ['jquery', 'swiper-js'], microtime(), true );
    wp_register_script( 'swiper-js', get_template_directory_uri() . '/node_modules/swiper/js/swiper.min.js' , '','', true );
    

    
    wp_enqueue_style( 'theme-styles' );  

    wp_enqueue_script( 'theme-scripts' );
    wp_enqueue_script( 'swiper-js' );
}

add_action("wp_enqueue_scripts", "register_scripts");

?>