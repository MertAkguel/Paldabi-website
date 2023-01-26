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

        let n_aplha = {"$":1};
        alphabet.forEach(function(value, valueAgain, set) {
        n_aplha[value] = 0;
    });
        
    }

    build_OCCTabulate()
    {

    }

    reverseTransform()
    {

    }
    build_OCCMatrix()
    {

    }

    BackwardSearch()
    {

    }
    LocateMatches()
    {

    }


}

const text = "banana";
const pattern = "ssi";

let fmIndex = new FM_Index(text, pattern);
fmIndex.constructSuffixArray();

console.log(fmIndex.build_CTabulate());


// function runFM_Index()
// {
//     const text = "banana";
//     const pattern = "ssi";

//     fmIndex = new FM_Index(text, pattern);
//     fmIndex.constructSuffixArray();
// }