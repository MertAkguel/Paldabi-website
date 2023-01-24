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
    constructor(sequences, motiv_len, iterations, threshold)
    {   
        this.sequences = sequences;
        this.motiv_len = motiv_len;
        this.iterations = iterations;
        this.droppedSequence = "";
        this.randomIndex = 0;
        this.countMatrix;
        this.profileMatrix;
        this.droppedStartPosition;
        this.startPositions = [];// = Array(sequences.length);
        this.baseToNumber = {"A": 0, "C": 1, "G": 2, "T": 3};
        this.distribution = new Array();

    }

    selectAndDropSequence()
    {
        this.randomIndex = 1//Math.round(Math.random() * this.sequences.length);
        this.droppedSequence = this.sequences.splice(this.randomIndex, 1)[0];
        this.droppedStartPosition = this.startPositions.splice(this.randomIndex, 1)[0];
        
       
    }
    determineStartPositions()
    {
        
        for(let i = 0; i < this.sequences.length; ++i)
        {
            
           
            this.startPositions.push(Math.round(Math.random() * (this.sequences[0].length - this.motiv_len)));
        }
        
    }
    createCountMatrix()
    {
       
        this.countMatrix = Array.from({length: 4}, () => Array(parseInt(this.motiv_len)).fill(1)); // 4 because of DNA and 1 because of adding Pseodo-Counts
        
        for(let x = 0; x < this.motiv_len; ++x)
        {
            
            for(let y = 0; y < this.sequences.length; ++y)
            {
                
                
                ++this.countMatrix[this.baseToNumber[this.sequences[y][this.startPositions[y] + x]]][x];
                
            }  
        }
    }
    createProfileMatrix()
    {
        this.profileMatrix = Array.from({length: 4}, () => Array(parseInt(this.motiv_len)).fill(1));
        for(let x = 0; x < this.profileMatrix.length; ++x)
        {
            
            for(let y = 0; y < this.profileMatrix.length; ++y)
            {
                
                this.profileMatrix[x][y] = (this.countMatrix[x][y] / (this.sequences.length + 1));
                
            }
           
        }
    }
    getDistribution()
    {
        for(let x = 0; x < (this.droppedSequence.length - this.motiv_len + 1); ++x)
        {
            
            let s_i = 1;
            for(let y = 0; y < this.motiv_len; ++y)
            {
                s_i *= this.profileMatrix[this.baseToNumber[this.droppedSequence[x+y]]][y];
            }
            this.distribution.push(s_i);
        }

    }
    normalizeDistribution()
    {
        let sum = 0;
        for(let k = 0; k < this.distribution.length; ++k)
        {
            sum += this.distribution[k];
        }
        for(let k = 0; k < this.distribution.length; ++k)
        {
            this.distribution[k] /= sum;
        }
    }
    adjustStartPosition()
    {
        // this.startPositions = [this.droppedStartPosition].concat(this.startPositions);
        this.startPositions.splice(this.randomIndex, 0, this.droppedStartPosition)
        this.sequences.splice(this.randomIndex, 0, this.droppedSequence)
        // this.sequences = [this.droppedSequence].concat(this.sequences);
        let max_index = 0;
        for(let k = 1; k < this.distribution.length; ++k)
        {
            if(this.distribution[max_index] < this.distribution[k])
            {
                max_index = k;
            }
        }
        this.startPositions[this.randomIndex] = max_index;
        
    }

    plot()
    {
        document.getElementById('chart_parent').style.backgroundColor = "#288750";

        let x_labels = []
        for(let k = 0; k < this.distribution.length; ++k)
        {
            x_labels.push(k + 1);
        }


        // Data for the chart
        let data = [{
            x: x_labels,
            y: this.distribution,
            type: 'bar',
            marker: {
                color: '#00e676',
                line: {
                    color: '#008000',
                    width: 2
                }
            }
        }];

        // Layout for the chart
        let layout = {
            title: 'Probability distribution',
            xaxis: {
                title: 'Startpositions',
                tickfont: {
                    family: 'Arial, sans-serif',
                    size: 14,
                    color: '#008000'
                }
            },
            tickmode: 'auto',
            yaxis: {
                title: 'Probabilty',
                tickfont: {
                    family: 'Arial, sans-serif',
                    size: 14,
                    color: '#008000'
                }
            },
            barmode: 'group',
            bargap: 0.1,
            bargroupgap: 0.3,
            showlegend: false,
            paper_bgcolor: '#F0F0F0',
            plot_bgcolor: '#F0F0F0'
            
        };
        this.distribution = [];

        // Plot the chart
        Plotly.newPlot('chart', data, layout);
        
    }
    getMotiv()
    {
        const output = document.getElementById('output');
        const textarea = document.createElement("textarea");
        textarea.innerHTML = "Das Bindungsmotiv ist wahrscheinlich: ";
        output.appendChild(textarea);
        let bindungsmotiv = "";
        for(let z = 0; z < this.motiv_len; ++z)
        {
            let temp = {"A": 0, "C": 0, "G": 0, "T": 0};
            for(let x = 0; x < this.sequences.length; ++x)
            {
                ++temp[this.sequences[x][this.startPositions[x] + z]];      
            }
            bindungsmotiv += Object.keys(temp).reduce((a, b) => temp[a] > temp[b] ? a : b);
        }
        textarea.innerHTML += bindungsmotiv;
        
    }

    compute()
    {
        this.determineStartPositions();
        console.log("this.startpositions = ", this.startPositions);
        console.log("this.sequences = ", this.sequences);
        for(let i = 0; i < this.iterations; ++i)
        {
            this.selectAndDropSequence();
            this.createCountMatrix();
            this.createProfileMatrix();
            this.getDistribution();
            this.normalizeDistribution();
            this.plot();
            this.adjustStartPosition();
        }
       
        this.getMotiv();
        console.log("this.sequences = ", this.sequences);
        console.log("this.droppedSequence = ", this.droppedSequence);
        console.log("this.startpositions = ", this.startPositions);
        console.log(this.countMatrix);
        console.log(this.profileMatrix);
        console.log("this.distribution = ", this.distribution);

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