<?php
/*
Plugin Name: Simple posts list
Version:     0.3
Plugin URI:  http://bojandevic.com/
Description: Simply list all posts using shortcode. It's nice for creating a sitemap or archive list.
Author:      Bojan Devic
Author URI:  http://bojandevic.com/

 
 This program is free software; you can redistribute it and/or
modify it under the terms of the GNU General Public License
as published by the Free Software Foundation; either version 2
of the License, or (at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with WordPress; if not, write to the Free Software
Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA  02110-1301, USA.

*/

function posts_list () {
	$output='<ul>';
	$posts = get_posts('numberposts=-1');
	foreach($posts as $post){
		$permalink = get_permalink( $post->ID );
		$output.= '<li>' . '<a href="' . $permalink . '">' . $post->post_title . '</a></li>';
	}
	$output.='</ul>';
	return $output;
}

function pages_list () {
	$output='<ul>';
	$pages = get_pages();
	foreach($pages as $page){
		$permalink = get_permalink( $page->ID );
		$output.= '<li>' . '<a href="' . $permalink . '">' . $page->post_title . '</a></li>';
	}
	$output.='</ul>';
	return $output;
}

add_shortcode('posts','posts_list');
add_shortcode('pages','pages_list');

?>
