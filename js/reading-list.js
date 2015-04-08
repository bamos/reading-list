var to_read_tmpl = Handlebars.compile($('#to-read-tmpl').html());
var finished_tmpl = Handlebars.compile($('#finished-tmpl').html());
var comp_tmpl = Handlebars.compile($('#comp-tmpl').html());
var quotes_body_tmpl = Handlebars.compile($('#quotes-body-tmpl').html());

var to_read_yaml = null;
var finished_yaml = null;
var compilations_yaml = null;

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
function loadYAML(name, f) {
    var client = new XMLHttpRequest();
    client.open('GET', 'data/' + name + '.yaml');
    client.onreadystatechange = function() {
        var yaml = jsyaml.load(client.responseText);
        if (yaml) {
            f(yaml);
        }
    }
    client.send();
}
function loadLists() {
    loadYAML("to-read", function(yaml) {
        yaml.sort(function(a,b) {
            return a.author.localeCompare(b.author);
        });
        $("#to-read").html(to_read_tmpl(yaml));
        to_read_yaml = yaml;
    });
    loadYAML("finished", function(yaml) {
        yaml.sort(function(a,b) {
            if (a.finished > b.finished) return -1;
            if (a.finished < b.finished) return 1;
            return 0;
        });
        function dateString(d) {
            return d.getFullYear().toString() + "/" +
                (d.getMonth() + 1).toString() + "/" +
                (d.getDate() + 1).toString();
        }
        var len = yaml.length;
        for (var i = 0; i < len; i++) {
            yaml[i].finished = dateString(yaml[i].finished);
        }
        $("#finished").html(finished_tmpl(yaml));
        finished_yaml = yaml;
    });
    loadYAML("compilations", function(yaml) {
        yaml.sort(function(a,b) {
            return a.title.localeCompare(b.title);
        });
        $("#compilations").html(comp_tmpl(yaml));
        compilations_yaml = yaml;
    });
}

function showModal(title,yaml,idx) {
    console.log(yaml[idx]);
    bootbox.dialog({
        message: quotes_body_tmpl(yaml[idx]),
        title: title,
        onEscape: function() {}
    });
}

// Close the modal dialog if the background of the document is clicked.
// Reference: https://github.com/makeusabrew/bootbox/issues/210
$(document).on('click', '.bootbox', function(){
    var classname = event.target.className;
    if(classname && !$('.' + classname).parents('.modal-dialog').length)
        bootbox.hideAll();
});

try{ clicky.init(100602499); }catch(e){}
try {
    var snowplowTracker = Snowplow.getTrackerUrl('derecho.elijah.cs.cmu.edu:8080');
    snowplowTracker.enableLinkTracking();
    snowplowTracker.trackPageView();
} catch (err) {}
