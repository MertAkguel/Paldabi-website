// setting up the Algorithm

document.getElementsByClassName('nav-link')[0].className = "nav-link";
document.getElementsByClassName('nav-link')[3].className = "nav-link active dropdown-toggle";

function reverseString(str) {
    return str.split("").reverse().join("");
}
const element = document.getElementById("form");
element.addEventListener("keypress", function(event) {
	 if (event.key === "Enter") {
        getMatrix();
 		event.preventDefault();
     }
});
document.getElementById('form').addEventListener('submit', function (event) {
    event.preventDefault();
    // When the data is submitted the grid mount function is called
    getMatrix();
  });

function buildMatrix()
{
    const score = document.getElementById('score');
    if( score.value != "")
    {
        delete_matrix();
    }
    const sequence1 = document.getElementById('horizontal').value;
    const sequence2 = document.getElementById('vertical').value; 

    if(sequence1.length === 0 || sequence2.length === 0)
    {
        return;
    }
    const s1_length = document.getElementById('horizontal').value.length + 2;
    const s2_length = document.getElementById('vertical').value.length + 2; 
    const product = s1_length*s2_length;
    const matrix = document.getElementById('matrix');
    for(let i = 0; i < product; i++)
    {
        let cell = document.createElement('button');
        
        cell.className = "cell";
        matrix.appendChild(cell);

    }
    
    matrix.style.setProperty('grid-template-columns', `repeat(${s1_length}, 40px)`);
    matrix.style.setProperty('grid-template-rows',`repeat(${s2_length}, 40px)`);
    
}

function setMatrix()
{
    const sequence1 = document.getElementById('horizontal').value;
    const sequence2 = document.getElementById('vertical').value; 

    const cell = document.getElementsByClassName('cell');
    // filling first row with sequence1 input
    cell[1].innerHTML = "-";
    for(let i = 0; i < sequence1.length; i++)
    {
        cell[i+2].innerHTML = sequence1[i];
    }
    // filling first column with sequence2 input
    cell[sequence1.length+2].innerHTML = "-";
    for(let j = 0; j < sequence2.length; j++)
    {
        cell[(sequence1.length+2)*(j+2)].innerHTML = sequence2[j];
    }
}

// implementation of the Needleman-Wunsch algorithm
function fillN(traceback)
{
    
    const sequence1 = document.getElementById('horizontal').value;
    const sequence2 = document.getElementById('vertical').value; 

    traceback = [];
    for(let i = 0; i < sequence2.length + 1; i++)
    {
        let temp = [];
        
        for(let j = 0; j < sequence1.length + 1; j++)
        {
            temp.push('N');
        }
        traceback.push(temp);
    }
    
    return traceback;
}

