# Conway's Game of Life

### Thoughts

- This was a weekend project.

### Description Of CGoL

The Game of Life, also known simply as Life, is a cellular automaton devised by the British mathematician John Horton Conway in 1970. It is a zero-player game, meaning that its evolution is determined by its initial state, requiring no further input. One interacts with the Game of Life by creating an initial configuration and observing how it evolves. It is Turing complete and can simulate a universal constructor or any other Turing machine.

- Wikipedia (https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life)

### Features

- You can select initial starting configurations.
- You can pause mid-game and edit positions.
- You can clear the board and start over.
- The code stores each frame of each game in a history object. This is not currently being implemented anywhere for viewing, but could be.
- Each history object stored during the game, at the end of the game, is stored in a map of game histories. This, again, is not being used but could be for cool time depth features.

### Core Algorithms

1. Store only the active cells in a hash table at each frame, not the 2D board matrix.
2. At each frame map through the 1D hash table and calculate the surrounding neighbors of each (active) cell.
3. Use a `hashTable.reduce(() => {}, {})` method on these groups to count the duplicate occurrences of cell in these groups.
4. Based on the number of recurrences use conditional logic to apply the life/death/birth rule set.
5. Diff against the previous hash table of active cells, cloning the hash table and updating it accordingly.

- By only storing the active cells of each frame, rather than a picture of the board, we can apply those active cells against the rule set at each frame. This reduces the potentially overwhelming runtime.

1. For the ReactJS rendering of the `<Grid />`, use `React.useMemo(() => {}, boardSize)` on the rows and columns to reduce the re-rendering of the `<Row />` and `<Cell />` components.

### TODO

- If I find more time my energy will be put towards the user experience and dynamic setting of speed and size of the board.

©2020 Daniel Griffiths
