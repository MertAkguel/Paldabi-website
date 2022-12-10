import numpy as np
import sys
from typing import List
import time 

# die Profilsequenz wird eingelesen und zeilenweise gespeichert als numpy-array
def read_profil(file: str, motivlaenge: int) -> np.ndarray:
    motivlaenge += 1
    profilmatrix = []
    zeile = []
    with open(file) as f:
        temp = f.read().split()
        for x in range(len(temp)):
            zeile.append(float(temp[x]))
            if len(zeile) == motivlaenge:
                profilmatrix.append(zeile)
                zeile = []

    return np.array(profilmatrix, dtype=float)

# die sequenz wird eingelesen und als  liste von strings gespeichert
def read_sequenz(sequenz: str) -> List[str]:
    with open(sequenz) as f:
        return f.read().split()

# die startverteilung wird zurückgegeben
def get_startverteilung(p_matrix: np.ndarray) -> np.ndarray:
    startverteilung = []
    for x in p_matrix:
        startverteilung.append(x[0])
    return np.array(startverteilung)

# die w-matrix wird berechnet
def w_matrix(sequenzen: List[str], p_matrix: np.ndarray, motivlaenge: int) -> np.ndarray:
    new_matrix = []
    for x in range(len(sequenzen)):
        werte = []
        for y in range(len(sequenzen[x]) - motivlaenge + 1):
            motiv = 1
            for z in range(motivlaenge):
                if sequenzen[x][y + z] == 'A':
                    motiv *= p_matrix[0][z + 1]
                elif sequenzen[x][y + z] == 'C':
                    motiv *= p_matrix[1][z + 1]
                elif sequenzen[x][y + z] == 'G':
                    motiv *= p_matrix[2][z + 1]
                elif sequenzen[x][y + z] == 'T':
                    motiv *= p_matrix[3][z + 1]
            werte.append(motiv) # hier werden die multiplizierten für das l-mer gespeichert
        summe = np.sum(werte) # die summe der werte für die jeweilige sequenz wird berechnet
        
        for i in range(len(werte)):
            
            werte[i] = werte[i] / summe

        new_matrix.append(werte) # hier werden die werte der w-matrix berechnet und in new_matrix gespeichert
    return np.array(new_matrix)
    

# die Anfangswerte aus der p-matrix werden in die neue matrix gespeichert
def p_strich(p_matrix: np.ndarray) -> np.ndarray:
    p_strich_matrix = []
    for x in range(1, len(p_matrix[0])):
        zeile = []
        for y in range(len(p_matrix)):
            zeile.append(p_matrix[y][x])
        p_strich_matrix.append(zeile)
    return np.array(p_strich_matrix)

# p-strich wird für jede sequenz berechnet
def get_p_strich(sequenzen: List[str], w_matrix: np.ndarray, motivlaenge: int, p: np.ndarray) -> np.ndarray:
    stellen = len(sequenzen[0]) + 1 - motivlaenge
    p_strich_matrix = p[:]

    for x in range(motivlaenge):
        for y in range(len(sequenzen)):
            for z in range(x, stellen + x):
                if sequenzen[y][z] == 'A':
                    p_strich_matrix[x][0] += w_matrix[y][z - x]
                elif sequenzen[y][z] == 'C':
                    p_strich_matrix[x][1] += w_matrix[y][z - x]
                elif sequenzen[y][z] == 'G':
                    p_strich_matrix[x][2] += w_matrix[y][z - x]
                elif sequenzen[y][z] == 'T':
                    p_strich_matrix[x][3] += w_matrix[y][z - x]
    return np.array(p_strich_matrix)

# die neue p-matrix wird berechnet
def get_new_p_matrix(p_strich_matrix: np.ndarray, startverteilung: np.ndarray) -> np.ndarray:
    summe = []
    for i in range(len(p_strich_matrix)):
        summe.append(np.sum(p_strich_matrix[i]))
    result = []
    for x in range(len(p_strich_matrix)):
        zeile = []
        for y in range(len(p_strich_matrix[x])):
            zeile.append(p_strich_matrix[x][y] / summe[x])
        result.append(zeile)
    result = [startverteilung] + result
    return np.array(result).transpose()

# das Bindungsmotiv wird ausgegeben indem geguckt wird in welcher Sequenz das Maximum ist
def getBindungsmotiv(new_p_matrix: np.ndarray) -> str:
    bindungsmotiv = ""
    new_p_matrix = new_p_matrix.transpose()
    for liste in range(1, len(new_p_matrix)):
        max_iter = 0
        max_element = new_p_matrix[liste][0]
        for element in range(len(new_p_matrix[liste])):
            if new_p_matrix[liste][element] > max_element:
                max_iter = element
                max_element = new_p_matrix[liste][element]

        if max_iter == 0:
            bindungsmotiv += "A"
        elif max_iter == 1:
            bindungsmotiv += "C"
        elif max_iter == 2:
            bindungsmotiv += "G"
        elif max_iter == 3:
            bindungsmotiv += "T"

    return bindungsmotiv


if __name__ == "__main__":

    start = time.perf_counter()
    motivlaenge = 6
    profilmatrix = read_profil(sys.argv[1], motivlaenge)
    sequenzen = read_sequenz(sys.argv[2])
    iterationen = int(sys.argv[3])
    startverteilung = get_startverteilung(profilmatrix)
    for _ in range(iterationen):
        matrix_w = (w_matrix(sequenzen, profilmatrix, motivlaenge))
       
        p = p_strich(profilmatrix)
        strich_p = get_p_strich(sequenzen, matrix_w, motivlaenge, p)
        profilmatrix = get_new_p_matrix(strich_p, startverteilung)
    end = time.perf_counter()
    # print(f"Die Profilmatrix nach {iterationen} ist: ")
    # print(profilmatrix)
    # print("________________________________________________")
    # print(f"Das Bindungsmotiv in den Sequenzen ist vermutlich {getBindungsmotiv(profilmatrix)}")
    # print(f"Es hat {round((end - start), 2)} Sekunden gedauert.")

    
