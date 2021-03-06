<?php Starkers_Utilities::get_template_parts( array( 'parts/doctype', 'parts/header', 'parts/nav' ) ); ?>
<?php if ( have_posts() ): ?>

<?php while ( have_posts() ) : the_post(); ?>

		<article>
			<h2><a href="<?php esc_url( the_permalink() ); ?>" title="Permalink to <?php the_title(); ?>" rel="bookmark"><?php the_title(); ?></h2>
			<time class="gold" datetime="<?php the_time( 'Y-m-d' ); ?>" pubdate><?php the_date(); ?> </time> 
			
			<?php the_excerpt(); ?>
			</a>
		</article>
		
<?php endwhile; ?>

<?php else: ?>

	<h2>No posts to display</h2>

<?php endif; ?>

<?php include("parts/footer.php"); ?>