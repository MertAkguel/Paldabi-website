document.getElementsByClassName('nav-link')[0].className = "nav-link";
document.getElementsByClassName('nav-link')[5].className = "nav-link active";


document.getElementById('profile_file').addEventListener('change', function() {


    let GetFile = new FileReader();
  
     GetFile .onload=function(){
    document.getElementById('output_profile').value= GetFile.result;
  }
      
      GetFile.readAsText(this.files[0]);
      
})

class Gibbs
{
    constructor(sequences, motiv_len, iterations)
    {   
        this.sequences = sequences;
        this.motiv_len = motiv_len;
        this.iterations = iterations;
        this.droppedSequence = "";
        this.randomIndex = 0;
        this.countMatrix = Array(4).fill(1).map(x => Array(motiv_len).fill(1)); // 4 because of DNA
        this.profileMatrix = Array(4).fill(1).map(x => Array(motiv_len).fill(1)); // 1 because of adding Pseodo-Counts
        this.startPositions = Array(sequences.length);

    }

    selectAndDropSequence()
    {
        this.randomIndex = Math.round(Math.random() * this.sequences.length);
        this.droppedSequence = this.sequences.splice(this.randomIndex);
       
    }
    determineStartPositions()
    {
        for(let i = 0; i < this.startPositions.length; ++i)
        {
            this.startPositions.push(Math.round(Math.random() * this.sequences[0].length - this.motiv_len + 1));
        }
    }
    createCountMatrix()
    {
        let baseToNumber = {"A": 0, "C": 1, "G": 2, "T": 3};
        for(let x = 0; x < this.motiv_len; ++x)
        {
            
            for(let y = 0; y < this.sequences.length; ++y)
            {
                ++this.countMatrix[baseToNumber[this.sequences[y][this.startPositions[x]+x]]][x];
                this.countMatrix;
            }
        }

        

    }
    createProfileMatrix()
    {
        
    }
    getDistribution()
    {

    }
    compute()
    {
        this.selectAndDropSequence();
        this.determineStartPositions();
        this.createCountMatrix();
        console.log(this.countMatrix);

    }
}













function runGibbs()
{
    const sequences = document.getElementById('output_profile').value.split("\n");
    const iterations = document.getElementById('iterations').value;
    const motiv_len = document.getElementById('motiv_len').value;

    let gibbs = new Gibbs(sequences, motiv_len, iterations);
    gibbs.compute();

    
}