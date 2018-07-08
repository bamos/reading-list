<!--

This README is auto-generated with generate-readme.sh
Please add changes there.

-->
























# Reading List
![](https://raw.githubusercontent.com/bamos/reading-list/gh-pages/img/reading-list.gif)

This repository contains my open source reading list.
I keep track of books by editing the files here and
the results are automatically published as a website at
[http://bamos.github.io/reading-list](http://bamos.github.io/reading-list).

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
  used on the site, stored in [bower.json](/bower.json).

# Creating Your Reading List: Quick Start
1. Fork or copy the contents of this repository into a new GitHub repository.
  Make sure the default branch is set to `gh-pages` for deployment.
  At this point, you should be able to see my site hosted at.
  `http://<your-github-name>.github.io/reading-list`
2. Update the [data](/data)
  and personalize [index.html](/index.html).
  Push your changes to GitHub to see them immediately on the new site.
3. Replace links to http://bamos.github.io/reading-list with your URL.

# Local Deployment
Most browsers will not be able to open `index.html` directly
from the filesystem because the js loads YAML resources.
One workaround is to use start a simple Python static
web server with `python2 -m SimpleHTTPServer`
and access the website with `localhost:8000`.

# Updating Bower Dependencies
Run `bower update` to obtain the dependencies in `bower_components`.
Run [./update-vendor-deps.sh](/update-vendor-deps.sh)
to copy the necessary portions into [vendor](/vendor).

# Scripts

The [scripts](/scripts) directory contains Haskell and
Ruby scripts to select random books and quotes from
[data/finished.yaml](/data/finished.yaml).

## Import from Goodreads
The [Goodreads Ruby script](/scripts/goodreads.rb) by
[@seanosaur](https://github.com/seanosaur)
uses [Goodreads' API](https://www.goodreads.com/api/keys)
to import books into data files.
Please follow their ToS and add appropriate references
to Goodreads if this is used.

*Warning*: This script only pulls the first 200 books.
Improvements to this are being tracked in
[this issue](https://github.com/seanosaur/reading_list/issues/4).

# Inspiration
The following projects inspired me to create
a GitHub-hosted reading list.

Name | Stargazers | Description
----|----|----
[cmonty/reading-list](https://github.com/cmonty/reading-list) | 8 | Track books I've read and any thoughts I've had. Also uses Wiki to track knowledge.
[coryschires/reading-list](https://github.com/coryschires/reading-list) | 18 | List of books and screencasts related to development, user experience design, and entrepreneurship. 
[DavidRagone/reading_list](https://github.com/DavidRagone/reading_list) | 2 | List of books I have read related to development, user experience design, and entrepreneurship
[eightbitraptor/reading_list](https://github.com/eightbitraptor/reading_list) | 19 | 
[engeld/reading-list](https://github.com/engeld/reading-list) | 0 | A collection of my reading list and notes.
[gbtekkie/ReadingList](https://github.com/gbtekkie/ReadingList) | 2 | handy collection of tekkie readings
[jaredcacurak/reading-list](https://github.com/jaredcacurak/reading-list) | 3 | My reading list.

# People using this repo for their reading list

Ping me if you'd like to be added or removed.

Name | Stargazers | Description
----|----|----
[aerovolts/reading-list](https://github.com/aerovolts/reading-list) | 0 | My personal reading list.
[ammadafsar/reading-list](https://github.com/ammadafsar/reading-list) | 0 | My reading list. Made so that I add things I will later read and commit to read them all in order.   
[connors511/reading-list](https://github.com/connors511/reading-list) | 0 | My reading list. Made so that I add things I will later read and commit to read them all in order.
[jakehschwartz/reading-list](https://github.com/jakehschwartz/reading-list) | 0 | My reading list.
[markroxor/reading-list](https://github.com/markroxor/reading-list) | 0 | My reading list.
[rwfeather/reading-list](https://github.com/rwfeather/reading-list) | 0 | My reading list.
[samtron1412/reading-list](https://github.com/samtron1412/reading-list) | 0 | My reading list.
[seanosaur/reading_list](https://github.com/seanosaur/reading_list) | 2 | 
[wrideout/reading-list](https://github.com/wrideout/reading-list) | 2 | My reading list.

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
