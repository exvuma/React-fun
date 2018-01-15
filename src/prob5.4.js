const input = [1, 1, 0, 0, 1, 1, 1, 0]

function getSmallest(){
	//while(){
	for (var i = 0; i < input.length; i++) {
		input[i]
	}

	//}
}
function getVals(){
	// var firstZero;
	// var lastZero;
	// var smallest;
	for (var i = input.length - 1; i >= 0; i--) {
		if(input[i] == 0 && !firstZero){
			//flip the last 
			firstZero = i
		}else if(input[i] == 1 && !firstOne){
			firstOne = i
		}
	}
	for (var i = 0; i < input.length; i++) {
		if(input[i] == 1 && !lastOne){ 
			lastOne = i
		}else if(input[i] == 0 && !lastZero){ 
			lastZero = i
		}
	}
	//get nextSmallest by flipping firstZero with lastOne
	smallest = input.map((val, pos, list) => {
		if (pos == lastOne)
			return 0
		else if (pos == firstZero)
			return 1
		else 
			return val
	})
	largest = input.map((val, pos, list) => {
		if (pos == lastZero)
			return 1
		else if (pos == firstOne)
			return 0
		else 
			return val
	})

	return { largest: largest, smallest:smallest}
}
getVals(input)