// Initialization of the Needleman-Wunsch algorithm
function initializeNW(traceback)
{
    const matrix = document.getElementsByClassName('cell');
    const sequence1 = document.getElementById('horizontal').value;
    const sequence2 = document.getElementById('vertical').value; 
    const gapscore = document.getElementById('gap').value;
    const k = parseInt(document.getElementById('kband').value);
    let counter_h = 1;
    let counter_v = 1;
    const lenh = sequence1.length + 1;
    const lenv = sequence2.length + 1;

    matrix[lenh+2].innerHTML = 0;
    // Initialisierung
    for (let i = lenh + 3; i < lenh * 2 + 2 && i < lenh + 3 + k; i++)
    {
        
        traceback[0][counter_h] = 'H';
        matrix[i].innerHTML = (counter_h) * parseInt(gapscore);
        counter_h++;
    }
    for (let i = 2 * lenh + 3; i <= (lenh + 1) * (lenv + 1) && i < (2 * lenh + 3) + k * (lenh + 1); i += lenh + 1)
    {
        
        traceback[counter_v][0] = 'V';
        matrix[i].innerHTML = (counter_v) * parseInt(gapscore);
        counter_v++;
    }
    traceback[0][0] = 'N';
}
function buildNW(traceback)
{
    const horizontal = document.getElementById('horizontal').value;
    const vertikal = document.getElementById('vertical').value; 
    const match = document.getElementById('match').value;
    const mismatch = document.getElementById('mismatch').value;
    const gap = document.getElementById('gap').value;
    const k = parseInt(document.getElementById('kband').value);
    let counter_h = 1;
    let counter_v = 1;
    //Recurrence:
    const matrix = document.getElementsByClassName('cell');
    
    const lenh = horizontal.length;
    const lenv = vertikal.length;
    
    let start = (lenh+2) * 2 + 2;
    let end = (lenh + 2) * (lenv + 2);
    
    
    let n = 0;
    for (let i = start; i < end; i += lenh + 3)
    {
        ++n;
        for (let j = -k; j < k + 1; ++j)
        {
            
            
            let score = 0;
            if (horizontal[counter_h + j - 1] == vertikal[counter_v - 1])
            {
                score = parseInt(match);
            }
            else
            {
                score = parseInt(mismatch);
            }
            if(j == 0)
            {
                
                if(k == 0)
                {
                    matrix[i+j].innerHTML = parseInt(matrix[i-lenh-3+j].innerHTML) + parseInt(score);
                    traceback[counter_v][counter_h + j] = 'D';
                    continue;
                }
                
                if (parseInt(matrix[i-lenh-3+j].innerHTML) + parseInt(score) >= parseInt(matrix[i-lenh-2+j].innerHTML) + parseInt(gap) && parseInt(matrix[i-lenh-3+j].innerHTML) + parseInt(score) >= parseInt(matrix[i-1+j].innerHTML) + parseInt(gap))
                {
                    
                    matrix[i+j].innerHTML = parseInt(matrix[i-lenh-3+j].innerHTML) + parseInt(score);
                    traceback[counter_v][counter_h + j] = 'D';
                }
                else if (parseInt(matrix[i-lenh-2+j].innerHTML) + parseInt(gap) > parseInt(matrix[i-lenh-3+j].innerHTML) + parseInt(score) && parseInt(matrix[i-lenh-2+j].innerHTML) + parseInt(gap) >= parseInt(matrix[i-1+j].innerHTML) + parseInt(gap))
                {
                    matrix[i+j].innerHTML = parseInt(matrix[i-lenh-2+j].innerHTML) + parseInt(gap);
                    traceback[counter_v][counter_h + j] = 'V';
                }
                else if (parseInt(matrix[i-1+j].innerHTML) + parseInt(gap) > parseInt(matrix[i-lenh-3+j].innerHTML) + parseInt(score) && parseInt(matrix[i-1+j].innerHTML) + parseInt(gap) > parseInt(matrix[i-lenh-2+j].innerHTML) + parseInt(gap))
                {
                    matrix[i+j].innerHTML = parseInt(matrix[i-1+j].innerHTML) + parseInt(gap);
                    traceback[counter_v][counter_h + j] = 'H';
                }
            }
            else if(j < 0 && counter_v > Math.abs(j))
            {
                
                if(parseInt(matrix[i-lenh-3+j].innerHTML) + score >= parseInt(matrix[i-lenh-2+j].innerHTML) + parseInt(gap))
                {
                    matrix[i+j].innerHTML = parseInt(matrix[i-lenh-3+j].innerHTML) + parseInt(score);
                    traceback[counter_v][counter_h + j] = 'D';
                    
                }
                else
                {
                    matrix[i+j].innerHTML = parseInt(matrix[i-lenh-2+j].innerHTML) + parseInt(gap);
                    traceback[counter_v][counter_h + j] = 'V';
                }
                
                
            }
            else if(j > 0 && counter_h - 1 + j < lenh)
            {
                
                if (parseInt(matrix[i-lenh-3+j].innerHTML) + score >= parseInt(matrix[i-1+j].innerHTML) + parseInt(gap))
                {
                    
                    matrix[i+j].innerHTML = parseInt(matrix[i-lenh-3+j].innerHTML) + parseInt(score);
                    traceback[counter_v][counter_h + j] = 'D';
                }
                else
                {
                    
                    matrix[i+j].innerHTML = parseInt(matrix[i-1+j].innerHTML) + parseInt(gap);
                    traceback[counter_v][counter_h + j] = 'H';
                }
            }
            // ++counter_h;
            
        }
        counter_v++;
        ++counter_h;
        
    }
    
}
function getscore()
{
    const score = document.getElementById('score');
    const cell = document.getElementsByClassName('cell');
    
    
    score.innerText = "Score: " + cell[cell.length - 1].innerHTML;
    

}
function computeNW()
{
    traceback = [];
    traceback = fillN(traceback);
   
    
    
    initializeNW(traceback);
    buildNW(traceback);
    console.log("traceback = ", traceback)
    getscore();
}

