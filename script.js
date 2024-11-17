const board = document.getElementById("chessboard");

// Les pièces personnalisées avec des URLs vers vos images
const pieces = {
  white: {
    king: "images/white_king.png",
    queen: "images/white_queen.png",
    rook: "images/white_rook.png",
    bishop: "images/white_bishop.png",
    knight: "images/white_knight.png",
    pawn: "images/white_pawn.png",
  },
  black: {
    king: "images/black_king.png",
    queen: "images/black_queen.png",
    rook: "images/black_rook.png",
    bishop: "images/black_bishop.png",
    knight: "images/black_knight.png",
    pawn: "images/black_pawn.png",
  },
};

// Plateau initial
const initialBoard = [
  ["rook", "knight", "bishop", "queen", "king", "bishop", "knight", "rook"],
  ["pawn", "pawn", "pawn", "pawn", "pawn", "pawn", "pawn", "pawn"],
  [], [], [], [],
  ["pawn", "pawn", "pawn", "pawn", "pawn", "pawn", "pawn", "pawn"],
  ["rook", "knight", "bishop", "queen", "king", "bishop", "knight", "rook"],
];

// Variable pour stocker la pièce en cours de déplacement
let draggedPiece = null;

// Créer le plateau
function createBoard() {
  for (let row = 0; row < 8; row++) {
    for (let col = 0; col < 8; col++) {
      const square = document.createElement("div");
      square.className = "square";
      square.dataset.row = row;
      square.dataset.col = col;

      // Ajout des événements pour le "drop"
      square.addEventListener("dragover", (e) => e.preventDefault());
      square.addEventListener("drop", handleDrop);

      board.appendChild(square);

      // Ajouter une pièce si elle existe
      if (initialBoard[row] && initialBoard[row][col]) {
        const piece = document.createElement("img");
        piece.src =
          row < 2
            ? pieces.black[initialBoard[row][col]]
            : pieces.white[initialBoard[row][col]];
        piece.className = "piece";
        piece.draggable = true;

        // Ajout des événements de drag
        piece.addEventListener("dragstart", handleDragStart);
        piece.addEventListener("dragend", handleDragEnd);

        square.appendChild(piece);
      }
    }
  }
}

// Gestion des événements de glisser-déposer
function handleDragStart(e) {
  draggedPiece = e.target; // Stocker la pièce en cours de déplacement
  setTimeout(() => (e.target.style.display = "none"), 0); // Cache temporairement la pièce
}

function handleDragEnd(e) {
  e.target.style.display = "block"; // Réaffiche la pièce
  draggedPiece = null;
}

function handleDrop(e) {
  e.preventDefault();

  // Vérifie si une pièce est déplacée
  if (draggedPiece) {
    // Déplace la pièce vers la nouvelle case
    e.target.appendChild(draggedPiece);
  }
}

// Appeler la fonction
createBoard();
