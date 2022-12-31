document.getElementsByClassName('nav-link')[0].className = "nav-link";
document.getElementsByClassName('nav-link')[1].className = "nav-link active";



document.getElementById('profile_file').addEventListener('change', function() {


    let GetFile = new FileReader();
  
     GetFile .onload=function(){
    document.getElementById('output_profile').value= GetFile.result;
  }
      
      GetFile.readAsText(this.files[0]);
      
})

  

  document.getElementById('sequences_file').addEventListener('change', function() {


    let GetFile = new FileReader();
  
     GetFile .onload=function(){
    
    document.getElementById('output_sequences').value= GetFile.result;
    
  
  }
      
      GetFile.readAsText(this.files[0]);
})



function read_profile()
{
    const profile = document.getElementById('output_profile').value;
    if(profile === "")
    {
        alert("You have to give us your profile of the bases");
        return;
    }
    let profile_matrix = profile.split("\n");
    for(let i = 0; i < profile_matrix.length; ++i)
    {
        profile_matrix[i] = profile_matrix[i].split(" ");
        profile_matrix[i] = profile_matrix[i].filter(function(value){ 
            return value > " ";
        });
    }
    return profile_matrix;
   
}

function read_sequences()
{
    const sequences_file = document.getElementById('output_sequences').value;
    if(sequences_file === "")
    {
        alert("You have to give us your seqeunces");
        return;
    }
    let sequences = sequences_file.split("\n"); 
    return sequences;
   
}
function sum(arr) {
    return arr.reduce(function (a, b) {
       return a + b;
    }, 0);
}
function transpose(arr) {
    const transposed = [];
    arr[0].forEach((col, i) => {
      transposed.push(arr.map(row => row[i]));
    });
    return transposed;
  }

class MeMe 
{
    constructor(sequences)
    {   
        this.sequences = sequences;
    }
    
    get_startverteilung(profile_matrix)
    {
        let startverteilung = [];
        for(let i = 0; i < profile_matrix.length; ++i)
        {
            startverteilung.push(parseFloat(profile_matrix[i][0]));
        }
        return startverteilung;

    }

 
    
    build_w_matrix(motiv_length, profile_matrix)
    {
        let w_matrix = [];
        for(let x = 0; x <  this.sequences.length; ++x)
        {
            let values = [];
            for(let y = 0; y < (this.sequences[x].length - motiv_length + 1); ++y)
            {
                let motiv = 1;
                for(let z = 0; z < motiv_length; ++z)
                {
                    if(this.sequences[x][y + z] == 'A')
                    {
                        motiv *= profile_matrix[0][z + 1];
                    }
                    else if(this.sequences[x][y + z] == 'C')
                    {
                        motiv *= profile_matrix[1][z + 1]
                    }
                    else if(this.sequences[x][y + z] == 'G')
                    {
                        motiv *= profile_matrix[2][z + 1]
                    }
                    else if(this.sequences[x][y + z] == 'T')
                    {
                        motiv *= profile_matrix[3][z + 1]
                    }
                }
                values.push(motiv);
            }
            let summe = sum(values);
            
            for(let i = 0; i < values.length; ++i)
            {   
                values[i] = values[i] / summe;
            }
            w_matrix.push(values);
        }
        return w_matrix;
    }

    // die Anfangswerte aus der p-matrix werden in die neue matrix gespeichert
    p_strich(profile_matrix)
    {
        let p_strich_matrix_start = [];
        
        for(let x = 1; x < profile_matrix[0].length; ++x)
        {
            let row = [];
            for(let y = 0; y < profile_matrix.length; ++y)
            {
                row.push(parseFloat(profile_matrix[y][x]));
            }
            
            p_strich_matrix_start.push(row);
        }
        
        return p_strich_matrix_start;
    }
    // p-strich wird für jede sequenz berechnet
    get_p_strich(motiv_length, w_matrix, p_strich)
    {
        let positions = this.sequences[0].length + 1 - motiv_length;
        
        let p_strich_matrix = [].concat(p_strich);
        
        for(let x = 0; x < motiv_length; ++x)
        {
            for(let y = 0; y < this.sequences.length; ++y)
            {
                for(let z = x; z < positions + x; ++z)
                {
                    if(this.sequences[y][z] == 'A')
                    {
                        p_strich_matrix[x][0] += w_matrix[y][z - x];
                    }
                    else if(this.sequences[y][z] == 'C')
                    {
                        p_strich_matrix[x][1] += w_matrix[y][z - x];
                    }
                    else if(this.sequences[y][z] == 'G')
                    {
                        p_strich_matrix[x][2] += w_matrix[y][z - x];
                    }
                    else if(this.sequences[y][z] == 'T')
                    {
                        p_strich_matrix[x][3] += w_matrix[y][z - x];
                    }
                }
            }  
        }
        return p_strich_matrix;
    }
    // die neue p-matrix wird berechnet
    get_new_p_matrix(p_strich_matrix, startverteilung)
    {
        let result = [];
        result.push(startverteilung);

        for(let i = 0; i < p_strich_matrix.length; ++i)
        {
            let row = [];
            let summe = sum(p_strich_matrix[i]);
            
            for(let j = 0; j < p_strich_matrix[i].length; ++j)
            {
                row.push(p_strich_matrix[i][j] / summe)
            }
            result.push(row);
        }

        return transpose(result);
    }
    // das Bindungsmotiv wird ausgegeben indem geguckt wird in welcher Sequenz das Maximum ist
    get_bindungs_motiv(profile_matrix)
    {
        let bindungsmotiv = "";
        profile_matrix = transpose(profile_matrix);
       
        for(let lists = 1; lists < profile_matrix.length; ++lists)
        {
            let max_iter = 0;
            let max_element = profile_matrix[lists][0];
            for(let element = 0; element < profile_matrix[lists].length; ++element)
            {
                if(profile_matrix[lists][element] > max_element)
                {
                    max_iter = element;
                    max_element = profile_matrix[lists][element];
                }
            }
            if (max_iter === 0)
            {
                bindungsmotiv += "A";
            }
            else if( max_iter === 1)
            {
                bindungsmotiv += "C";
            }
            else if(max_iter === 2)
            {
                bindungsmotiv += "G";
            }
            else if(max_iter === 3)
            {
                bindungsmotiv += "T";
            }
        }
        return bindungsmotiv;
    }
}

function runMeMe()
{
    const iterations = parseInt(document.getElementById("iterations").value);
    if(iterations < 1)
    {
        alert("Iterations has to be one or higher");
        return;
    }
    let profile_matrix = read_profile();
    const motiv_length = profile_matrix[0].length - 1;
    const sequences = read_sequences();

    let meme = new MeMe(sequences);
    const startverteilung = meme.get_startverteilung(profile_matrix);
   

    for(let i = 0; i < iterations; ++i)
    {
        const w_matrix = meme.build_w_matrix(motiv_length, profile_matrix);
        const p = meme.p_strich(profile_matrix);
        const strich_p = meme.get_p_strich(motiv_length, w_matrix, p);
        profile_matrix = meme.get_new_p_matrix(strich_p, startverteilung);
    }
    document.getElementById("bindungsmotiv").value = meme.get_bindungs_motiv(profile_matrix);
    
    
}