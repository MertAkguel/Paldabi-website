document.getElementsByClassName('nav-link')[0].className = "nav-link";
document.getElementsByClassName('nav-link')[4].className = "nav-link active";

let matrix = "";
document.getElementById('matrix').addEventListener('change', function() {


    let GetFile = new FileReader();
  
    GetFile .onload=function(){
    matrix = GetFile.result;
    console.log(matrix);
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
    console.log(matrix);
    console.log(matrix[0].length);
    for(let i = 0; i < matrix[0].length; ++i)
    {console.log(i);
        if(matrix[0][i] == valA)
        {
            valA_index = i;
        }
        if(matrix[0][i] == valB)
        {
            valB_index = i;
        }
    }
    console.log(valA_index, valB_index);
    return parseInt(matrix[valA_index + 1][valB_index]);


}




















function generateNeighborhoods()
{
    matrix = load_matrix(matrix);
    
}