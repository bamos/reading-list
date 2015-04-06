var to_read_tmpl = Handlebars.compile($('#to-read-tmpl').html());
var finished_tmpl = Handlebars.compile($('#finished-tmpl').html());
var comp_tmpl = Handlebars.compile($('#comp-tmpl').html());
Handlebars.registerHelper('for', function(from, to, block) {
  var accum = '';
  for(var i = from; i < to; ++i) {
    accum += block.fn(i);
  }
  return accum;
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
  });
  loadYAML("compilations", function(yaml) {
    yaml.sort(function(a,b) {
      return a.title.localeCompare(b.title);
    });
    $("#compilations").html(comp_tmpl(yaml));
  });
}

try{ clicky.init(100602499); }catch(e){}
try {
  var snowplowTracker = Snowplow.getTrackerUrl('derecho.elijah.cs.cmu.edu:8080');
  snowplowTracker.enableLinkTracking();
  snowplowTracker.trackPageView();
} catch (err) {}
