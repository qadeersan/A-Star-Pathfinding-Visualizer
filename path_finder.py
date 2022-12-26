import sys
from PyQt6.QtWidgets import QApplication, QWidget, QGridLayout, QPushButton

class AStarGUI(QWidget):
    def __init__(self):
        super().__init__()

        # Create a grid layout and set the spacing to 0
        self.grid_layout = QGridLayout()
        self.grid_layout.setSpacing(0)

        # Create a button for each square in the grid
        self.grid_size = 50
        for i in range(5):
            for j in range(5):
                button = QPushButton(self)
                button.setFixedSize(50, 50)
                self.grid_layout.addWidget(button, i, j)

        # Set the layout of the widget
        self.setLayout(self.grid_layout)

app = QApplication(sys.argv)
gui = AStarGUI()
gui.show()
sys.exit(app.exec_())
