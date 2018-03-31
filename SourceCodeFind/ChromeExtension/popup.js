document.getElementById('copy').addEventListener('click', triggerCopy);

function triggerCopy(){
	let url = '';
	//Fetch the URL from Chrome Tab
	chrome.tabs.query({currentWindow: true, active: true}, function(tabs){
		url = tabs[0].url;
		console.log(tabs[0].url);
		console.log("Incoming url ="+url);

		//Invoke the POST API call for /insert with valid headers and pass the URL as request body
		fetch("http://localhost:3000/insert", {
		method: "POST",
		headers: {
			'Accept': 'application/json, text/plain, */*',
			'Content-Type': 'application/json'
		},
		//JSON Stringify the URL
		body: JSON.stringify({
			url: url
		})
	})
	.then((res) => res.text())
	.then((responseFromServer) => {
		console.log("Response from Server="+responseFromServer);
		//Replace the div id "output" (defined in popup.html) with response from server (using innerHTML)
		document.getElementById('output').innerHTML = responseFromServer;
	});
	});
}