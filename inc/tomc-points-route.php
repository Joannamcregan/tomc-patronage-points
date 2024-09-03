<?php

add_action('rest_api_init', 'tomcPointsRegisterRoute');

function tomcPointsRegisterRoute() {
    //the first two arguments in the register_rest_route function have to match up with the url in the ajax request in the Patronage-Points.js file
    //the method in the array in the third argument has to match up with the type specified in the ajax request
    //the callback in the array has to match up with a function name in this file.
    register_rest_route('tomcPoints/v1', 'getPointsByDateRange', array(
        'methods' => 'GET',
        'callback' => 'getPointsByDateRange'
    ));
}

function getPointsByDateRange($data) {
    $startDate = sanitize_text_field($data['startDate']);
    $endDate = sanitize_text_field($data['endDate']);
    global $wpdb;
    $posts_table = $wpdb->prefix . "posts";
    $users_table = $wpdb->prefix . "users";
    $usermeta_table = $wpdb->prefix . "usermeta";
    $query = '
        select users.id, users.display_name, count(posts.id) as points
        from %i posts
        join %i users on posts.post_author = users.id
        and posts.post_type = "product"
        and posts.post_date >= %s
        and posts.post_date <= %s
        group by users.id;
    ';
    //the query assigns points to users for uploading a product within the given date range
    $results = $wpdb->get_results($wpdb->prepare($query, $posts_table, $users_table, $startDate, $endDate), ARRAY_A);
    return $results;
}