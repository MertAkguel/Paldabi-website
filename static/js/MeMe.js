document.getElementsByClassName('nav-link')[0].className = "nav-link";
document.getElementsByClassName('nav-link')[1].className = "nav-link active";

document.getElementById('profile_file').addEventListener('change', function() {


    var GetFile = new FileReader();
  
     GetFile .onload=function(){
    document.getElementById('output_profile').value= GetFile.result;
  }
      
      GetFile.readAsText(this.files[0]);
      
  })

  

  document.getElementById('sequences_file').addEventListener('change', function() {


    var GetFile = new FileReader();
  
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
    var profile_matrix = profile.split("\n");
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
    var sequences = sequences_file.split("\n"); 
    return sequences;
   
}
function sum(arr) {
    return arr.reduce(function (a, b) {
       return a + b;
    }, 0);
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
        var startverteilung = [];
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
            var values = [];
            for(let y = 0; y < (this.sequences[x].length - motiv_length + 1); ++y)
            {
                var motiv = 1;
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
            var summe = sum(values);
            
            for(let i = 0; i < values.length; ++i)
            {   
                values[i] = values[i] / summe;
            }
            w_matrix.push(values);
        }
        return w_matrix;
    }

    # die Anfangswerte aus der p-matrix werden in die neue matrix gespeichert
    p_strich()
    {
        var p_strich_matrix = [];
    }
    
    for x in range(1, len(p_matrix[0])):
        zeile = []
        for y in range(len(p_matrix)):
            zeile.append(p_matrix[y][x])
        p_strich_matrix.append(zeile)
    return np.array(p_strich_matrix)



}




        
    



function runMeMe()
{
    const profile_matrix = read_profile();
    const motiv_length = profile_matrix[0].length - 1;
    const sequences = read_sequences();

    
    let meme = new MeMe(profile_matrix, sequences);
    const startverteilung = meme.get_startverteilung();
    w_matrix = meme.build_w_matrix(motiv_length);
    
}