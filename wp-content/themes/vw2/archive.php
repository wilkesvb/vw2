<?php 
/* 
Template Name: Archive
*/
?>

<?php Starkers_Utilities::get_template_parts( array( 'parts/doctype', 'parts/header', 'parts/nav' ) ); ?>


<?php if ( have_posts() ): ?>

<?php wp_get_archives('type=monthly'); ?>

<ol>
<?php while ( have_posts() ) : the_post(); ?>
	<li>
		<article>
			<h2><a href="<?php esc_url( the_permalink() ); ?>" title="Permalink to <?php the_title(); ?>" rel="bookmark"><?php the_title(); ?></a></h2>
			<time class="gold" datetime="<?php the_time( 'Y-m-d' ); ?>" pubdate><?php the_date(); ?> <?php the_time(); ?></time> <!-- ?php comments_popup_link('Leave a Comment', '1 Comment', '% Comments'); ? -->
			<?php the_content(); ?>
		</article>
	</li>
<?php endwhile; ?>
</ol>
<?php else: ?>
<h2>No posts to display</h2>	
<?php endif; ?>

<?php include("parts/footer.php"); ?>
