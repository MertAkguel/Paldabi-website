document.getElementsByClassName('nav-link')[0].className = "nav-link";
document.getElementsByClassName('nav-link')[6].className = "nav-link active dropdown-toggle";

class FM_Index
{
    constructor(text, pattern)
    {
        this.text = text;
        this.pattern = pattern;
        this.sa = new Array();
        this.bwt = "";
    }
    comparator(x, y) {
        let i = 0;
        while (i < this.text.length) {
            if (this.text[x - i] != this.text[y - i]) {
            return this.text[x - i] - this.text[y - i];
            }
            ++i;
        }
        return y - x;
    }
    
    constructSuffixArray() {
        let suffixes = [];
        for (let i = 0; i < this.text.length; i++) {
            suffixes.push({ index: i, suffix: this.text.substr(i) });
        }
        suffixes.sort((a, b) => a.suffix.localeCompare(b.suffix));
        for (let i = 0; i < suffixes.length; i++) {
            this.sa.push(suffixes[i].index);
        }
       
        
    }
    build_bwt()
    {
        this.constructSuffixArray();
        
        for(let i = 0; i< this.sa.length; ++i)
        {
           
            if(this.sa[i] > 0)
            {
                this.bwt += this.text[this.sa[i] - 1];
            }
            else
            {
                this.bwt += "$";
            }
            if(i==15)
            {
                break;
            }
        }
        
    }

    build_CTabulate(L) {
        let alphabet = [...new Set(L)].sort();

        let n_alpha = {};
        alphabet.forEach(function(value, valueAgain, set) {
        n_alpha[value] = 0;
        });
        for(let i = 0; i < L.length; ++i)
        {
            ++n_alpha[L[i]]
        }
        

        let C_of_alpha = {};
        C_of_alpha["$"] = 0;
        

        alphabet = Array.from(alphabet);
        for(let i = 1; i < (alphabet.length); ++i)
        {
            C_of_alpha[alphabet[i]] = n_alpha[alphabet[i - 1]] + C_of_alpha[alphabet[i - 1]];
        } 

        return C_of_alpha;

        
    }

    build_OCCTabulate(L)
    {
        
        let Occ = [];
        let counter = {};
        let temp = 0;
        for(let x = 0; x < L.length; ++x)
        {
            if(L[x] in counter)
            {
                temp = (L.length[x], 1 + counter[L[x]]);
                counter[L[x]] = 1 + counter[L[x]];
            }
            else
            {
                temp = (L[x], 1);
                counter[L[x]] = 1;
            }
            Occ.push(temp)
        }
        return Occ;
    }

    reverseTransform(L)
    {
        let c = this.build_CTabulate(L);
        let occ = this.build_OCCTabulate(L);
        
        let i = 0;
        let j = L.length - 1;
        let T = "$";
        while(j >= 1)
        {
            j -= 1;
            T = L[i] + T;
            i = c[L[i]] + occ[i] - 1;
        }
        return T;
    }
    
    build_OccMatrix(L) {
        let alphabet = Array.from(new Set(L)).sort();
        let counter = {};
        let Occ = {};
        for (let i = 0; i < alphabet.length; i++) {
            let row = [];
            for (let j = 0; j < L.length; j++) {
                if (alphabet[i] === L[j]) {
    
                    if (alphabet[i] in counter) {
                        row.push(1 + counter[alphabet[i]]);
                        counter[alphabet[i]] = 1 + counter[alphabet[i]];
                    } else {
                        row.push(1);
                        counter[alphabet[i]] = 1;
                    }
                } else {
                    if (alphabet[i] in counter) {
                        row.push(counter[alphabet[i]]);
                        counter[alphabet[i]] = counter[alphabet[i]];
                    } else {
                        row.push(0);
                        counter[alphabet[i]] = 0;
                    }
                }
            }
            Occ[alphabet[i]] = row;
        }
        return Occ;
    }

    backwardSearch()
    {
        this.build_bwt();
        let c_tabulate = this.build_CTabulate(this.bwt);
        let occ = this.build_OccMatrix(this.bwt);
        
        
        
        let i = this.pattern.length - 1;
        let a = 0;
        let b = this.bwt.length - 1;

        let output = [];
        
        while(a <= b && i >= 0)
        {
           
            let c = this.pattern[i];
           
            if(a - 1 < 0)
            {
                a = c_tabulate[c];
            }
            else
            {
                a = c_tabulate[c] + occ[c][a - 1];
            }
            b = c_tabulate[c] + occ[c][b] - 1;
            

            --i;
        }

        if(b < a)
        {
           
            return output.length;
        }
       
        for(let x = a; x < (b + 1); ++x)
        {
            output.push(x + 1);
        }
        return output.length;

    }

}


function runFM_Index()
{
    const text = document.getElementById('text').value;
    const pattern = document.getElementById('pattern').value;

    if (text.length === 0)
    {
        alert("You have to give us a text");
        return;
    }
    if (pattern.length === 0)
    {
        alert("You have to give us a pattern");
        return;
    }

    const output = document.getElementById('output');

    fmIndex = new FM_Index(text, pattern);
    
    output.value = "There are " + fmIndex.backwardSearch() + " occurences";
}

function runReverse()
{
    const text = document.getElementById('text').value;
    const pattern = document.getElementById('pattern').value;
    const reverse = document.getElementById('reverse').value;

    if (text.length === 0)
    {
        alert("You have to give us a text");
        return;
    }
    if (pattern.length === 0)
    {
        alert("You have to give us a pattern");
        return;
    }
    if (reverse.length === 0)
    {
        
        alert("You have to give us a text which you want to reverse");
        return;

    }

    const output_reverse = document.getElementById('output_reverse');

    fmIndex = new FM_Index(text, pattern);
    
    output_reverse.value = fmIndex.reverseTransform(reverse);

}