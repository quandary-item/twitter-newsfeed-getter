function extractHTMLFromJSON(jsonRaw) {
    var jsonData = JSON.parse(jsonRaw);
    var htmlRaw = jsonData.inner.items_html;
    return htmlRaw;
}

function createURLForHTMLString(str) {
    var blob = new Blob([str], {type: 'text/html'});
    return URL.createObjectURL(blob);
}


function getArchiveFileName() {
    return 'timeline-' + (new Date()).toISOString() + '.html';
}

function joinOuterHTML(items) {
    var outerHTMLs = Array.from(items, elem => elem.outerHTML);
    return outerHTMLs.join('');
}

function getResponseContent(details) {
    return new Promise( (resolve, reject) => {
	let filter = browser.webRequest.filterResponseData(details.requestId);
	let decoder = new TextDecoder("utf-8");
	let encoder = new TextEncoder();

	let str = "";
	filter.ondata = event => {
	    str += decoder.decode(event.data, {stream: true});
	};

	filter.onstop = event => {
	    // Pass the returned data through to the browser
	    filter.write(encoder.encode(str));
	    filter.close();

	    // Do something with the response content using the handler
	    resolve(str);
	};
    });
}

function downloadHTML(rawHTML){
    browser.downloads.download({
	url: createURLForHTMLString(rawHTML),
	filename: getArchiveFileName()
    });
}

function processHTMLData(rawHTML) {
    var parsedHTML = (new DOMParser()).parseFromString(rawHTML, 'text/html');
    var jsStreamItems = parsedHTML.querySelectorAll('.js-stream-item');
    var streamItemsRawHTML = joinOuterHTML(jsStreamItems);

    if (streamItemsRawHTML.length > 0) {
	downloadHTML(streamItemsRawHTML);
    }
}


// Log timeline data from the initial page load
browser.webRequest.onBeforeRequest.addListener(
    (details => {
	getResponseContent(details).then(processHTMLData)
    }),
    {urls: ["https://twitter.com/"]},
    ["blocking"]
);


// Log timeline data from the incremental timeline updates
browser.webRequest.onBeforeRequest.addListener(
    (details => {
	getResponseContent(details).then(extractHTMLFromJSON).then(processHTMLData)
    }),
    {urls: ["https://twitter.com/i/timeline*"]},
    ["blocking"]
);
