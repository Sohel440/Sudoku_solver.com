var arr = [[], [], [], [], [], [], [], [], []];
for (var i = 0; i < 9; i++) {
    for (var j = 0; j < 9; j++) {
        arr[i][j] = document.getElementById(i * 9 + j);
    }
}

var board = [[], [], [], [], [], [], [], [], []];

function FillBoard(board) {
    for (var i = 0; i < 9; i++) {
        for (var j = 0; j < 9; j++) {
            if (board[i][j] != 0)
                arr[i][j].innerText = board[i][j];
            else
                arr[i][j].innerText = '';
        }
    }
}

let GetPuzzle = document.getElementById('GetPuzzle');
let SolvePuzzle = document.getElementById('SolvePuzzle');

GetPuzzle.onclick = function () {
    var xhrRequest = new XMLHttpRequest();
    xhrRequest.onload = function () {
        var response = JSON.parse(xhrRequest.response);
        console.log(response);
        board = response.board;
        FillBoard(board);
    };
    xhrRequest.open('get', 'https://sugoku.onrender.com/board?difficulty=easy');
    xhrRequest.send();
};


SolvePuzzle.onclick = () => {
	sudukoSolver(board, 0, 0, 9);
};

function isSafe(board,row,col,val,n) {
	for(let i = 0 ; i < n ; i++){
        if(board[i][col] == val || board[row][i] == val){
            return false;

        }
    }
    let rt = Math.sqrt(n);
    let si = row - row % rt;
    let sj = col - col % rt;


    for(let i = si ; i < si + rt ; i++){
        for(let j = sj ; j < sj + rt ; j++){
            if(board[i][j] == val) return false;

        }
    }

	return true;
  }



function sudukoSolver(board,row,col,n) {
	// base case
    if (row == n) {
        //print(board, n);
        FillBoard(board)
        return true;
      }
    if(col == n) return sudukoSolver(board , row + 1 , 0 , n);
    if(board[row][col] != 0) return sudukoSolver(board , row , col+1 , n );

    for(let i =1 ; i <=9 ; i++){
        if(isSafe(board , row , col , i , n)){
            board[row][col] = i;
            let flag = sudukoSolver(board , row , col+1 , n);
            if(flag) return true;
            board[row][col] = 0;


        }


    }

    return false;

  }
  
  
 