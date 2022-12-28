document.getElementsByClassName('nav-link')[0].className = "nav-link";
document.getElementsByClassName('nav-link')[4].className = "nav-link active";

let matrix = "";
document.getElementById('matrix').addEventListener('change', function() {


    let GetFile = new FileReader();
  
    GetFile .onload=function(){
    matrix = GetFile.result;
    //console.log(matrix);
  }
      
      GetFile.readAsText(this.files[0]);
      
})

function load_matrix(matrix)
{
    matrix = matrix.split("\n");
    matrix[0] = matrix[0].replace(/ /g, '');

    for(let i = 1; i < matrix[0].length + 1; ++i)
    {
        matrix[i] = matrix[i].replace(/[A-Z]/g , '').split(" ").filter(function(value){return value != ""});
    }


    return matrix;
}


function get_score(matrix, valA, valB)
{
    let valA_index = 0;
    let valB_index = 0;
    // console.log(matrix);
    // console.log(matrix[0].length);
    for(let i = 0; i < matrix[0].length; ++i)
    {
        if(matrix[0][i] == valA)
        {
            valA_index = i;
        }
        if(matrix[0][i] == valB)
        {
            valB_index = i;
        }
    }
    
    return parseInt(matrix[valA_index + 1][valB_index]);
}

function generateNeighborhood(query, matrix, word_size, score_threshold, threads=1)
{
    if (word_size > query.length) 
    {
        let output = [];
        alert("word_size > query.length");
        return output;

    } 
    else if (threads <= 0) 
    {
        alert("Threads can´t be smaller 1");
        return;
    } 
    else if (query.length < 1) 
    {
        alert("Query is to short");
        return;
    }
    let neighborhood = {"infix": new Array(query.length - word_size + 1),
                        "neighborhood": new Array(query.length - word_size + 1)};
    
    const alphabet = "ACDEFGHIKLMNPQRSTVWY";
    let max = 0;


    for (let i = 0; i < alphabet.length; ++i) 
    {
        for (let j = alphabet.length - 1; j >= i; --j) 
        {
            if (get_score(matrix, alphabet[i], alphabet[j]) > max) 
            {
                max = get_score(matrix, alphabet[i], alphabet[j]);
            }
        }
    }

    // Wenn score-threashold zu groß
    if (score_threshold > (max * word_size)) 
    {
        for (let i = 0; i < (query.length - word_size + 1); ++i) 
        {
            neighborhood["infix"][i] = query.substr(i, word_size);
        }
        return neighborhood;
    }

    for (let i = 0; i < (query.length - word_size + 1); ++i) 
    {
        neighborhood["infix"][i] = query.substr(i, word_size);
        let temppair = ["", 0];
        

        //Erstellt die 20^w Permutationen
        for (let j = 0; j < Math.pow(20, word_size); ++j) 
        {
            let help = 0;

            //Bildet den Score von der Permutation und dem Infix
            for (let n = Math.pow(20, (word_size - 1)); n >= 1; n /= 20) 
            {
                temppair[1] += get_score(matrix, neighborhood["infix"][i][help], alphabet[(parseInt(j / n) % 20)]);
                temppair[0] += alphabet[(parseInt(j / n) % 20)];
               
                ++help;
            }
            
            //Prüft ob Treshold größer als errechneter Score ist
            if (temppair[1] >= score_threshold) 
            {
                neighborhood["neighborhood"][i] = temppair;
                
            }
            temppair[0] = "";
            temppair[1] = 0;

        }
    }

    return neighborhood;
}




















function generateNeighborhoods()
{
    matrix = load_matrix(matrix);
    const query = document.getElementById('sequence').value;
    const word_size = parseInt(document.getElementById('word_size').value);
    const score_threshold = parseInt(document.getElementById('threshold').value);
    const threads = parseInt(document.getElementById('thread').value);

    neighborhoods = generateNeighborhood(query, matrix, word_size, score_threshold, threads);
    console.log(neighborhoods);

    
}