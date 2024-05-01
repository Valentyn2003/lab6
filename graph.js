const fs = require('fs');

function readGraphFromFile(filePath) {
  const fileContent = fs.readFileSync(filePath, 'utf8');
  const lines = fileContent.split('\n').filter(line => line.trim() !== '');
  const [n, m] = lines[0].split(' ').map(Number);
  const edges = lines.slice(1, m + 1).map(line => line.split(' ').map(Number));

  return { n, m, edges };
}

function generateAdjacencyMatrix(n, edges) {
  const matrix = Array.from({ length: n }, () => Array(n).fill(0));
  for (const [v, u] of edges) {
    matrix[v - 1][u - 1] = 1; // Оскільки індексація у файлі ведеться з 1
    matrix[u - 1][v - 1] = 1; // Для невпорядкованого графа
  }
  return matrix;
}

function generateIncidenceMatrix(n, m, edges) {
  const matrix = Array.from({ length: n }, () => Array(m).fill(0));
  edges.forEach(([v, u], index) => {
    matrix[v - 1][index] = 1;
    matrix[u - 1][index] = -1; // Для орієнтованого графа
  });
  return matrix;
}


function printMatrix(matrix) {
  matrix.forEach(row => console.log(row.join(' ')));
}

function saveMatrixToFile(matrix, filePath) {
  const content = matrix.map(row => row.join(' ')).join('\n');
  fs.writeFileSync(filePath, content, 'utf8');
}

function main() {
  const filePath = 'input.txt'; // Шлях до файлу графа
  const { n, m, edges } = readGraphFromFile(filePath);

  const adjacencyMatrix = generateAdjacencyMatrix(n, edges);
  console.log('Матриця суміжності:');
  printMatrix(adjacencyMatrix);
  saveMatrixToFile(adjacencyMatrix, 'adjacencyMatrix.txt');

  const incidenceMatrix = generateIncidenceMatrix(n, m, edges);
  console.log('Матриця інцидентності:');
  printMatrix(incidenceMatrix);
  saveMatrixToFile(incidenceMatrix, 'incidenceMatrix.txt');
}

main();

module.exports = { generateAdjacencyMatrix, generateIncidenceMatrix };

