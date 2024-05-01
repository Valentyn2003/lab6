const readGraphFromFile = require('./graph');
const fs = require('fs');

jest.mock('fs'); // Мок fs для імітації читання файлу

describe('readGraphFromFile', () => {
  const filePath = 'input.txt';

  it('читає дані графа з файлу', () => {
    const mockFileContent = '3 2\n1 2\n2 3';
    const expectedResult = { n: 3, m: 2, edges: [[1, 2], [2, 3]] };

    fs.readFileSync.mockReturnValueOnce(mockFileContent);

    const result = readGraphFromFile(filePath);
    expect(result).toEqual(expectedResult);
  });

  it('повертає помилку для неіснуючого файлу', () => {
    const nonExistentFilePath = 'non-existent.txt';

    expect(() => readGraphFromFile(nonExistentFilePath)).toThrowError('ENOENT: no such file or directory');
  });

  it('повертає помилку для файлу з невірним форматом', () => {
    const invalidFileContent = 'abc 123';

    fs.readFileSync.mockReturnValueOnce(invalidFileContent);

    expect(() => readGraphFromFile(filePath)).toThrowError(/Invalid graph data format/);
  });
});
