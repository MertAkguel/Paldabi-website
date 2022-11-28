// setting up the Algorithm

document.getElementsByClassName('nav-link')[0].className = "nav-link";
document.getElementsByClassName('nav-link')[3].className = "nav-link active dropdown-toggle";

function reverseString(str) {
    return str.split("").reverse().join("");
}
// const element = document.getElementById("form");
// element.addEventListener("keypress", function(event) {
// 	 if (event.key === "Enter") {
//         getMatrix();
//  		event.preventDefault();
//      }
// });
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
    console.log("traceback = ", traceback)
    return traceback;
}

// Initialization of the Needleman-Wunsch algorithm
function initializeNW(traceback)
{
    const matrix = document.getElementsByClassName('cell');
    const sequence1 = document.getElementById('horizontal').value;
    const sequence2 = document.getElementById('vertical').value; 
    
    let counter_h = 1;
    let counter_v = 1;
    const lenh = sequence1.length + 1;
    const lenv = sequence2.length + 1;

    matrix[lenh+2].innerHTML = 0;
    // Initialisierung
    for (let i = lenh + 3; i < lenh * 2 + 2; i++)
    {
        
        traceback[0][counter_h] = 'N';
        matrix[i].innerHTML = 0;
        counter_h++;
    }
    for (let i = 2 * lenh + 3; i <= (lenh + 1) * (lenv + 1); i += lenh + 1)
    {
        
        traceback[counter_v][0] = 'N';
        matrix[i].innerHTML = 0 ;
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
    let counter_h = 1;
    let counter_v = 1;
    //Recurrence:
    const matrix = document.getElementsByClassName('cell');
    
    const lenh = horizontal.length;
    const lenv = vertikal.length;
    
    let start = (lenh+2) * 2 + 2;
    let end = (lenh + 2) * (lenv + 2);
    
    for (let i = start; i < end; i += lenh + 2)
    {
        
        for (let j = 0; j < lenh; ++j)
        {
            
            if (horizontal[counter_h - 1] === vertikal[counter_v - 1])
            {
                
                if (parseInt(matrix[i-lenh-3+j].innerHTML) + parseInt(match) >= parseInt(matrix[i-lenh-2+j].innerHTML) + parseInt(gap) && parseInt(matrix[i-lenh-3+j].innerHTML) + parseInt(match) >= parseInt(matrix[i-1+j].innerHTML) + parseInt(gap) && parseInt(matrix[i-lenh-3+j].innerHTML) + parseInt(match) > 0)
                {
                    
                    matrix[i+j].innerHTML = parseInt(matrix[i-lenh-3+j].innerHTML) + parseInt(match);
                    traceback[counter_v][counter_h] = 'D';
                }
                else if (parseInt(matrix[i-lenh-2+j].innerHTML) + parseInt(gap) > parseInt(matrix[i-lenh-3+j].innerHTML) + parseInt(match) && parseInt(matrix[i-lenh-2+j].innerHTML) >= parseInt(matrix[i-1+j].innerHTML) + parseInt(gap) && parseInt(matrix[i-lenh-2+j].innerHTML) + parseInt(gap) > 0)
                {
                    matrix[i+j].innerHTML = parseInt(matrix[i-lenh-2+j].innerHTML) + parseInt(gap);
                    traceback[counter_v][counter_h] = 'V';
                }
                else if (parseInt(matrix[i-1+j].innerHTML) + parseInt(gap) > parseInt(matrix[i-lenh-3+j].innerHTML) + parseInt(match) && parseInt(matrix[i-1+j].innerHTML) + parseInt(gap) > parseInt(matrix[i-lenh-2+j].innerHTML) + parseInt(gap) && parseInt(matrix[i-1+j].innerHTML) + parseInt(gap) > 0)
                {
                    matrix[i+j].innerHTML = parseInt(matrix[i-1+j].innerHTML) + parseInt(gap);
                    traceback[counter_v][counter_h] = 'H';
                }
                else
                {
                    matrix[i+j].innerHTML = 0;
                }
               
            }
            else
            {
                
                if (parseInt(matrix[i-lenh-3+j].innerHTML) + parseInt(mismatch) >= parseInt(matrix[i-lenh-2+j].innerHTML) + parseInt(gap) && parseInt(matrix[i-lenh-3+j].innerHTML) + parseInt(mismatch) >= parseInt(matrix[i-1+j].innerHTML) + parseInt(gap) && parseInt(matrix[i-lenh-3+j].innerHTML) + parseInt(mismatch) > 0)
                {
                    
                    matrix[i+j].innerHTML = parseInt(matrix[i-lenh-3+j].innerHTML) + parseInt(mismatch);
                    traceback[counter_v][counter_h] = 'D';
                }
                else if (parseInt(matrix[i-lenh-2+j].innerHTML) + parseInt(gap) > parseInt(matrix[i-lenh-3+j].innerHTML) + parseInt(mismatch) && parseInt(matrix[i-lenh-2+j].innerHTML) >= parseInt(matrix[i-1+j].innerHTML) + parseInt(gap) && parseInt(matrix[i-lenh-2+j].innerHTML) + parseInt(gap) > 0)
                {
                    matrix[i+j].innerHTML = parseInt(matrix[i-lenh-2+j].innerHTML) + parseInt(gap);
                    traceback[counter_v][counter_h] = 'V';
                }
                else if (parseInt(matrix[i-1+j].innerHTML) + parseInt(gap) > parseInt(matrix[i-lenh-3+j].innerHTML) + parseInt(mismatch) && parseInt(matrix[i-1+j].innerHTML) + parseInt(gap) > parseInt(matrix[i-lenh-2+j].innerHTML) + parseInt(gap) && parseInt(matrix[i-1+j].innerHTML) + parseInt(gap) > 0)
                {
                    matrix[i+j].innerHTML = parseInt(matrix[i-1+j].innerHTML) + parseInt(gap);
                    traceback[counter_v][counter_h] = 'H';
                }
                else
                {
                    matrix[i+j].innerHTML = 0;
                }
               
            }
            
            counter_h++;
        }
        counter_v++;
        counter_h = 1;
    }
    
}
var max_element_positions = [0, 0]; // horizontal, vertikal
var max_position = 0;
function getscore()
{

    const score = document.getElementById('score');
    const cell = document.getElementsByClassName('cell');
    const horizontal = document.getElementById('horizontal').value;
    //const vertikal = document.getElementById('vertical').value;
    var max_element = 0;
    
    //const product = (horizontal.length + 2) * (vertikal.length + 2);
    for(let i = 0; i < cell.length; ++i)
    {
        if(parseInt(cell[i].innerHTML) > max_element)
        {
            max_element = parseInt(cell[i].innerHTML);
            max_element_positions[0] = parseInt(cell[i].innerHTML) % (horizontal.length + 2);
            max_position = i;
        }
        max_element_positions[0] = max_position % (horizontal.length + 2) - 1;
        max_element_positions[1] = parseInt(max_position / (horizontal.length + 2)) - 1;
        
    }
    // console.log("horizontal", "vertikal")
    // console.log(max_element_positions);
    // console.log(max_position);
    score.innerText = "Score: " + max_element;
    

}
function computeNW()
{
    traceback = [];
    traceback = fillN(traceback);
   
    
    
    initializeNW(traceback);
    buildNW(traceback);
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
    
    buildMatrix();
    setMatrix();
    computeNW();
    get_Alignment();
    
}


function get_Alignment(a1="", a2="",gaps="")
{
    const cell = document.getElementsByClassName('cell');
    var alignment = document.getElementById('alignment');
	if(alignment.innerText != "")
    {
        alignment.innerText = "";
    }
	var horizontal = document.getElementById('horizontal').value;
	
	var vertikal = document.getElementById('vertical').value;

    var cell_number = max_position;
    cell[cell_number].style.backgroundColor = "#198754";
    cell[cell_number].style.fontSize = "1.1rem";

	let tupel = [max_element_positions[1], max_element_positions[0]];

	while(traceback[tupel[0]][tupel[1]] != 'N')
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
            cell_number -= (vertikal.length + 2);

			a2 += "-";
			a1 += vertikal[tupel[0]-1];
			gaps += ".";

			tupel[0] -= 1;
		}
        console.log(tupel);
        // console.log("cell_number = ", cell_number)
        cell[cell_number].style.backgroundColor = "#198754";
        cell[cell_number].style.fontSize = "1.1rem";
    }

	a1 = reverseString(a1);
	a2 = reverseString(a2);
	gaps = reverseString(gaps);
	

    
    wrap = document.getElementById('wrap');
    alignment.innerText += "\n";
    alignment.innerText += "Alignment \n";
	alignment.innerText += a1 + "\n";
    
	alignment.innerText += gaps + "\n";
    
	alignment.innerText += a2 + "\n";
    
    alignment.style.pos
    
	
}

