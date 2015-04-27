<!--

This README is auto-generated with generate-readme.sh
Please add changes there instead.

-->
# Reading List
![](https://raw.githubusercontent.com/bamos/reading-list/gh-pages/img/reading-list.gif)

This repository contains my open source reading list.
See the [online version](http://bamos.github.io/reading-list).

> Hi, I welcome feedback on the code or presentation,
> I'm not a web developer or designer.
> The contents of my list is also lacking and I
> welcome suggestions.
>
> -Brandon. // 2015/04/19

# Goals
+ Plaintext and friendly data format.
+ Minimal hosting and deployment overhead.
+ Offline editing support.

# Technologies Used
+ Linux and OSX. Windows should also work with Cygwin, but
  I haven't tried. Please file any issues related to this.
+ [YAML](http://yaml.org) data.
+ [GitHub Pages](https://pages.github.com/) hosts and automatically
  deploys a 100% client-side website that can also be edited offline.
  [Bower](http://bower.io/) manages 3rd party library dependencies
  used on the site, stored in [bower.json](https://github.com/bamos/reading-list/blob/gh-pages/bower.json).

# Creating Your Reading List: Quick Start
1. Fork or copy the contents of this repository into a new GitHub repository.
  Make sure the default branch is set to `gh-pages` for deployment.
  At this point, you should be able to see my site hosted at.
  `http://<your-github-name>.github.io/reading-list`
2. Update the [data](https://github.com/bamos/reading-list/tree/gh-pages/data)
  and personalize [index.html](https://github.com/bamos/reading-list/blob/gh-pages/index.html).
  Push your changes to GitHub to see them immediately on the new site.

# Local Deployment
Most browsers will not be able to open `index.html` directly
from the filesystem because the js loads YAML resources.
One workaround is to use start a simple Python static
web server with `python2 -m SimpleHTTPServer`
and access the website with `localhost:8000`.

# Updating Bower Dependencies
Run `bower update` to obtain the dependencies in `bower_components`.
Run [./update-vendor-deps.sh](https://github.com/bamos/reading-list/blob/gh-pages/update-vendor-deps.sh)
to copy the necessary portions into
[vendor](https://github.com/bamos/reading-list/tree/gh-pages/vendor).

# Getting a Random Quote with a Script

[get-random-quote.hs](https://github.com/bamos/reading-list/blob/gh-pages/get-random-quote.hs)
is a Haskell script that prints a random quote from the quote
collection in
[data/finished.yaml](https://github.com/bamos/reading-list/blob/gh-pages/data/finished.yaml).

I use it to email myself quotes every few days with a cron
job piping the output to a command-line mailing program (mutt).

Appropriate packages can be installed with
[cabal](https://www.haskell.org/cabal/).

# Inspiration
The following projects inspired me to create
a GitHub-hosted reading list.

Name | Stargazers | Description
----|----|----
[0x0af/doiread](https://github.com/0x0af/doiread) | 0 | Do I read?
[cmonty/reading-list](https://github.com/cmonty/reading-list) | 6 | Track books I've read and any thoughts I've had. Also uses Wiki to track knowledge.
[coryschires/reading-list](https://github.com/coryschires/reading-list) | 17 | List of books and screencasts related to development, user experience design, and entrepreneurship. 
[DavidRagone/reading_list](https://github.com/DavidRagone/reading_list) | 2 | List of books I have read related to development, user experience design, and entrepreneurship
[eightbitraptor/reading_list](https://github.com/eightbitraptor/reading_list) | 8 | 
[gbtekkie/ReadingList](https://github.com/gbtekkie/ReadingList) | 2 | handy collection of tekkie readings
[jaredcacurak/reading-list](https://github.com/jaredcacurak/reading-list) | 2 | My reading list.
[seanosaur/reading_list](https://github.com/seanosaur/reading_list) | 0 | 
# Credits and Licensing
All portions are
[MIT licensed](https://github.com/bamos/reading-list/blob/gh-pages/LICENSE.mit)
by Brandon Amos unless otherwise noted.

This project uses and modifies the following open source projects
and resources.
Modifications remain under the original license.

| Project | Modified | License |
|---|---|---|
| [Twitter bootstrap](https://github.com/twbs/bootstrap) | No | MIT |
| [handlebars.js](https://github.com/wycats/handlebars.js/) | No | MIT License
| [IronSummitMedia/startbootstrap-grayscale](https://github.com/IronSummitMedia/startbootstrap-grayscale) | Yes | Apache 2 |
| [makeusebrew/bootbox](https://github.com/makeusabrew/bootbox) | No | MIT |
| [MathJax](https://github.com/mathjax/MathJax) | No | Apache |
| [Flickr Photo](https://flic.kr/p/rnazyb) | Yes | [cc by-nc-sa 2.0](https://creativecommons.org/licenses/by-nc-sa/2.0/) |
| [TimelineJS](https://github.com/NUKnightLab/TimelineJS) | No | Mozilla Public License
