Ticketleap Coding Challenge




Intro - Chris, Tim (Ticketleap)
Actions
Chris Beiter   5:36 PM  Documents
To: Beah Burger-Lenehan

Hi Beah,

I've already spent 3 hours on this and am finally successfully getting responses from SEPTA.  Ran into a bunch of problems with the sample.

First, I'm not a python guy and have only written a couple of scripts on it before, let alone a full blow web server.

The web server did not work using only the instructions provided.  I had to (for whatever reason) go manually install Django.  First had to install Pip, to install Django.  Those don't install on Mac unless you sudo your commands, that took awhile to figure out.

Also had zero experience with these python virtual environments, and that took some ramping up also.  Didn't even realize that's what it was from the instructions, so that was another new piece of technology to ramp up on.

Tried to do a client side solution, ran into a variety of issues.  First jQuery was missing so bootstrap files built into the solution were throwing errors.  Then had to figure out how to get static files down to the client properly, learned how to configure that, then had to learn how to reference those files from the views.

Finally got everything set up to even start my scripting, and ran into the CORS issue with calling the API.  Tried to use jQuery for the AJAX calls, and it was extremely picky on how i set the allow access headers, could not use $.get at set the headers in the options object, had to use $.ajax and the beforeSend handler to get the jqXHR object and directly add headers to it using the setRequestHeader method.

Needless to say, this has taken my entire afternoon. Not that it hasn't been fun to learn about this new development environment, but I feel like I really don't have code I am proud of sharing at this point because it's just hacked to get the basic pieces working, and now I still don't have a working solution.

Things I still need to do...
* Dynamically change the destination station list to only show those stations on the same rail line as the start station
* When data comes back with times etc, still need to draw out the HTML for that
* Remove instructions from view

Anyway, wanted to be honest about how long I spent on this, and really cannot spend anymore time on this. Needless to say, I'm pretty disappointed in how much I was able to get done. Spent the vast majority of my time just trying to figure out how to get this sample to work, not writing actual code. :(