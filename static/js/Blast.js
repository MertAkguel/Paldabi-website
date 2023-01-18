document.getElementsByClassName('nav-link')[0].className = "nav-link";
document.getElementsByClassName('nav-link')[4].className = "nav-link active";


const element = document.getElementById("form");
element.addEventListener("keypress", function(event) {
	 if (event.key === "Enter") {
        generateNeighborhoods();
 		event.preventDefault();
     }
});

let matrix = "";
document.getElementById('matrix').addEventListener('change', function() {


    let GetFile = new FileReader();
  
    GetFile .onload=function(){
    matrix = GetFile.result;
    
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

function generateNeighborhood(query, matrix, word_size, score_threshold)
{
    if (word_size > query.length) 
    {
        let output = [];
        alert("word_size > query.length");
        return output;

    } 
    else if (query.length < 1) 
    {
        alert("Query is too short");
        return;
    }
    let neighborhood = {"infix": new Array(query.length - word_size + 1),
                        "neighborhood": Array.from({ length: query.length - word_size + 1 }, () => [])};
    
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
                const score = get_score(matrix, neighborhood["infix"][i][help], alphabet[(parseInt(j / n) % 20)]);
                temppair[1] += score;
                temppair[0] += alphabet[(parseInt(j / n) % 20)];
                //running_total += score;
                ++help;
            }
            
            //Prüft ob Treshold größer als errechneter Score ist
            if (temppair[1] >= score_threshold) 
            {
                let copy = Object.assign({}, temppair);
                neighborhood["neighborhood"][i].push(copy);
                
            }
            temppair[0] = "";
            temppair[1] = 0;

        }
    }

    return neighborhood;
}



function printNeighborhoods(neighborhoods) {
    let output = document.getElementById("neighborhood");

    for (let x = 0; x < neighborhoods["infix"].length; ++x) {

        let infix = neighborhoods["infix"][x].padStart(10);
        let neighbors = neighborhoods["neighborhood"][x]
            .map(
            (neighbor) =>
                `<span class="neighborhoods__neighbor">(${neighbor[0]}, ${neighbor[1]})</span>`
            )
            .join("");
    
        output.innerHTML += `
            <div class="neighborhoods">
            <span class="neighborhoods__infix">${infix}:</span>
            ${neighbors}
            </div>
        `;
    }
    
  }




function generateNeighborhoods()
{
    matrix = load_matrix(matrix);
    const query = document.getElementById('sequence').value;
    const word_size = parseInt(document.getElementById('word_size').value);
    const score_threshold = parseInt(document.getElementById('threshold').value);
   
    if (query.length === 0)
    {
        alert("Please enter a sequence");
    }
    else if (word_size === 0)
    {
        alert("Please enter a word_size");
    }
    else if (score_threshold === 0)
    {
        alert("Please enter a score_threshold");
    }
    

    const neighborhoods = generateNeighborhood(query, matrix, word_size, score_threshold);
    
    printNeighborhoods(neighborhoods);
    download(neighborhoods, "BLAST_results.txt", 'text/plain')

    
}

function download(neighborhoods, name, type) 
{
    console.log(neighborhoods);
    let a = document.getElementById("download");
    let text = "";
    for (let x = 0; x < neighborhoods["infix"].length; ++x) {

        text += neighborhoods["infix"][x] + ": ";
        for(let y = 0; y < neighborhoods["neighborhood"][x].length; ++y)
        {
            text += "(" + neighborhoods["neighborhood"][x][y][0] + ", " + neighborhoods["neighborhood"][x][y][1] + ") ";
        }
        text += "\n";

    }
    let file = new Blob([text], {type: type});
    a.href = URL.createObjectURL(file);
    a.download = name;

}