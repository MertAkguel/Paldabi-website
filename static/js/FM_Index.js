document.getElementsByClassName('nav-link')[0].className = "nav-link";
document.getElementsByClassName('nav-link')[6].className = "nav-link active dropdown-toggle";

class FM_Index
{
    constructor(text, pattern)
    {
        this.text = text;
        this.pattern = pattern;
        this.sa = new Array();
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
        console.log(this.sa);
    }

    build_CTabulate() {
        let alphabet = [...new Set(this.text)].sort();

        let n_alpha = {};
        alphabet.forEach(function(value, valueAgain, set) {
        n_alpha[value] = 0;
        });
        for(let i = 0; i < this.text.length; ++i)
        {
            ++n_alpha[this.text[i]]
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

    build_OCCTabulate()
    {
        
        let Occ = [];
        let counter = {};
        let temp = 0;
        for(let x = 0; x < this.text.length; ++x)
        {
            if(this.text[x] in counter)
            {
                temp = (this.text.length[x], 1 + counter[this.text[x]]);
                counter[this.text[x]] = 1 + counter[this.text[x]];
            }
            else
            {
                temp = (this.text[x], 1);
                counter[this.text[x]] = 1;
            }
            Occ.push(temp)
        }
        return Occ;
    }

    reverseTransform(L)
    {
        let c = this.build_CTabulate();
        let occ = this.build_OCCTabulate();
        
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
    
    build_OccMatrix() {
        let alphabet = Array.from(new Set(this.text)).sort();
        let counter = {};
        let Occ = {};
        for (let i = 0; i < alphabet.length; i++) {
            let row = [];
            for (let j = 0; j < this.text.length; j++) {
                if (alphabet[i] === this.text[j]) {
    
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
        let c_tabulate = this.build_CTabulate();
        let occ = this.build_OccMatrix();

        let i = this.pattern.length - 1;
        let a = 0;
        let b = this.text.length - 1;

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
            console.log("return not found");
            return output;
        }
        else
        {
            console.log("found ", b - a + 1, "occurences");
        }
        for(let x = a; x < (b + 1); ++x)
        {
            output.push(x + 1);
        }
        return output;

    }
    locateMatches(i)
    {
        let j = i;
        v = 0;

        let marked = false;
        while(!marked)
        {
            
        }
    }


}

const text = "ipssm$pissii";
const pattern = "ssi";

let fmIndex = new FM_Index(text, pattern);
fmIndex.constructSuffixArray();

console.log(fmIndex.build_CTabulate());
console.log(fmIndex.build_OCCTabulate());
console.log(fmIndex.reverseTransform(text));
console.log(fmIndex.build_OccMatrix());
console.log(fmIndex.backwardSearch());



// function runFM_Index()
// {
//     const text = "banana";
//     const pattern = "ssi";

//     fmIndex = new FM_Index(text, pattern);
//     fmIndex.constructSuffixArray();
// }