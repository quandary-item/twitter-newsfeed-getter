'twitter-timeline-getter'
=======================

*Warning:* Since Twitter updated their API/whole design, this probably doesn't work anymore. I am pretty sure that the URL used to retrieve the timeline data 
has changed and the format that it is returned in has changed too. However, it would probably still be useful to take a look at this repository to get the 
general idea of how this could be done.

What even is this?
------------------

This is a browser extension that lets you save a permanent copy of all of the timeline data your browser downloads from Twitter anyway. It does this by saving 
the data to the Downloads folder (turns out web browsers don't let extensions save to arbitrary folders on the hard drive - I can't imagine why). This could be 
useful/interesting for archival, data science purposes. Usual legal disclaimer applies. Blah blah. I don't even know what to say here. Caveat emptor, lex 
luthor, habeas corpus, etc.

This extension uses the [WebExtensions API](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions), an interface that allows you to write 
cross-browser extensions. I wrote/tested this on Firefox but it should work on Chrome, Edge, etc with few modifications.

If you want to install this addon in Firefox without asking some bureaucrat for permission, you can install it as a [Temporary Addon](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/Temporary_Installation_in_Firefox). There is probably an analogous way to do it for other browsers.
