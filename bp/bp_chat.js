profileDict = {
	profile1 : {
		name : "P1",
		progress : "0",
		relationship : "2",
		prompts : [
			p1={text:"question",
			options:["o1","o2"],
			functions:["doThis(1)","doThis(2)"]},
			p2={text:"question2",
			options:["o1","o2"],
			functions:["doThis(1)","doThis(2)"]}
			]
	},
	profile2 : {
		name : "P2",
		progress : "0",
		relationship : "1",
		prompts : [
			p1={text:"question",
			options:["o1","o2"],
			functions:["doThis(1)","doThis(2)"]},
			p2={text:"question2",
			options:["o1","o2"],
			functions:["doThis(1)","doThis(2)"]}
			]
	}
}

function loadProfile(profile){
	console.log(profile)
}