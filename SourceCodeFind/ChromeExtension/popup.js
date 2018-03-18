document.getElementById('copy').addEventListener('click', triggerCopy);

function triggerCopy(){
	
	let url = '';
	chrome.tabs.query({currentWindow: true, active: true}, function(tabs){
		url = tabs[0].url;
		console.log(tabs[0].url);
		console.log("1. url ="+url);
	});
	
	url='https://stackoverflow.com/questions/47903131/need-example-code-on-spring-integration-example-for-aws-s3-as-inbound-and-apache';
	
	fetch('http://localhost:3000/insert?url='+url)
		.then((res) => res.text())
		.then((data) => {
			//console.log("3.url="+url);
			console.log("2. url="+url);
			document.getElementById('output').innerHTML = data;
		});
}