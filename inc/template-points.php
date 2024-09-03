<?php global $wpdb;
$posts_table = $wpdb->prefix . "posts";
$users_table = $wpdb->prefix . "users";
$usermeta_table = $wpdb->prefix . "usermeta";
$query = '
    select users.display_name, count(posts.id) as points
    from %i posts
    join %i users on posts.post_author = users.id
    and posts.post_type = "product"
    order by count(posts.id) desc;
';
//assign points for uploading a product
$results = $wpdb->get_results($wpdb->prepare($query, $posts_table, $users_table), ARRAY_A);

get_header();

?><main>
    <div class="banner"><h1 class="centered-text">Patronage Points</h1></div>
    <br>
    <div class="hidden" id="tomc-points-dates-section">
        <p class="centered-text">Select a date range to see how many points members earned during a certain period of time.</p>
        <label for="tomc-points-start-date" class="centered-text block"><strong>start date:</strong></label>
        <input type="date" id="tomc-points-start-date" class="block rounded-centered-date-input"></input>
        <label for="tomc-points-end-date" class="centered-text block"><strong>end date:</strong></label>
        <input type="date" id="tomc-points-end-date" class="block rounded-centered-date-input"></input>
        <p class="centered-text hidden" id="tomc-points-no-start-date-error">Choose a start date.</p>
        <p class="centered-text hidden" id="tomc-points-no-end-date-error">Choose an end date.</p>
    </div>
    <button class="purple-button" id="tomc-points-set-dates-button">set date range</button>
    <div class="generic-content alt-accent-wrapper-1" id="tomc-points-display-section">
        <h2 class="centered-text">Total Points</h2>
        <?php if (count($results) > 0){
            for ($i = 0; $i < count($results); $i++){
                ?><p class="centered-text">
                    <strong>
                        <?php echo $results[$i]['display_name'];
                    ?></strong>
                    <?php echo ' has earned ' . $results[$i]['points'] . ' total points';
                ?></p>
            <?php }
        } else {
            ?><p class="centered-text">We don't have any data right now.</p>
        <?php }
    ?></div>
</main>

<?php get_footer(); ?>