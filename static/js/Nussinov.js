document.getElementsByClassName('nav-link')[0].className = "nav-link";
document.getElementsByClassName('nav-link')[2].className = "nav-link active";

const element = document.getElementById("form");
element.addEventListener("keypress", function(event) {
	 if (event.key === "Enter") {
        getMatrix();
 		event.preventDefault();
     }
});

function buildMatrix()
{
    
    const sequence = document.getElementById('sequence').value;
    if(document.getElementById('rna') != "")
    {
        delete_matrix();
    }

    if(sequence.length === 0)
    {
        return;
    }
    const s_length = sequence.length + 1;
    
    const product = s_length * s_length;
    const matrix = document.getElementById('matrix');
    for(let i = 0; i < product; i++)
    {
        let cell = document.createElement('button');
        
        cell.className = "cell";
        cell.innerHTML = 0;
        matrix.appendChild(cell);

    }
    
    matrix.style.setProperty('grid-template-columns', `repeat(${s_length}, 40px)`);
    matrix.style.setProperty('grid-template-rows',`repeat(${s_length}, 40px)`);
    
}

function setMatrix()
{
    const sequence = document.getElementById('sequence').value;

    const cell = document.getElementsByClassName('cell');
    // filling first row with sequence1 input
    
    for(let i = 0; i < sequence.length; i++)
    {
        cell[i+1].innerHTML = sequence[i];
    }
    // filling first column with sequence2 input
    
    for(let j = 0; j < sequence.length; j++)
    {
        cell[(sequence.length+1)*(j+1)].innerHTML = sequence[j];
    }
}

function delta(seq1, seq2)
{
    var score = 0;
    if(seq1 == 'U' && seq2 == 'A')
    {
        ++score;
    }
        
    else if(seq1 == 'A' && seq2 == 'U')
    {
        ++score;
    }
    else if(seq1 == 'C' && seq2 == 'G')
    {
        ++score;
    }
   
    else if(seq1 == 'G' && seq2 == 'C')
    {
        ++score;
    }
       
    return score;
}

function buildNussinov()
{
    const cell = document.getElementsByClassName('cell');
    cell[0].innerHTML = " ";
    const sequence = document.getElementById('sequence').value;
    
    let L = sequence.length;

    let start = L + 3;
    
    let y = 0;
     
    for(let n = start; n < (L + start - 1); ++n)
    {
        let x = 0;
        for(let j = n; j < (cell.length - (L + 1) * (y + 1)); j += L + 2)
        {
            // console.log("x = ", x);
            // console.log("sequence[",x,"] = ", sequence[x]);
            //console.log("j = ", j);
            // console.log("n = ", n);
            // console.log("L = ", L);
            var case1 = parseInt(cell[j + L].innerHTML) + delta(sequence[x], sequence[x + 1 + y]);
            //console.log("sequence[i] = ", sequence[x], "sequence[j] = ", sequence[x + 1 + y]);
            var case2 = parseInt(cell[j + L + 1].innerHTML); 
            var case3 = parseInt(cell[j - 1].innerHTML);
            var case4 = 0;
            
            if(y > 2)
            {
                //max_element_positions[1] = parseInt(max_position / (horizontal.length + 2)) - 1;
                // j - parseInt(j/(L + 1)) - y + 1
                let p = j + (L + 1) * 2;
                // console.log("y = ", y);
                for(let k = start + (L + 2)* x; k < j; ++k)
                {
                    // console.log("p = ", p);
                    // console.log("k = ", k);
                    
                    if(parseInt(cell[k].innerHTML) + parseInt(cell[p].innerHTML) > case4)
                    {
                        case4 = parseInt(cell[k].innerHTML) + parseInt(cell[p].innerHTML);
                    }
                    p += (L + 1);
                }
            }
            //console.log(case1, case2, case3, case4);
            
            cell[j].innerHTML = Math.max(case1, case2, case3, case4);
            
            
            ++x;
            
        }
        ++y;
    }
}

function traceback(cell_number, rna_structure)
{
    const cell = document.getElementsByClassName('cell');
    const sequence = document.getElementById('sequence').value;
    const L = sequence.length;

    let start = L + 3;
    
    var x = parseInt(cell_number / (L + 1));

    const rna = document.getElementById('rna');

    if(rna.innerText != "")
    {
        rna.innerText = "";
    }

    if(parseInt(cell_number / (L + 1) - 1) <= cell_number % (L + 1) - 1)
    {
        
        if(parseInt(cell[cell_number].innerHTML) == parseInt(cell[cell_number + L + 1].innerHTML))
        {
            rna_structure[parseInt(cell_number / (L + 1) - 1)] = ".";
            cell_number += L + 1;
            cell[cell_number].style.backgroundColor = "#50C878";
            cell[cell_number].style.fontSize = "1.1rem";
            
            
            traceback(cell_number, rna_structure)
        }
        else if(parseInt(cell[cell_number].innerHTML) == parseInt(cell[cell_number - 1].innerHTML))
        {
            rna_structure[cell_number % (L + 1) - 1] = ".";
            cell_number -= 1;
            cell[cell_number].style.backgroundColor = "#50C878";
            cell[cell_number].style.fontSize = "1.1rem";
            
            
            
            traceback(cell_number, rna_structure)
        }
        
        else if(parseInt(cell[cell_number].innerHTML) == parseInt(cell[cell_number + L].innerHTML) + delta(sequence[parseInt(cell_number / (L + 1)) - 1], sequence[cell_number % (L + 1) - 1]))
        {
            rna_structure[parseInt(cell_number / (L + 1) - 1)] = "(";
            rna_structure[cell_number % (L + 1) - 1] = ")";
            cell_number += L;
            cell[cell_number].style.backgroundColor = "#50C878";
            cell[cell_number].style.fontSize = "1.1rem";
            
            
            
            traceback(cell_number, rna_structure)
        }
        
        else
        {
            
            var x = parseInt(cell_number / (L + 1));
            let p = cell_number + (L + 1) * 2;
            
            for(let k = start + (L + 2) * (x - 1); k < cell_number; ++k)
            {
                console.log("k = ", k);
                if(parseInt(cell[cell_number].innerHTML) == parseInt(cell[p].innerHTML) + parseInt(cell[k].innerHTML))
                {   
                    console.log("k = ", k);
                    cell[p].style.backgroundColor = "#50C878";
                    cell[p].style.fontSize = "1.1rem";
                    cell[k].style.backgroundColor = "#50C878";
                    cell[k].style.fontSize = "1.1rem";
                    
                    traceback(p, rna_structure);
                    traceback(k, rna_structure);
                    
                }
                p += (L + 1);
            }
        }  
    }
    
    cell[L * 2 + 1].style.backgroundColor = "#50C878";
    cell[L * 2 + 1].style.fontSize = "1.1rem";
}

function delete_matrix()
{
    let cell = document.getElementsByClassName('cell');
    let iteration_laenge = cell.length - 1;
   
    for(let i = iteration_laenge; i >= 0; i--)
    {
        
        cell[i].remove();
    }
    
}



function getMatrix()
{
    
    buildMatrix();
    setMatrix();
    buildNussinov();

    const sequence = document.getElementById('sequence').value;
    const L = sequence.length;
    cell_number = L * 2 + 1;
    rna_structure = Array(L);
    traceback(cell_number, rna_structure);
    rna.className = "rna";
    rna.innerHTML += "RNA-Struktur = ";
    console.log(rna_structure);
    for(let i = 0; i < rna_structure.length; ++i)
    {
        rna.innerHTML += rna_structure[i];
    }
    

}

