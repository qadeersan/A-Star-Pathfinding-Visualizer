def heuristic(i1, j1, i2, j2):
    return abs(i2 - i1) + abs(j2 - j1)

def get_neighbours(i,j, barriers, neighbours):
    if i < 100 and [i+1,j] not in barriers:  #DOWN
        neighbours.append([i+1,j])
    if i >= 0 and [i-1,j] not in barriers:  #UP
        neighbours.append([i-1,j])
    if j < 100 and [i,j+1] not in barriers:  #RIGHT
        neighbours.append([i,j+1])
    if j >= 0 and [i,j-1] not in barriers:  #LEFT
        neighbours.append([i,j-1])

