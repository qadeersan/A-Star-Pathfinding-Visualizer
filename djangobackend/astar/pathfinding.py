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

def astar_main():
    # Create heap to organize objects from lowest f score to greatest
    # Push start node onto list

    # Node will contain prior node in path in object data
    
    # Initialize start nodes f score to heuristic to estimate distance to end, g score 0

    # Initialize all other g scores and f scores to infinity

    # Create set to track everything in heapq

    # Start at start node

    # Loop through neighbours of curr node
        # if currently defined g score coming from current node is less then 
        # the neighbours current node then update the prior node to current

        
