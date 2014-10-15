This repository is my approach at a GitHub-hosted reading list.
My goal is to have version-controlled plaintext list with
minimal hosting overhead, which I achieve through static hosting
on [GitHub pages][gh-pages].
The online version is available [here][www].
Following are screenshots of the data and web pages.

![](https://raw.githubusercontent.com/bamos/reading-list/gh-pages/screenshots/to-read-yaml.png)
![](https://raw.githubusercontent.com/bamos/reading-list/gh-pages/screenshots/finished-yaml.png)
![](https://raw.githubusercontent.com/bamos/reading-list/gh-pages/screenshots/page.png)
![](https://raw.githubusercontent.com/bamos/reading-list/gh-pages/screenshots/quotes.png)

# Workflow and Implementation
My workflow for updating my list uses `gh-pages` as the default
branch. I modify the [YAML][yaml] files in the [data][data] directory
and commit/push. GitHub pages will publish the new content,
which will be read by [index.html][index].
`index.html` loads the YAML data files with [nodeca/js-yaml][js-yaml]
and uses [handlebars.js][handlebars.js] for templates.
The modals are created with [drublic/css-modal][css-modal].
Very clearly, I'm not a frontend developer and welcome
any pull requests with improvements.

# Inspiration
I was inspired to create a GitHub-hosted reading list by seeing
similar projects by other people.
Following is a list of repositories I've found.
Do get in contact if you'd like me to check out and link to your list.

+ [cmonty/reading-list](http://github.com/cmonty/reading-list)
+ [coryschires/reading-list](http://github.com/coryschires/reading-list)
+ [DavidRagone/reading\_list](http://github.com/DavidRagone/reading_list)
+ [eightbitraptor/reading\_list](http://github.com/eightbitraptor/reading_list)
+ [gbtekkie/ReadingList](http://github.com/gbtekkie/ReadingList)
+ [jamesemorgan/reading-list](http://github.com/jamesemorgan/reading-list)
+ [jaredcacurak/Reading-List](http://github.com/jaredcacurak/Reading-List)

# Why not just use a hosted solution?
Simply, preference.
[goodreads][goodreads] provides an amazing hosted reading list
service and community.
However, I prefer managing my lists in plaintext with vim
and being able to hack on any part of the system if
I want a new or different feature.

[www]: http://bamos.io/reading-list
[gh-pages]: https://pages.github.com/
[yaml]: http://www.yaml.org/
[data]: https://github.com/bamos/reading-list/tree/gh-pages/data
[index]: https://github.com/bamos/reading-list/blob/gh-pages/index.html
[js-yaml]: https://github.com/nodeca/js-yaml
[handlebars.js]: https://github.com/wycats/handlebars.js
[css-modal]: https://github.com/drublic/css-modal
[goodreads]: http://www.goodreads.com/
