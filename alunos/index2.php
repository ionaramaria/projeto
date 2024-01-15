<?php

if (!isset($_POST['nome']) || !isset($_POST['matricula']) || !isset($_POST['curso'])) {
    die("Dados incompletos");
}

$nome = $_POST['nome'];
$matricula = $_POST['matricula'];
$curso = $_POST['curso'];

$jsonContent = file_get_contents('../db.json');
if ($jsonContent === false) {
    die("Erro ao ler o arquivo 'db.json'");
}

$data = json_decode($jsonContent, true);
if ($data === null && json_last_error() !== JSON_ERROR_NONE) {
    die("Erro ao decodificar JSON: " . json_last_error_msg());
}

$ultimoId = max(array_column($data['alunos'], 'id'));
$novoId = $ultimoId + 1;

$novoAluno = [
    'nome' => $nome,
    'matricula' => $matricula,
    'curso' => $curso,
    'id' => $novoId
];
$data['alunos'][] = $novoAluno;

$newJsonContent = json_encode($data, JSON_PRETTY_PRINT);
if (file_put_contents('../db.json', $newJsonContent) === false) {
    die("Erro ao salvar alterações no arquivo 'db.json'");
}


?>
