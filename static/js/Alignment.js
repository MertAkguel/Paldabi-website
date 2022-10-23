// setting up the Algorithm

document.getElementsByClassName('nav-link')[0].className = "nav-link";
document.getElementsByClassName('nav-link')[1].className = "nav-link active";

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
    
    matrix.style.setProperty('grid-template-columns', `repeat(${s1_length}, 60px)`);
    matrix.style.setProperty('grid-template-rows',`repeat(${s2_length}, 60px)`);
    
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
    const gapscore = document.getElementById('gap').value;
    let counter_h = 1;
    let counter_v = 1;
    const lenh = sequence1.length + 1;
    const lenv = sequence2.length + 1;

    matrix[lenh+2].innerHTML = 0;
    // Initialisierung
    for (let i = lenh + 3; i < lenh * 2 + 2; i++)
    {
        
        traceback[0][counter_h] = 'H';
        matrix[i].innerHTML = (counter_h) * parseInt(gapscore);
        counter_h++;
    }
    for (let i = 2 * lenh + 3; i <= (lenh + 1) * (lenv + 1); i += lenh + 1)
    {
        
        traceback[counter_v][0] = 'V';
        matrix[i].innerHTML = (counter_v) * parseInt(gapscore);
        counter_v++;
    }
    traceback[0][0] = 'N';
}
function buildNW(traceback)
{
    const sequence1 = document.getElementById('horizontal').value;
    const sequence2 = document.getElementById('vertical').value; 
    const match = document.getElementById('match').value;
    const mismatch = document.getElementById('mismatch').value;
    const gap = document.getElementById('gap').value;
    let counter_h = 1;
    let counter_v = 1;
    //Recurrence:
    const matrix = document.getElementsByClassName('cell');
    const horizontal = sequence1;
    const vertikal = sequence2;
    const lenh = sequence1.length;
    const lenv = sequence2.length;
    
    let start = (lenh+2) * 2 + 2;
    let end = (lenh + 2) * (lenv + 2);
    
    for (let i = start; i < end; i += lenh + 2)
    {
        
        for (let j = 0; j < lenh; j++)
        {
            
            if (horizontal[counter_h - 1] === vertikal[counter_v - 1])
            {
                //console.log("if-fall", "i = ", i, "j = ", j)
                if (parseInt(matrix[i-lenh-3+j].innerHTML) + parseInt(match) >= parseInt(matrix[i-lenh-2+j].innerHTML) + parseInt(gap) && parseInt(matrix[i-lenh-3+j].innerHTML) + parseInt(match) >= parseInt(matrix[i-1+j].innerHTML) + parseInt(gap))
                {
                    
                    matrix[i+j].innerHTML = parseInt(matrix[i-lenh-3+j].innerHTML) + parseInt(match);
                    traceback[counter_v][counter_h] = 'D';
                }
                else if (parseInt(matrix[i-lenh-2+j].innerHTML) + parseInt(gap) > parseInt(matrix[i-lenh-3+j].innerHTML) + parseInt(match) && parseInt(matrix[i-lenh-2+j].innerHTML) >= parseInt(matrix[i-1+j].innerHTML) + parseInt(gap))
                {
                    matrix[i+j].innerHTML = parseInt(matrix[i-lenh-2+j].innerHTML) + parseInt(gap);
                    traceback[counter_v][counter_h] = 'V';
                }
                else if (parseInt(matrix[i-1+j].innerHTML) + parseInt(gap) > parseInt(matrix[i-lenh-3+j].innerHTML) + parseInt(match) && parseInt(matrix[i-1+j].innerHTML) + parseInt(gap) > parseInt(matrix[i-lenh-2+j].innerHTML) + parseInt(gap))
                {
                    matrix[i+j].innerHTML = parseInt(matrix[i-1+j].innerHTML) + parseInt(gap);
                    traceback[counter_v][counter_h] = 'H';
                }
               
            }
            else
            {
                //console.log("else-fall", "i = ", i, "j = ", j)
                if (parseInt(matrix[i-lenh-3+j].innerHTML) + parseInt(mismatch) >= parseInt(matrix[i-lenh-2+j].innerHTML) + parseInt(gap) && parseInt(matrix[i-lenh-3+j].innerHTML) + parseInt(mismatch) >= parseInt(matrix[i-1+j].innerHTML) + parseInt(gap))
                {
                    
                    matrix[i+j].innerHTML = parseInt(matrix[i-lenh-3+j].innerHTML) + parseInt(mismatch);
                    traceback[counter_v][counter_h] = 'D';
                }
                else if (parseInt(matrix[i-lenh-2+j].innerHTML) + parseInt(gap) > parseInt(matrix[i-lenh-3+j].innerHTML) + parseInt(mismatch) && parseInt(matrix[i-lenh-2+j].innerHTML) >= parseInt(matrix[i-1+j].innerHTML) + parseInt(gap))
                {
                    matrix[i+j].innerHTML = parseInt(matrix[i-lenh-2+j].innerHTML) + parseInt(gap);
                    traceback[counter_v][counter_h] = 'V';
                }
                else if (parseInt(matrix[i-1+j].innerHTML) + parseInt(gap) > parseInt(matrix[i-lenh-3+j].innerHTML) + parseInt(mismatch) && parseInt(matrix[i-1+j].innerHTML) + parseInt(gap) > parseInt(matrix[i-lenh-2+j].innerHTML) + parseInt(gap))
                {
                    matrix[i+j].innerHTML = parseInt(matrix[i-1+j].innerHTML) + parseInt(gap);
                    traceback[counter_v][counter_h] = 'H';
                }
               
            }
            
            counter_h++;
        }
        counter_v++;
        counter_h = 1;
    }
    
}
function getscore()
{
    const score = document.getElementById('score');
    const cell = document.getElementsByClassName('cell');
    console.log(cell.length);
    score.value = "Score: " + cell[cell.length - 1].innerHTML;
}
function computeNW()
{
    traceback = [];
    traceback = fillN(traceback);
    console.log("traceback = ", traceback)
    
    
    initializeNW(traceback);
    buildNW(traceback);
    getscore();
}

function delete_matrix()
{
    let cell = document.getElementsByClassName('cell');
    let iteration_laenge = cell.length - 1;
    console.log(iteration_laenge);
    let c = 0;
    for(let i = iteration_laenge; i >= 0; i--)
    {
        c++;
        cell[i].remove();
    }
    console.log("c = ", c);
}

function getMatrix()
{
    
    buildMatrix();
    setMatrix();
    computeNW();
    
}