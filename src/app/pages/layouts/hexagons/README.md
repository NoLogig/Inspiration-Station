
## CSS Note - Display, Opacity, Visibility

Each of these CSS properties is in fact unique. 
In addition to rendering an element not visible, they have the following additional effect(s):

1.Collapses the space that the element would normally occupy
2.Responds to events (e.g., click, keypress)
3.Participates in the taborder

                   collapse events taborder
opacity: 0              No     Yes     Yes
visibility: hidden      No     No      No
visibility: collapse    *      No      No
display: none          Yes     No      No

* Yes inside a table element, otherwise No.

opacity does not inherit, while visibility does

opacity is animatable while visibility is not.
(Well, technically it is, but there is simply no behaviour defined for, say,
"37% collapsed and 63% hidden", so you can consider this as non-animatable.)

opacity, can't make a child element more opaque than its parent. 
E.G. if you have a <p> with color:black and opacity:0.5, you can not make any of its children fully black.
Valid values for opacity are between 0 - 1 and this example would require 2!

Consequently, you can have a visible child (with visibility:visible) in an invisible parent (with visibility:hidden).
This is impossible with opacity; if a parent has opacity:0; its children are always invisible.

Opacity values less than 1 create their own stacking context; no value for visibility does.
(I couldn't demonstrate this, but I can't think of any means to show the stacking context of a visibility:hidden element.)

Elements with opacity:0 are still read by screen readers, while visible:hidden elements are not.

Visibility has more options (such as collapse) and elements that aren't visible no longer respond to clicks and can't be tabbed to.