function delete_matrix()
{
    let cell = document.getElementsByClassName('cell');
    let iteration_laenge = cell.length - 1;
    let c = 0;
    for(let i = iteration_laenge; i >= 0; i--)
    {
        c++;
        cell[i].remove();
    }
    
}

function getMatrix()
{
    const match = document.getElementById('match').value;
    const mismatch = document.getElementById('mismatch').value;
    const gap = document.getElementById('gap').value;
    const sequence1 = document.getElementById('horizontal').value;
    const sequence2 = document.getElementById('vertical').value; 
    if(match === "")
    {
        alert("You have to give a match value");
        return;
    }
    else if(mismatch === "")
    {
        alert("You have to give a mismatch value");
        return;
    }
    else if(gap === "")
    {
        alert("You have to give a gap value");
        return;
    }
    else if(sequence1 === "")
    {
        alert("You have to give the first sequence");
        return;
    }
    else if(sequence2 === "")
    {
        alert("You have to give the second sequence");
        return;
    }
    else if(sequence1.length !== sequence2.length)
    {
        alert("Both sequences must have the same size");
        return;
    }
    
    
    buildMatrix();
    setMatrix();
    computeNW();
    get_Alignment();
    calculate_optimal_score();
    
}


function get_Alignment(a1="", a2="",gaps="")
{
    let cell = document.getElementsByClassName('cell');


    let alignment = document.getElementById('alignment');
    
	if(alignment.innerText != "")
    {
        alignment.innerText = "";
    }
	let horizontal = document.getElementById('horizontal').value;
	
	let vertikal = document.getElementById('vertical').value;

    let cell_number = (horizontal.length + 2) * (vertikal.length + 2) - 1;
    cell[cell_number].style.backgroundColor = "#50C878";
    cell[cell_number].style.fontSize = "1.1rem";

	let tupel = [vertikal.length, horizontal.length];

	while(tupel[0] != 0 || tupel[1] != 0)
	{
        
		if(traceback[tupel[0]][tupel[1]] === 'D')
		{
            cell_number -= (horizontal.length + 3);
            

			a2 += horizontal[tupel[1]-1];
			a1 += vertikal[tupel[0]-1];
			if (horizontal[tupel[1]-1] === vertikal[tupel[0]-1])
			{
				gaps += "|";
			}
			else
			{
				gaps += ".";
			}
			tupel[0] -= 1;
			tupel[1] -= 1;
		}
		else if (traceback[tupel[0]][tupel[1]] === 'H')
		{
            cell_number -= 1;
            
			a2 += horizontal[tupel[1]-1];
			a1 += "-";
			gaps += ".";
			tupel[1] -= 1;
		}
		else
		{
            cell_number -= (horizontal.length + 2);

			a2 += "-";
			a1 += vertikal[tupel[0]-1];
			gaps += ".";

			tupel[0] -= 1;
		}
        cell[cell_number].style.backgroundColor = "#50C878";
        cell[cell_number].style.fontSize = "1.1rem";
    }

	a1 = reverseString(a1);
	a2 = reverseString(a2);
	gaps = reverseString(gaps);
	
    alignment.innerText += "\n";
    alignment.innerText += "Alignment \n";
	alignment.innerText += a1 + "\n";
    
	alignment.innerText += gaps + "\n";
    
	alignment.innerText += a2 + "\n";	
}

function calculate_optimal_score()
{
    
    const sequence_length = document.getElementById('horizontal').value.length;
    
    const match = document.getElementById('match').value;
    const gap = document.getElementById('gap').value;
    const cell = document.getElementsByClassName('cell');
    const score = cell[cell.length - 1].innerHTML;

    const k = parseInt(document.getElementById('kband').value);
    let optimal = document.getElementById("optimal");

    if(optimal.innerText != "")
    {
        optimal.innerText = "";
    }


    optimal.innerText += "Das Alignment ist ";

    if(parseInt(score) >= parseInt(match) * (parseInt(sequence_length) - parseInt(k) - 1) - 2*(parseInt(k) + 1) * parseInt(gap))
    {
        optimal.innerText += " optimal, da \n";
        optimal.innerText += score + " >= " + match + " * (" + sequence_length + " - " + k + " - " + "1) - 2 * (" + k + " + 1) * " + gap;  
    }
    else
    {
        optimal.innerText += " nicht optimal, da \n";
        optimal.innerText += score + " < " + match + " * (" + sequence_length + " - " + k + " - " + "1) - 2 * (" + k + " + 1) * " + gap;
    }

    




}