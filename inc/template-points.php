<?php 
//declaring the global wpdb variable so we can use it
global $wpdb;
//assigning the names of tables in our database to variables.
//for security, WordPress table names include a prefix which is stored in $wpdb
//in php the . is used to concatenate strings
$posts_table = $wpdb->prefix . "posts";
$users_table = $wpdb->prefix . "users";
$usermeta_table = $wpdb->prefix . "usermeta";
//we use a WordPress function get_results to pull data from the database
//we have to write the query as a string like this, only we have to use placeholders for table names, strings, and numbers
//%i is for a table name (after the %i I usually alias the table)
//%s is for a string (or a date string)
//%d is for a number
//we pass whatever table/string/number each placeholder stands for as arguments following the first argument (the first argument has to be the query string)
$query = '
    select users.id, users.display_name, count(posts.id) as points
    from %i posts
    join %i users on posts.post_author = users.id
    and posts.post_type = "product"
    group by users.id
    order by count(posts.id) desc;
';
//the query is going to change later in order to assign points for more activities, but for now I'm just assigning points for uploading a product
$results = $wpdb->get_results($wpdb->prepare($query, $posts_table, $users_table), ARRAY_A);

//outputs the header on the page
get_header();

//the question mark- closing elbow bracket combo allows us to switch out of php and start writing html
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
        <!-- the "opening elbow bracket- question mark- php" lets us go back to writing php-->
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

<!-- the below function outputs the footer onto the page -->
<?php get_footer(); ?>