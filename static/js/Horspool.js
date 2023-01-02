document.getElementsByClassName('nav-link')[0].className = "nav-link";
document.getElementsByClassName('nav-link')[5].className = "nav-link active";


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

    for(let k = 0; k < temp_vec.length; ++k)
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

function alignCheck_(text_pos)
{
    align_tests = new Array();
    align_tests.push(text_pos);
    return align_tests;
}

function getHits(pattern, text)
{
    let hits = new Array();
    if (text.length === 0)
    {
        return hits;
    }

    let temps = new Array();
    let pos = 0;

    const n = text.size();
    const m = pattern.size();


    while (pos <= (n - m)) {
        let j = (m - 1);
        alignCheck_(pos);
        temps.push(pos);

        while (j > 0 &&
               (text[pos + j] == this->getPattern()[j] || (this->getPattern()[j] == '?') || text[pos + j] == '?')) {

            j--;
        }
        if (j == 0) {

            hits.push_back(pos);
        }

        pos += this->getShift_(text[pos + (m - 1)]);


    }

    return hits;

}





function getHorspool()
{
    const pattern = document.getElementById('pattern').value;
    const text = document.getElementById('text').value;
   
    const shift_table = setPattern(pattern);
   
}





