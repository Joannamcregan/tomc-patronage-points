<?php

add_action('rest_api_init', 'tomcPointsRegisterRoute');

function tomcPointsRegisterRoute() {
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
        select users.display_name, count(posts.id) as points
        from %i posts
        join %i users on posts.post_author = users.id
        and posts.post_type = "product"
        and posts.post_date >= %s
        and posts.post_date <= %s
        join %i usermeta on users.id = usermeta.user_id
        and usermeta.meta_key like %s
        and usermeta.meta_value like %s
        group by posts.id
        union
        select users.display_name, count(posts.id) as points
        from %i posts
        join %i users on posts.post_author = users.id
        and posts.post_type = "product"
        and posts.post_date >= %s
        and posts.post_date <= %s
        join %i usermeta on users.id = usermeta.user_id
        and usermeta.meta_key like %s
        and usermeta.meta_value like %s
        group by posts.id;
    ';
    //assign points to creator-members for uploading a product within the given date range
    //assign points to admin for uploading a product within the given date range
    $results = $wpdb->get_results($wpdb->prepare($query, $posts_table, $users_table, $startDate, $endDate, $usermeta_table, '%' . $wpdb->esc_like('_capabilities') . '%', '%' . $wpdb->esc_like('creator-member') . '%', $posts_table, $users_table, $startDate, $endDate, $usermeta_table, '%' . $wpdb->esc_like('_capabilities') . '%', '%' . $wpdb->esc_like('admin') . '%'), ARRAY_A);
    return $results;
    // return $wpdb->prepare($query, $posts_table, $users_table, $startDate, $endDate, $usermeta_table, '%' . $wpdb->esc_like('_capabilities') . '%', '%' . $wpdb->esc_like('creator-member') . '%');
}