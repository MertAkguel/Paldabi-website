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

function get_startverteilung(profile_matrix)
{
    var startverteilung = [];
    for(let i = 0; i < profile_matrix.length; ++i)
    {
        startverteilung.push(parseFloat(profile_matrix[i][0]));
    }
    return startverteilung;

}
function sum(arr) {
    return arr.reduce(function (a, b) {
       return a + b;
    }, 0);
 }
 
    
function build_w_matrix(sequences, profile_matrix, motiv_length)
{
    let w_matrix = [];
    for(let x = 0; x < sequences.length; ++x)
    {
        values = [];
        for(let y = 0; y < (sequences[x].length - motiv_length + 1); ++y)
        {
            motiv = 1;
            for(let z = 0; z < motiv_length; ++z)
            {
                if(sequences[x][y + z] == 'A')
                {
                    motiv *= profile_matrix[0][z + 1];
                }
                else if(sequences[x][y + z] == 'C')
                {
                    motiv *= profile_matrix[1][z + 1]
                }
                else if(sequences[x][y + z] == 'G')
                {
                    motiv *= profile_matrix[2][z + 1]
                }
                else if(sequences[x][y + z] == 'T')
                {
                    motiv *= profile_matrix[3][z + 1]
                }
            }
            values.push(motiv);
        }
        summe = sum(values);
        
        for(let i = 0; i < values.length; ++i)
        {   
            values[i] = values[i] / summe;
        }
        w_matrix.push(values);
    }
    return w_matrix;
}


        
    



function runMeMe()
{
    const profile_matrix = read_profile();
    const motiv_length = profile_matrix[0].length - 1;
    const sequences = read_sequences();

    const startverteilung = get_startverteilung(profile_matrix);
    
    w_matrix = build_w_matrix(sequences, profile_matrix, motiv_length);
    
}