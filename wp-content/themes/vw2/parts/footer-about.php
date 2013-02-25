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
  
  <script type="text/javascript">
    jQuery(document).ready(function($){
      $(window).scroll(function(){         
        $('.container p').each(function(){
          var scrollTop     = $(window).scrollTop(),
              elementOffset = $(this).offset().top,
              distance      = (elementOffset - scrollTop),
              windowHeight  = $(window).height(),
              breakPoint    = windowHeight*0.9;
          if(distance > breakPoint) {
            $(this).addClass("more-padding"); 
          }  if(distance < breakPoint) {
            $(this).removeClass("more-padding");  
          }
        });
      });
    });
  </script>
  
</body>

</html>
