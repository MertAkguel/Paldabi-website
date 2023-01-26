document.getElementsByClassName('nav-link')[0].className = "nav-link";
document.getElementsByClassName('nav-link')[6].className = "nav-link active dropdown-toggle";

function fromDNAtoRNA(dna_sequenz)
{
    
    const len = dna_sequenz.length
    let rna_sequenz = ""
    for(let i = 0; i < len; i++)
    {
        if(dna_sequenz[i]=='A')
        {
            rna_sequenz += 'U';
        }
        else if(dna_sequenz[i]=='T')
        {
            rna_sequenz += 'A';
        }
        else if(dna_sequenz[i]=='G')
        {
            rna_sequenz += 'C';
        }
        else if(dna_sequenz[i]=='C')
        {
           rna_sequenz += 'G';    
        }
        else
        {
            rna_sequenz += 'X';
        }
        
    }
    
   return rna_sequenz
}


function genetischer_code(s) {

	let t = 'Kein Startcodon';
	
	let k = 0;

	while( k < s.length) 
    {
        if (s[k] == 'A' && s[k + 1] == 'U' && s[k + 2] == 'G') 
        {
            t = '';
            break;
	    }
        ++k;
} 
	for (let i = k; i < s.length; i += 3) 
    {
	
			
	if ((s[i] == 'U' && s[i + 1] == 'U' && s[i + 2] == 'U') || (s[i] == 'U' && s[i + 1] == 'U' && s[i + 2] == 'C')) {

				t += "Phe-";
				}
		else if ((s[i] == 'A' && s[i + 1] == 'U' && s[i + 2] == 'U' )|| (s[i] == 'A' && s[i + 1] == 'U' && s[i + 2] == 'C') || (s[i] == 'A' && s[i + 1] == 'U' && s[i + 2] == 'A')) {
				t += "Ile-";
			}
		else if ((s[i] == 'G' && s[i + 1] == 'U' && s[i + 2] == 'U') ||( s[i] == 'G' && s[i + 1] == 'U' && s[i + 2] == 'C' )|| (s[i] == 'G' && s[i + 1] == 'U' && s[i + 2] == 'A' )||( s[i] == 'G' && s[i + 1] == 'U' && s[i + 2] == 'G')) {
				t += "Val-";
		}
		else if (s[i]=='A' && s[i+1] =='U' && s[i+2] =='G' ) {
			t+="Met-";
		}
		else if ((s[i] == 'U' && s[i + 1] == 'C' && s[i + 2] == 'U') || (s[i] == 'U' && s[i + 1] == 'C' && s[i + 2] == 'C' )||( s[i] == 'U' && s[i + 1] == 'C' && s[i + 2] == 'A' )|| (s[i] == 'U' && s[i + 1] == 'C' && s[i + 2] == 'G' )|| (s[i] == 'A' && s[i + 1] == 'G' && s[i + 2] == 'U' )||( s[i] == 'A' && s[i + 1] == 'G' && s[i + 2] == 'C') ){
			t += "Ser-";

		
		}else if ((s[i] == 'C' && s[i + 1] == 'C' && s[i + 2] == 'U' )|| (s[i] == 'C' && s[i + 1] == 'C' && s[i + 2] == 'C' )|| (s[i] == 'C' && s[i + 1] == 'C' && s[i + 2] == 'A' )|| (s[i] == 'C' && s[i + 1] == 'C' && s[i + 2] == 'G')) {
			t += "Pro-";
		}
		else if ((s[i] == 'A' && s[i + 1] == 'C' && s[i + 2] == 'U' )|| (s[i] == 'A' && s[i + 1] == 'C' && s[i + 2] == 'C' )|| (s[i] == 'A' && s[i + 1] == 'C' && s[i + 2] == 'A') ||(s[i] == 'A' && s[i + 1] == 'C' && s[i + 2] == 'G')) {
			t += "Thr-";
		}
		else if ((s[i] == 'G' && s[i + 1] == 'C' && s[i + 2] == 'U') || (s[i] == 'G' && s[i + 1] == 'C' && s[i + 2] == 'C') || (s[i] == 'G' && s[i + 1] == 'C' && s[i + 2] == 'A') ||( s[i] == 'G' && s[i + 1] == 'C' && s[i + 2] == 'G')) {
			t += "Ala-";
		}
		else if ((s[i] == 'U' && s[i + 1] == 'A' && s[i + 2] == 'U') ||( s[i] == 'U' && s[i + 1] == 'A' && s[i + 2] == 'C')) {
			t += "Tyr-";
		}
		else if ((s[i] == 'C' && s[i + 1] == 'A' && s[i + 2] == 'U' )||( s[i] == 'C' && s[i + 1] == 'A' && s[i + 2] == 'C')) {
			t += "His-";
		}
		else if ((s[i] == 'C' && s[i + 1] == 'A' && s[i + 2] == 'A' )||( s[i] == 'C' && s[i + 1] == 'A' && s[i + 2] == 'G')) {
			t += "Gln-";
		}
		else if ((s[i] == 'A' && s[i + 1] == 'A' && s[i + 2] == 'U' )|| (s[i] == 'A' && s[i + 1] == 'A' && s[i + 2] == 'C')) {
			t += "Asn-";
		}
		else if ((s[i] == 'A' && s[i + 1] == 'A' && s[i + 2] == 'A') ||( s[i] == 'A' && s[i + 1] == 'A' && s[i + 2] == 'G')) {
			t += "Lys-";
		}
		else if ((s[i] == 'G' && s[i + 1] == 'A' && s[i + 2] == 'U' )||( s[i] == 'G' && s[i + 1] == 'A' && s[i + 2] == 'C')) {
			t += "Asp-";
		}
		else if((s[i] == 'G' && s[i + 1] == 'A' && s[i + 2] == 'A' )|| (s[i] == 'G' && s[i + 1] == 'A' && s[i + 2] == 'G')) {
			t += "Glu-";
		}
		else if ((s[i] == 'U' && s[i + 1] == 'G' && s[i + 2] == 'U') ||( s[i] == 'U' && s[i + 1] == 'G' && s[i + 2] == 'C')) {
		t += "Cys-";
        }          
		else if (s[i] == 'U' && s[i + 1] == 'G' && s[i + 2] == 'G') { t += "Trp-"; }
		else if ((s[i] == 'G' && s[i + 1] == 'G' && s[i + 2] == 'U') ||( s[i] == 'G' && s[i + 1] == 'G' && s[i + 2] == 'C' )|| (s[i] == 'G' && s[i + 1] == 'G' && s[i + 2] == 'A' )|| (s[i] == 'G' && s[i + 1] == 'G' && s[i + 2] == 'G')) {
		t += "Gly-";
        }
		else if ((s[i] == 'U' && s[i + 1] == 'G' && s[i + 2] == 'A') ||( s[i] == 'U' && s[i + 1] == 'A' && s[i + 2] == 'A') || (s[i] == 'U' && s[i + 1] == 'A' && s[i + 2] == 'G')) {
		//return t; 
		break;
        }	
		else if ((s[i] == 'U' && s[i + 1] == 'U' && s[i + 2] == 'A' )|| (s[i] == 'U' && s[i + 1] == 'U' && s[i + 2] == 'G') || (s[i] == 'C' && s[i + 1] == 'U' && s[i + 2] == 'U' )|| (s[i] == 'C' && s[i + 1] == 'U' && s[i + 2] == 'G' )|| (s[i] == 'C' && s[i + 1] == 'U' && s[i + 2] == 'C' )|| (s[i] == 'C' && s[i + 1] == 'U' && s[i + 2] == 'A')){
				t += "Leu-";
			}
		else { t += "Arg-"; }
    }

    if(s.length % 3 != 0)
    {
        return t.substring(0, t.length - 5);
    }
    else
    {
        return t.substring(0, t.length - 1);
    }

   
} 







function GetGeneticCode()
{
    let dna = document.getElementById('dna').value;

    let rna = document.getElementById('rna');
    rna.value = fromDNAtoRNA(dna);
	let as_sequence = document.getElementById('AS');
	as_sequence.value = genetischer_code(rna.value);
}
