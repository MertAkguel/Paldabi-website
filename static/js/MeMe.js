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
    constructor(profile_matrix, sequences)
    {
        this.profile_matrix = profile_matrix;
        this.sequences = sequences;
    }
    
    get_startverteilung()
    {
        let startverteilung = [];
        for(let i = 0; i < this.profile_matrix.length; ++i)
        {
            startverteilung.push(parseFloat(this.profile_matrix[i][0]));
        }
        return startverteilung;

    }

 
    
    build_w_matrix(motiv_length)
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
                        motiv *= this.profile_matrix[0][z + 1];
                    }
                    else if(this.sequences[x][y + z] == 'C')
                    {
                        motiv *= this.profile_matrix[1][z + 1]
                    }
                    else if(this.sequences[x][y + z] == 'G')
                    {
                        motiv *= this.profile_matrix[2][z + 1]
                    }
                    else if(this.sequences[x][y + z] == 'T')
                    {
                        motiv *= this.profile_matrix[3][z + 1]
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
    p_strich()
    {
        let p_strich_matrix_start = [];
        
        for(let x = 1; x < this.profile_matrix[0].length; ++x)
        {
            let row = [];
            for(let y = 0; y < this.profile_matrix.length; ++y)
            {
                row.push(parseFloat(this.profile_matrix[y][x]));
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
        result = startverteilung + result;
        console.log(result);
        return transpose(result);
    }
    // summe = []
    // for i in range(len(p_strich_matrix)):
    //     summe.append(np.sum(p_strich_matrix[i]))
    // result = []
    // for x in range(len(p_strich_matrix)):
    //     zeile = []
    //     for y in range(len(p_strich_matrix[x])):
    //         zeile.append(p_strich_matrix[x][y] / summe[x])
    //     result.append(zeile)
    // result = [startverteilung] + result
    // return np.array(result).transpose()
   
}





    



function runMeMe()
{
    let profile_matrix = read_profile();
    const motiv_length = profile_matrix[0].length - 1;
    const sequences = read_sequences();

    
    let meme = new MeMe(profile_matrix, sequences);
    const startverteilung = meme.get_startverteilung();
    const w_matrix = meme.build_w_matrix(motiv_length);
    
    document.getElementById("w_matrix").value = String(w_matrix).split(",").join(" ");
    const p = meme.p_strich();
    
    const strich_p = meme.get_p_strich(motiv_length, w_matrix, p);
   
    profile_matrix = meme.get_new_p_matrix(strich_p, startverteilung);
    console.log(profile_matrix);

    
}