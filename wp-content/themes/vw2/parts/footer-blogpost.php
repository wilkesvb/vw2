    </div> <?php // end page-wrap ?>

<footer>

    <div class="social-media">
      <a class="icon-facebook" href="http://www.facebook.com/vincent.wilkes.52"><span class="screen-reader-text">Facebook</span></a>
      <a class="icon-twitter-bird-1" href="https://twitter.com/wilkesvb"><span class="screen-reader-text">Twitter</span></a>
      <a class="icon-linkedin-1" href="http://www.linkedin.com/pub/vincent-wilkes/2a/312/299/"><span class="screen-reader-text">Linked In</span></a>
    </div>

    <a href="" class="copyright half-opacity">© 2013 Vincent Wilkes</a> 
    
  </footer>

  <?php wp_enqueue_script('jquery'); ?>
  
  <script type="text/javascript" src="<?php bloginfo('template_url'); ?>/js/bits-ck.js"></script>
  <script>
    jQuery(document).ready(function($){
      $("#fit").fitVids();
    });
  </script>

</body>

</html>
