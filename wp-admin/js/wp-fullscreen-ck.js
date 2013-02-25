/**
 * PubSub
 *
 * A lightweight publish/subscribe implementation.
 * Private use only!
 */var PubSub,fullscreen,wptitlehint;PubSub=function(){this.topics={}};PubSub.prototype.subscribe=function(e,t){this.topics[e]||(this.topics[e]=[]);this.topics[e].push(t);return t};PubSub.prototype.unsubscribe=function(e,t){var n,r,i=this.topics[e];if(!i)return t||[];if(t){for(n=0,r=i.length;n<r;n++)t==i[n]&&i.splice(n,1);return t}this.topics[e]=[];return i};PubSub.prototype.publish=function(e,t){var n,r,i,s=this.topics[e];if(!s)return;t=t||[];for(n=0,r=s.length;n<r;n++)i=s[n].apply(null,t)===!1||i;return!i};(function(e){var t,n,r,i;fullscreen=t={};n=t.pubsub=new PubSub;timer=0;block=!1;i=t.settings={visible:!1,mode:"tinymce",editor_id:"content",title_id:"",timer:0,toolbar_shown:!1};r=t.bounder=function(t,r,o,u){function l(){n.publish(r);i.timer=0}var a,f;o=o||1250;if(u){a=u.pageY||u.clientY||u.offsetY;f=e(document).scrollTop();u.isDefaultPrevented||(a=135+a);if(a-f>120)return}if(block)return;block=!0;setTimeout(function(){block=!1},400);i.timer?clearTimeout(i.timer):n.publish(t);i.timer=setTimeout(l,o)};t.on=function(){if(i.visible)return;typeof wp_fullscreen_settings=="object"&&e.extend(i,wp_fullscreen_settings);i.editor_id=wpActiveEditor||"content";e("input#title").length&&i.editor_id=="content"?i.title_id="title":e("input#"+i.editor_id+"-title").length?i.title_id=i.editor_id+"-title":e("#wp-fullscreen-title, #wp-fullscreen-title-prompt-text").hide();i.mode=e("#"+i.editor_id).is(":hidden")?"tinymce":"html";i.qt_canvas=e("#"+i.editor_id).get(0);i.element||t.ui.init();i.is_mce_on=i.has_tinymce&&typeof tinyMCE.get(i.editor_id)!="undefined";t.ui.fade("show","showing","shown")};t.off=function(){if(!i.visible)return;t.ui.fade("hide","hiding","hidden")};t.switchmode=function(e){var t=i.mode;if(!e||!i.visible||!i.has_tinymce)return t;if(t==e)return t;n.publish("switchMode",[t,e]);i.mode=e;n.publish("switchedMode",[t,e]);return e};t.save=function(){var n=e("#hiddenaction"),r=n.val(),i=e("#wp-fullscreen-save .spinner"),s=e("#wp-fullscreen-save span");i.show();t.savecontent();n.val("wp-fullscreen-save-post");e.post(ajaxurl,e("form#post").serialize(),function(t){i.hide();s.show();setTimeout(function(){s.fadeOut(1e3)},3e3);t.last_edited&&e("#wp-fullscreen-save input").attr("title",t.last_edited)},"json");n.val(r)};t.savecontent=function(){var t,n;i.title_id&&e("#"+i.title_id).val(e("#wp-fullscreen-title").val());i.mode==="tinymce"&&(t=tinyMCE.get("wp_mce_fullscreen"))?n=t.save():n=e("#wp_mce_fullscreen").val();e("#"+i.editor_id).val(n);e(document).triggerHandler("wpcountwords",[n])};set_title_hint=function(e){e.val().length?e.siblings("label").css("visibility","hidden"):e.siblings("label").css("visibility","")};t.dfw_width=function(t){var n=e("#wp-fullscreen-wrap"),r=n.width();if(!t){n.width(e("#wp-fullscreen-central-toolbar").width());deleteUserSetting("dfw_width");return}r=t+r;if(r<200||r>1200)return;n.width(r);setUserSetting("dfw_width",r)};n.subscribe("showToolbar",function(){i.toolbars.removeClass("fade-1000").addClass("fade-300");t.fade.In(i.toolbars,300,function(){n.publish("toolbarShown")},!0);e("#wp-fullscreen-body").addClass("wp-fullscreen-focus");i.toolbar_shown=!0});n.subscribe("hideToolbar",function(){i.toolbars.removeClass("fade-300").addClass("fade-1000");t.fade.Out(i.toolbars,1e3,function(){n.publish("toolbarHidden")},!0);e("#wp-fullscreen-body").removeClass("wp-fullscreen-focus")});n.subscribe("toolbarShown",function(){i.toolbars.removeClass("fade-300")});n.subscribe("toolbarHidden",function(){i.toolbars.removeClass("fade-1000");i.toolbar_shown=!1});n.subscribe("show",function(){var t;if(i.title_id){t=e("#wp-fullscreen-title").val(e("#"+i.title_id).val());set_title_hint(t)}e("#wp-fullscreen-save input").attr("title",e("#last-edit").text());i.textarea_obj.value=i.qt_canvas.value;i.has_tinymce&&i.mode==="tinymce"&&tinyMCE.execCommand("wpFullScreenInit");i.orig_y=e(window).scrollTop()});n.subscribe("showing",function(){e(document.body).addClass("fullscreen-active");t.refresh_buttons();e(document).bind("mousemove.fullscreen",function(e){r("showToolbar","hideToolbar",2e3,e)});r("showToolbar","hideToolbar",2e3);t.bind_resize();setTimeout(t.resize_textarea,200);scrollTo(0,0);e("#wpadminbar").hide()});n.subscribe("shown",function(){var e;i.visible=!0;if(i.has_tinymce&&!i.is_mce_on){e=function(t,n){var r=n.getElement(),o=r.value,u=tinyMCEPreInit.mceInit[i.editor_id];u&&u.wpautop&&typeof switchEditors!="undefined"&&(r.value=switchEditors.wpautop(r.value));n.onInit.add(function(t){t.hide();t.getElement().value=o;tinymce.onAddEditor.remove(e)})};tinymce.onAddEditor.add(e);tinyMCE.init(tinyMCEPreInit.mceInit[i.editor_id]);i.is_mce_on=!0}wpActiveEditor="wp_mce_fullscreen"});n.subscribe("hide",function(){var n=e("#"+i.editor_id).is(":hidden");i.has_tinymce&&i.mode==="tinymce"&&!n?switchEditors.go(i.editor_id,"tmce"):i.mode==="html"&&n&&switchEditors.go(i.editor_id,"html");t.savecontent();e(document).unbind(".fullscreen");e(i.textarea_obj).unbind(".grow");i.has_tinymce&&i.mode==="tinymce"&&tinyMCE.execCommand("wpFullScreenSave");i.title_id&&set_title_hint(e("#"+i.title_id));i.qt_canvas.value=i.textarea_obj.value});n.subscribe("hiding",function(){e(document.body).removeClass("fullscreen-active");scrollTo(0,i.orig_y);e("#wpadminbar").show()});n.subscribe("hidden",function(){i.visible=!1;e("#wp_mce_fullscreen, #wp-fullscreen-title").removeAttr("style");i.has_tinymce&&i.is_mce_on&&tinyMCE.execCommand("wpFullScreenClose");i.textarea_obj.value="";t.oldheight=0;wpActiveEditor=i.editor_id});n.subscribe("switchMode",function(e,t){var n;if(!i.has_tinymce||!i.is_mce_on)return;n=tinyMCE.get("wp_mce_fullscreen");if(e==="html"&&t==="tinymce"){tinyMCE.get(i.editor_id).getParam("wpautop")&&typeof switchEditors!="undefined"&&(i.textarea_obj.value=switchEditors.wpautop(i.textarea_obj.value));"undefined"==typeof n?tinyMCE.execCommand("wpFullScreenInit"):n.show()}else e==="tinymce"&&t==="html"&&n&&n.hide()});n.subscribe("switchedMode",function(e,n){t.refresh_buttons(!0);n==="html"&&setTimeout(t.resize_textarea,200)});t.b=function(){i.has_tinymce&&"tinymce"===i.mode&&tinyMCE.execCommand("Bold")};t.i=function(){i.has_tinymce&&"tinymce"===i.mode&&tinyMCE.execCommand("Italic")};t.ul=function(){i.has_tinymce&&"tinymce"===i.mode&&tinyMCE.execCommand("InsertUnorderedList")};t.ol=function(){i.has_tinymce&&"tinymce"===i.mode&&tinyMCE.execCommand("InsertOrderedList")};t.link=function(){i.has_tinymce&&"tinymce"===i.mode?tinyMCE.execCommand("WP_Link"):wpLink.open()};t.unlink=function(){i.has_tinymce&&"tinymce"===i.mode&&tinyMCE.execCommand("unlink")};t.atd=function(){i.has_tinymce&&"tinymce"===i.mode&&tinyMCE.execCommand("mceWritingImprovementTool")};t.help=function(){i.has_tinymce&&"tinymce"===i.mode&&tinyMCE.execCommand("WP_Help")};t.blockquote=function(){i.has_tinymce&&"tinymce"===i.mode&&tinyMCE.execCommand("mceBlockQuote")};t.medialib=function(){typeof wp!="undefined"&&wp.media&&wp.media.editor&&wp.media.editor.open(i.editor_id)};t.refresh_buttons=function(t){t=t||!1;if(i.mode==="html"){e("#wp-fullscreen-mode-bar").removeClass("wp-tmce-mode").addClass("wp-html-mode");t?e("#wp-fullscreen-button-bar").fadeOut(150,function(){e(this).addClass("wp-html-mode").fadeIn(150)}):e("#wp-fullscreen-button-bar").addClass("wp-html-mode")}else if(i.mode==="tinymce"){e("#wp-fullscreen-mode-bar").removeClass("wp-html-mode").addClass("wp-tmce-mode");t?e("#wp-fullscreen-button-bar").fadeOut(150,function(){e(this).removeClass("wp-html-mode").fadeIn(150)}):e("#wp-fullscreen-button-bar").removeClass("wp-html-mode")}};t.ui={init:function(){var n=e("#fullscreen-topbar"),o=e("#wp_mce_fullscreen"),u=0;i.toolbars=n.add(e("#wp-fullscreen-status"));i.element=e("#fullscreen-fader");i.textarea_obj=o[0];i.has_tinymce=typeof tinymce!="undefined";i.has_tinymce||e("#wp-fullscreen-mode-bar").hide();wptitlehint&&e("#wp-fullscreen-title").length&&wptitlehint("wp-fullscreen-title");e(document).keyup(function(n){var r=n.keyCode||n.charCode,i,s;if(!fullscreen.settings.visible)return!0;navigator.platform&&navigator.platform.indexOf("Mac")!=-1?i=n.ctrlKey:i=n.altKey;if(27==r){s={event:n,what:"dfw",cb:fullscreen.off,condition:function(){return e("#TB_window").is(":visible")||e(".wp-dialog").is(":visible")?!1:!0}};jQuery(document).triggerHandler("wp_CloseOnEscape",[s])||fullscreen.off()}i&&(61==r||107==r||187==r)&&t.dfw_width(25);i&&(45==r||109==r||189==r)&&t.dfw_width(-25);i&&48==r&&t.dfw_width(0);return!1});typeof wpWordCount!="undefined"&&o.keyup(function(t){var n=t.keyCode||t.charCode;if(n==u)return!0;(13==n||8==u||46==u)&&e(document).triggerHandler("wpcountwords",[o.val()]);u=n;return!0});n.mouseenter(function(t){i.toolbars.addClass("fullscreen-make-sticky");e(document).unbind(".fullscreen");clearTimeout(i.timer);i.timer=0}).mouseleave(function(t){i.toolbars.removeClass("fullscreen-make-sticky");i.visible&&e(document).bind("mousemove.fullscreen",function(e){r("showToolbar","hideToolbar",2e3,e)})})},fade:function(e,r,o){i.element||t.ui.init();if(e&&!n.publish(e))return;t.fade.In(i.element,600,function(){r&&n.publish(r);t.fade.Out(i.element,600,function(){o&&n.publish(o)})})}};t.fade={transitionend:"transitionend webkitTransitionEnd oTransitionEnd",sensitivity:100,In:function(n,r,i,s){i=i||e.noop;r=r||400;s=s||!1;if(t.fade.transitions){if(n.is(":visible")){n.addClass("fade-trigger");return n}n.show();n.first().one(this.transitionend,function(){i()});setTimeout(function(){n.addClass("fade-trigger")},this.sensitivity)}else{s&&n.stop();n.css("opacity",1);n.first().fadeIn(r,i);n.length>1&&n.not(":first").fadeIn(r)}return n},Out:function(n,r,i,s){i=i||e.noop;r=r||400;s=s||!1;if(!n.is(":visible"))return n;if(t.fade.transitions){n.first().one(t.fade.transitionend,function(){if(n.hasClass("fade-trigger"))return;n.hide();i()});setTimeout(function(){n.removeClass("fade-trigger")},this.sensitivity)}else{s&&n.stop();n.first().fadeOut(r,i);n.length>1&&n.not(":first").fadeOut(r)}return n},transitions:function(){var e=document.documentElement.style;return typeof e.WebkitTransition=="string"||typeof e.MozTransition=="string"||typeof e.OTransition=="string"||typeof e.transition=="string"}()};t.bind_resize=function(){e(i.textarea_obj).bind("keypress.grow click.grow paste.grow",function(){setTimeout(t.resize_textarea,200)})};t.oldheight=0;t.resize_textarea=function(){var e=i.textarea_obj,n;n=e.scrollHeight>300?e.scrollHeight:300;if(n!=t.oldheight){e.style.height=n+"px";t.oldheight=n}}})(jQuery);