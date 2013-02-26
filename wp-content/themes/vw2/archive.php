<?php 
/* 
Template Name: Archive
*/
?>

<?php Starkers_Utilities::get_template_parts( array( 'parts/doctype', 'parts/header-else', 'parts/nav' ) ); ?>


<?php if ( have_posts() ): ?>

	

<?php while ( have_posts() ) : the_post(); ?>
		
		<article class="archives">
			<h1><a href="<?php esc_url( the_permalink() ); ?>" title="Permalink to <?php the_title(); ?>" rel="bookmark"><?php the_title(); ?></h1>
			<time class="gold" datetime="<?php the_time( 'Y-m-d' ); ?>" pubdate><?php the_date(); ?> <?php the_time(); ?></time> <!-- ?php comments_popup_link('Leave a Comment', '1 Comment', '% Comments'); ? -->
			</a>
		</article>

<?php endwhile; ?>
<?php else: ?>
<h2>No posts to display</h2>	
<?php endif; ?>

		<article class="blog-post">

			<?php wp_get_archives('type=monthly'); ?>

		</article>

<?php include("parts/footer-blogpost.php"); ?>

