import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'nlg-scroll-parallax-js',
  templateUrl: './scroll-parallax-js.component.html',
  styleUrls: ['./scroll-parallax-js.component.scss']
})
export class ScrollParallaxJsComponent implements OnInit {


  // Variables of usefulness.
  winHeight = window.innerHeight;
  docHeight = document.body.clientHeight - this.winHeight;
  scrollers = [];
  init = this._init();

  constructor() { }

	/** Initiate the script.
	 * - Load all Scroller elements and cache the information ready for the window.scroll event
	 * - Load any images if required (in order to pull height info from it)
	 * - Add the window.scroll event
	 * @return null
	 */
  _init() {
    // this.updateSizes();
    // this.window.scroll( this.updateScroll );
    // this.window.resize( this.updateSizes );
  }

	/** Update cached object(s) for scrollers. Since the window has resized we
	 * need to work out all the differences again so we know how much we can
	 * move the background images.
	 */
  updateSizes(eles: HTMLDivElement[], me: HTMLDivElement) {

    this.winHeight = window.innerHeight;  
    this.docHeight = me.scrollHeight - this.winHeight;
    this.scrollers = eles;
    
    console.warn("scrollHeight: %o\n winHeight: %o\n docHeight: %o\n scrollers: %o",
                 me.scrollHeight, this.winHeight, this.docHeight, this.scrollers);

    eles.forEach((v, index) => {

      // Cache all scroller elements
      let scroller = v;
      let sInvert = scroller.dataset.invert == 'true' ? true : false;
      let oHeight = scroller.clientHeight;
      let oStart = scroller.offsetTop;
      let oEnd = oStart + oHeight;
      let bgHeight = scroller.dataset.bgHeight ? scroller.dataset.bgHeight : false;
      let oScrollHeight = scroller.dataset.scrollHeight ? Number(scroller.dataset.scrollHeight) : oHeight;
      
      console.log(`scroller: ${scroller}
      oHeight: ${oHeight}
      oStart: ${oStart}
      oEnd: ${oEnd}
      oScrollHeight: ${oScrollHeight}
      sInvert: ${sInvert}
      bgHeight: ${bgHeight}`);

      // Ensure offsets are correct
      // if (oStart < this.winHeight) { oStart = 0; }
      // else { oStart -= this.winHeight; }
      // if (oEnd >= this.docHeight) { oEnd -= this.winHeight; }

      // Create an object for caching.. saves jQuery re-reading the values
      // from the dom element on each scroll event.
      let obj = {
        target:       scroller,
        invert:       sInvert,
        scrollHeight: oScrollHeight,
        height:       oHeight,
        start:        oStart,
        end:          oEnd,
        sPercent:     oStart / this.docHeight,
        ePercent:     oEnd / this.docHeight,
        diff:         oScrollHeight - oHeight
      };

      console.warn("scroller index:1 %s", this.scrollers[index]);
      this.scrollers[index] = obj;
      console.info("scroller index:2 ", this.scrollers[index]);

      if (!scroller.dataset.scrollHeight) {

        // if bgHeight is set, we need to scale the background image accordingly.
        // And also override the scrollHeight if it's a percentage.
        if (bgHeight) {
          let h;
          // if we're dealing with percentages work it out...
          if( bgHeight.toString().indexOf('%') >= 0 ) {
          	 h = (parseInt(bgHeight) / 100) * oHeight;
          } else {
            h = bgHeight > this.scrollers[index].scrollHeight ? bgHeight : this.scrollers[index].scrollHeight;
          }          

          // Set the object's sizes and scale the background
          this.scrollers[index].scrollHeight = h;
          this.scrollers[index].diff         = h - scroller.clientHeight;
          scroller.style.backgroundSize      = 'auto' + h + 'px';

        } else {
          
          // Otherwsie, load the image and pull the sizes from that.
          let url = scroller.style.backgroundImage;
          let h;
          this.getHeightOnLoad( url, function(h) {
          if (!sInvert) {
            this.scrollers[index].scrollHeight = h;
            this.scrollers[index].diff = h - scroller.clientTop;
          } else {
            this.scrollers[index].scrollHeight = -h;
            this.scrollers[index].diff = h - scroller.clientTop;
          }
          });
        }
      }
    });
  }

	/** Update position of all Parallax Scroller element backgrounds.
	 * Called on window.scroll event.
	 * @return {null} Nothing returned, all handled internally.
	 */
  updateScroll = (me: HTMLDivElement) => {

    let yScroll = me.scrollTop;
    let percent = yScroll / this.docHeight;
    
    console.log(`yScroll: ${yScroll}, ${this.docHeight} percent: ${percent}`);
    
    for (let i = 0, l = this.scrollers.length; i < l; i++) {
      
      let o = this.scrollers[i];
      console.warn("US", this.scrollers[i]);
      // Exit if this element isn't in view
      if (yScroll + this.winHeight < o.start || yScroll > o.end) continue;

      let tPercent = (percent - o.sPercent) / (o.ePercent - o.sPercent);
      if (o.invert) tPercent = 1 - tPercent;
      // console.log(tPercent);
      o.target.style.backgroundPosition = '50% ' + -Math.ceil(o.diff * tPercent) + 'px;';

    }
  }

	/** Load background images into the DOM in aid in retrieving the image dimensions
	 *
	 * @param  {string} src       	| The source of the image
	 * @param  {function} callback	| The callback event for the onload method
	 * @return {null}            	| Doesn't return anything, use callback method
	 */
  getHeightOnLoad( src, callback ){
  	// Create an img element so we can listen to the onload method
  	// if( !callback || typeof callback != 'function' ) callback = function(){ return false; }
  	// let bgImg = $('<img />');
  	// 	bgImg.hide();
  	// 	bgImg.bind('load', function() {
  	// 		callback( $(this).height() );
  	// 		$(this).remove();
  			// this.updateScroll();
  	// });
  	// $('body').append(bgImg);
  	// bgImg.attr('src', src);
  }

  ngOnInit() {
  }

}
/** =======================================================================
 * The Perfect Parallax Scroller
 * ========================================================================
 *
 * @author:			Tom Dyer
 * @website:		http://www.bespokepixels.co.uk/
 * @version:		1.1
 * @modified:		17-06-2014
 * @requires:		jQuery, some HTML knowledge, coffee and biscuits.
 *
 * @description:	Parallax Scroller class. Adds parallax functionality to
 * 					any div containers that contain the attribute(s):
 *						data-type          : 'background'      (Required)
 *						data-scroll-height : int               (optional)
 *						data-bg-height     : int(px)/percent   (optional)
 *						data-invert        : boolean           (optional)
 *
 * This code doesn't come with any license - copy it, use it, edit it,
 * whatever - but please leave the original author information intact.
 * Credit where credit is due and all that jazz.
 *
 * Visit my website for more useful snippets of code:
 *  - http://www.bespokepixels.co.uk/
 */
