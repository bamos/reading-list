// http://www.jblotus.com/2011/05/24/keeping-your-handlebars-js-templates-organized/
function getTemplateAjax(path, callback) {
    var source;
    var template;

    $.ajax({
      url: path,
        success: function(data) {
          source    = data;
          template  = Handlebars.compile(source);

          //execute the callback if passed
          if (callback) callback(template);
        }
    });
}

// http://stackoverflow.com/questions/979975
function getQueryParams(qs) {
    qs = qs.split('+').join(' ');

    var params = {},
        tokens,
        re = /[?&]?([^=]+)=([^&]*)/g;

    while (tokens = re.exec(qs)) {
        params[decodeURIComponent(tokens[1])] = decodeURIComponent(tokens[2]);
    }

    return params;
}

$.fn.scrollView = function () {
    return this.each(function () {
        $('html, body').animate({
            scrollTop: $(this).offset().top
        }, 1000);
    });
}

function loadYAML(name, f) {
    var client = new XMLHttpRequest();
    client.open('GET', 'data/' + name + '.yaml');
    client.onreadystatechange = function() {
        if (client.readyState == 4) {
            var yaml = jsyaml.load(client.responseText);
            if (yaml) {
                f(yaml);
            }
        }
    }
    client.send();
}

function prettifyFinishedEntryInPlace(entry) {
    function dateString(d) {
        // Get a string representation of a date object d.
        return d.getUTCFullYear().toString() + "/" +
            (d.getUTCMonth() + 1).toString() + "/" +
            (d.getUTCDate()).toString();
    }

    var hash = CryptoJS.SHA256(entry.author + entry.title);

    entry['hash'] = hash.toString(CryptoJS.enc.Hex);
    entry.finished = dateString(entry.finished);

    // Convert markdown to HTML in the notes and quotes.
    if ('quotes' in entry) {
        var l = entry.quotes;
        var jLen = l.length;
        for (var j = 0; j < jLen; j++) {
            l[j].content = marked(l[j].content);
        }
    }
    if ('notes' in entry) {
        var l = entry.notes;
        var jLen = l.length;
        for (var j = 0; j < jLen; j++) {
            l[j] = marked(l[j]);
        }
    }
}

function loadLists() {
    if (!isPermalink) {
        getTemplateAjax('templates/to-read.hbars.html', function(tmpl) {
            loadYAML("to-read", function(yaml) {
                yaml.sort(function(a,b) {
                    return a.author.localeCompare(b.author);
                });
                $("#to-read").html(tmpl(yaml));
                $("#to-read-count").append(yaml.length);
            });
        });
    }

    getTemplateAjax('templates/finished.hbars.html', function(tmpl) {
        loadYAML("finished", function(yamlUnfiltered) {
            isComplete = function(book) {
                return book.finished instanceof Date;
            }
            yaml = yamlUnfiltered.filter(isComplete);
            $("#finished-count").append(yaml.length);

            // Must be done before `prettifyFinishedEntryInPlace`.
            // Otherwise, the dates are sorted as strings.
            if (!isPermalink) {
                yaml.sort(function(a,b) {
                    if (a.finished > b.finished) return -1;
                    if (a.finished < b.finished) return 1;
                    return 0;
                });
            }

            var iLen = yaml.length;
            for (var i = 0; i < iLen; i++) {
                prettifyFinishedEntryInPlace(yaml[i])
                if (isPermalink && yaml[i].hash == params.book) {
                    yaml = [yaml[i]];
                    break;
                }
            }

            if (isPermalink) {
                if (yaml.length != 1 || yaml[0].hash != params.book) {
                    alert("Error: Unable to find book.");
                }
            } else {
                getTemplateAjax('templates/timeline-body.hbars.html',
                                function(timeline_body_tmpl) {
                                    loadTimeline(yaml,timeline_body_tmpl);
                                });
            }

            $("#finished").html(tmpl(yaml));
            finished_yaml = yaml;

            if (isPermalink) {
                $(".intro").hide();
                $("#rHead").hide();
                $("#cHead").hide();
                $("h2").hide();
                $("#finished").prepend('<br>'); // TODO: Add this to CSS.
                $(".permalink").hide();
                $("li").hide();
            }
        });
    });

    if (!isPermalink) {
        getTemplateAjax('templates/compilations.hbars.html', function(tmpl) {
            loadYAML("compilations", function(yaml) {
                yaml.sort(function(a,b) {
                    return a.title.localeCompare(b.title);
                });
                $("#compilations").html(tmpl(yaml));
            });
        });
    }
}

function showModal(title,yaml,idx,subfield) {
    var message = null;
    if (subfield == "quotes" && quotes_body_tmpl) {
        message = quotes_body_tmpl(yaml[idx]);
    } else if (subfield == "notes" && notes_body_tmpl) {
        message = notes_body_tmpl(yaml[idx]);
    }

    if (message) {
        bootbox.dialog({
            message: message,
            title: title,
            onEscape: function() {}
        });
        // MathJax.Hub.Queue(["Typeset",MathJax.Hub]);
    }
}

// Close the modal dialog if the background of the document is clicked.
// Reference: https://github.com/makeusabrew/bootbox/issues/210
$(document).on('click', '.bootbox', function(){
    var classname = event.target.className;
    if(classname && !$('.' + classname).parents('.modal-dialog').length)
        bootbox.hideAll();
});

function loadTimeline(finished_yaml, timeline_body_tmpl) {
    var books = []
    $.each(finished_yaml, function(idx, book) {
        book['idx'] = idx;
        books.push({
            "startDate": book.finished.replace(/\//g,","),
            "headline": book.author + ": " + book.title,
            "text": timeline_body_tmpl(book)
        });
    });
    var timelineData = { "timeline": {
        "type": "default",
        "date": books
    }};
    createStoryJS({
        width: "100%",
        height: "400",
        source: timelineData,
        embed_id: 'finished-timeline',
        start_at_end: true
    });
}

function registerHandlebarsHelpers() {
    Handlebars.registerHelper('for', function(from, to, block) {
        var accum = '';
        for(var i = from; i < to; ++i) {
            accum += block.fn(i);
        }
        return accum;
    });

    Handlebars.registerHelper('escape', function(variable) {
        return variable.replace(/(['"])/g, '\\$1');
    });

    // http://stackoverflow.com/questions/12331077
    Handlebars.registerHelper('breaklines', function(text) {
      text = Handlebars.Utils.escapeExpression(text);
      text = text.replace(/(\r\n|\n|\r)/gm, '<br>');
      return new Handlebars.SafeString(text);
    });
}

$(document).ready(function() {
    params = getQueryParams(document.location.search);
    isPermalink = 'book' in params;

    quotes_body_tmpl = null;
    getTemplateAjax('templates/quotes-body.hbars.html', function(tmpl) {
        quotes_body_tmpl = tmpl;
    });
    notes_body_tmpl = null;
    getTemplateAjax('templates/notes-body.hbars.html', function(tmpl) {
        notes_body_tmpl = tmpl;
    });

    registerHandlebarsHelpers();
    loadLists();
})
