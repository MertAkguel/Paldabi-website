document.getElementsByClassName('nav-link')[0].className = "nav-link";
document.getElementsByClassName('nav-link')[1].className = "nav-link active";

function setmatrix()
{
    const s1_length = document.getElementById('horizontal').value.length + 2;
    const s2_length = document.getElementById('vertical').value.length + 2; 
    const product = s1_length*s2_length;
    const matrix = document.getElementById('matrix');
    for(let i = 0; i < product; i++)
    {
        let cell = document.createElement('button');
        cell.innerHTML = "0";
        cell.className = "cell";
        matrix.appendChild(cell);

    }
    
    matrix.style.setProperty('grid-template-columns', `repeat(${s1_length}, 60px)`);
    matrix.style.setProperty('grid-template-rows',`repeat(${s2_length}, 60px)`);

    
}