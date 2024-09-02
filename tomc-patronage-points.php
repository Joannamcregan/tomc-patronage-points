<?php
/* 
    Plugin Name: TOMC Patronage Points
    Version: 1.0
    Author: Joanna and Tom
    Description: Display patronage points
*/

if( ! defined('ABSPATH') ) exit;
require_once plugin_dir_path(__FILE__) . 'inc/tomc-points-route.php';

class TOMCPointsPlugin {
    function __construct() {
        add_action('activate_tomc-patronage-points/tomc-patronage-points.php', array($this, 'onActivate'));
        // add_action('init', array($this, 'onActivate'));
        add_action('wp_enqueue_scripts', array($this, 'pluginFiles'));
        add_filter('template_include', array($this, 'loadTemplate'), 99);
    }

    function pluginFiles(){
        wp_enqueue_script('tomc-points-js', plugin_dir_url(__FILE__) . '/build/index.js', array('jquery'), '1.0', true);
        wp_localize_script('tomc-points-js', 'tomcBookorgData', array(
            'root_url' => get_site_url()
        ));
    }

    function addPointsPage() {
        $points_page = array(
            'post_title' => 'Points',
            'post_content' => '',
            'post_status' => 'publish',
            'post_author' => 0,
            'post_type' => 'page'
        );
        wp_insert_post($points_page);
    }

    function onActivate() {
        require_once(ABSPATH . 'wp-admin/includes/upgrade.php');

        if (post_exists('Points', '', '', 'page', 'publish') == 0){
            $this->addPointsPage();
        }
    }

    function loadTemplate($template){
        if (is_page('points')){
            return plugin_dir_path(__FILE__) . 'inc/template-points.php';
        } else
        return $template;
    }
}

$tomcBookOrganization = new TOMCPointsPlugin();