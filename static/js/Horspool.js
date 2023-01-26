document.getElementsByClassName('nav-link')[0].className = "nav-link";
document.getElementsByClassName('nav-link')[6].className = "nav-link active dropdown-toggle";


function setPattern(pattern)
{
    const m = pattern.length;

    let shift_table = {};
    let temp_vec = new Array(m);

    for(let i = 0; i < m; ++i)
    {
        temp_vec[i] = m;
        shift_table[pattern[i]] = m;
    }
    
    for(let j = 0; j < (m - 1); ++j)
    {
        temp_vec[j] -= (j + 1);
    }

    for(let k = 0; k < temp_vec.length - 1; ++k)
    {
        shift_table[pattern[k]] = temp_vec[k];
    }
    if(shift_table['?'])
    {
        for(const elem of Object.entries(shift_table))
        {
            if(shift_table[elem[0]] > shift_table['?'])
            {
                shift_table[elem[0]] = shift_table['?'];
            }
        }
    }
    return shift_table;
}



function getHits(pattern, text, shift_table)
{
    let hits = new Array();
    if (text.length === 0)
    {
        alert("You have to give us a text")
        return hits;
    }

    let shift_positions = new Array();
    let pos = 0;

    const n = text.length;
    const m = pattern.length;


    while (pos <= (n - m)) {
        let j = (m - 1);
        
        shift_positions.push(pos);

        while (j > 0 && (text[pos + j] == pattern[j] || (pattern[j] == '?') || text[pos + j] == '?')) 
        {

            j--;
        }
        if (j === 0) 
        {

            hits.push(pos);
        }

        pos += getShift(shift_table, text[pos + (m - 1)], pattern);
        

    }

    return [hits, shift_positions];

}

function print_get_hits(hits_and_shift_positions)
{
    let horspool = document.getElementById('horspool');
    
    if(horspool.innerHTML != "")
    {
        horspool.innerHTML = "";
    }

    horspool.innerHTML += `<span class="output_title_horspool">Shifts: </span> `;
    for(let x = 0;  x < hits_and_shift_positions[1].length; ++x) {
    horspool.innerHTML += `<span class="shift">${hits_and_shift_positions[1][x]}</span> `;
    }
    horspool.innerHTML += "<br><br>";
    horspool.innerHTML += `<span class="output_title_horspool">Occurrences: </span> `;
    for(let y = 0;  y < hits_and_shift_positions[0].length; ++y) {
    horspool.innerHTML += `<span class="occurrence">${hits_and_shift_positions[0][y]}</span> `;
    }
}


function getHorspool()
{
    const pattern = document.getElementById('pattern').value;
    const text = document.getElementById('text').value;
   
    const shift_table = setPattern(pattern);
    const hits_and_shift_positions = getHits(pattern, text, shift_table);
    print_get_hits(hits_and_shift_positions);

  
    
}

function getShift(shift_table, last_char, pattern)
{
    if(check_in_pattern(pattern, last_char))
    {
        
        return shift_table[last_char];
    }
    else
    {

        if(check_in_pattern('?'))
        {
            return shift_table['?'];
        }
        return pattern.length;
    }

}

function check_in_pattern(pattern, last_char)
{
    for (let idx = 0; idx < pattern.length; ++idx)
    {
        
        if (last_char === pattern[idx]) 
        {
            return true;
        }
    }
    return false;
}



