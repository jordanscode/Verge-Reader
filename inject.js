google.load("feeds", "1");
//chrome.browserAction.setBadgeBackgroundColor({color:[250, 75, 42, 255]});
//chrome.browserAction.setBadgeText({text: "4"});

    function initialize() {
      var feed = new google.feeds.Feed("http://www.theverge.com/rss/index.xml");
      var numStories = localStorage["numStories"];
      if (numStories == undefined) {numStories = 4;}
      feed.includeHistoricalEntries();
      feed.setNumEntries(numStories);

      feed.load(function(result) {
        if (!result.error) {
          var container = document.getElementById("feed");
          for (var i = 0; i < result.feed.entries.length; i++) {
            var entry = result.feed.entries[i];
            var url = document.createTextNode(entry.link);
            var story = document.createElement("li");

            var linkContainer = document.createElement("a");
            	linkContainer.setAttribute("href", entry.link );

            var headline = document.createElement("div");
            	headline.className = "headline";

            var author = document.createElement("div");
            	author.className = "author";
            var authorText = entry.author.replace('&#39;', '\'');

            var numColors = 4;
            var color = document.createElement("div");
            	if (i % numColors === 0) {color.className = "color-orange";}
            	if (i % numColors === 1) {color.className = "color-green";}
            	if (i % numColors === 2) {color.className = "color-yellow";}
            	if (i % numColors === 3) {color.className = "color-red";}

            story.appendChild(linkContainer);
	            linkContainer.appendChild(headline);
	            	headline.appendChild(document.createTextNode(entry.title));
	            linkContainer.appendChild(author);
	            	author.appendChild(document.createTextNode(authorText));
	            linkContainer.appendChild(color);

            container.appendChild(story);
          }
        }
      });
    }
    google.setOnLoadCallback(initialize);
