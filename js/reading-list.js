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

function loadLists() {
    getTemplateAjax('templates/to-read.hbars.html', function(tmpl) {
        loadYAML("to-read", function(yaml) {
            yaml.sort(function(a,b) {
                return a.author.localeCompare(b.author);
            });
            $("#to-read").html(tmpl(yaml));
        });
    });

    getTemplateAjax('templates/finished.hbars.html', function(tmpl) {
        loadYAML("finished", function(yaml) {
            yaml.sort(function(a,b) {
                if (a.finished > b.finished) return -1;
                if (a.finished < b.finished) return 1;
                return 0;
            });
            function dateString(d) {
                return d.getUTCFullYear().toString() + "/" +
                    (d.getUTCMonth() + 1).toString() + "/" +
                    (d.getUTCDate()).toString();
            }
            var len = yaml.length;
            for (var i = 0; i < len; i++) {
                yaml[i].finished = dateString(yaml[i].finished);
            }
            $("#finished").html(tmpl(yaml));
            finished_yaml = yaml;

            getTemplateAjax('templates/timeline-body.hbars.html', function(timeline_body_tmpl) {
                loadTimeline(yaml,timeline_body_tmpl);
            });
        });
    });

    getTemplateAjax('templates/compilations.hbars.html', function(tmpl) {
        loadYAML("compilations", function(yaml) {
            yaml.sort(function(a,b) {
                return a.title.localeCompare(b.title);
            });
            $("#compilations").html(tmpl(yaml));
        });
    });
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
        MathJax.Hub.Queue(["Typeset",MathJax.Hub]);
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

$(document).ready(function() {
    quotes_body_tmpl = null;
    getTemplateAjax('templates/quotes-body.hbars.html', function(tmpl) {
        quotes_body_tmpl = tmpl;
    });
    notes_body_tmpl = null;
    getTemplateAjax('templates/notes-body.hbars.html', function(tmpl) {
        notes_body_tmpl = tmpl;
    });

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

    loadLists();

    try{ clicky.init(100602499); }catch(e){}
    try {
        var snowplowTracker = Snowplow.getTrackerUrl('derecho.elijah.cs.cmu.edu:8080');
        snowplowTracker.enableLinkTracking();
        snowplowTracker.trackPageView();
    } catch (err) {}
})
