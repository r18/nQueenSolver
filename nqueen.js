board = [
    [1,0,0,0,0],
    [1,0,0,0,0],
    [1,0,0,0,0],  
    [1,0,0,0,0],
    [1,0,0,0,0]
];

function main(){
    console.log("start");
    show(board);

}
function checkBoard(n){
    board = init(n);
    show(board);
    var i=0;
    var ans = [];
    while(genNextBoard(board)){
	i++;
	if(check(board)){
	    ans.push(clone(board));
	}
    }
    for(var i=0;i<ans.length;i++){
	show(ans[i]);
    }
    console.log(ans.length);
}

function checkTilt(board){
    for(var x=0;x<board[0].length;x++){
	if(getDR(board,0,x) > 1)return false;
	if(getDL(board,0,x) > 1)return false;
    }
    for(var y=0;y<board.length;y++){
	if(getDR(board,y,0) > 1)return false;
	if(getDL(board,y,board[y].length-1) > 1)return false;
    }
    return true;
}

function getDR(board,y,x){
    if (y == board.length || x == board[y].length ){
	return 0;
    } else if(board[y][x] == 1){
	return 1 + getDR(board,y+1,x+1);
    } else {
	return getDR(board,y+1,x+1);
    }
}

function getDL(board,y,x){
  if (y == board.length || x == -1 ||x == board[y].length ){
      return 0;
    } else if(board[y][x] == 1){
	return 1 + getDL(board,y+1,x-1);
    } else {
	return getDL(board,y+1,x-1);
    }
}

function clone(board){
    var res = [];
    for(var i=0;i<board.length;i++){
	var ans = [];
	for(var j=0;j<board[i].length;j++){
	    ans.push(board[i][j]);
	}
	res.push(ans);
    }
    return res;
}

function init(n){
    var res = [];
    for(var j=0;j<n;j++){
	var array = [1];
	for(var i=0;i<n-1;i++){
	    array.push(0);
	}
	res.push(array);
    }
    show(res);
    return res;
}
function show(board){
    for(var y =0;y<board.length;y++){
	var str = "";
	for(var x=0;x<board[y].length;x++){
	    str += board[y][x] + " ";
	}
	for(var i=0;i<y;i++)str+=" ";
	console.log(str);
    }
    console.log("----------------------");
}
function genNextBoard(board){
    return  replaceQueen(board,0);
}
function replaceQueen(board,y){
    for(var x=0;x<board[y].length;x++){
	if(board[y][x] == 1){
	    board[y][x] = 0;
	    if(x != board[y].length-1){
		board[y][x+1] = 1;
		break;
	    }else{
		board[y][0] = 1;
		if(y == board.length-1  ){
		    return false;
		}else {
		    return replaceQueen(board,y+1);
		    break;
		}
	    }

	}
    }
    return true;
}

function check(board){
    for(var y=0;y<board.length;y++){
	if(sumX(board,y) >1)return false;
    }
    for(var x=0;x<board[0].length;x++){
	if(sumY(board,x) >1)return false;
    }
    if(!checkTilt(board))return false;
    return true;
}


function sumX(board,y){
    var sum = 0;
    for(var x=0;x<board[y].length;x++){
	sum+=board[y][x];
    }
    return sum;
}

function sumY(board,x){
    var sum = 0;
    for(var y=0;y<board.length;y++){
	sum += board[y][x];
    }
    return sum;
}
window.onload = main;
