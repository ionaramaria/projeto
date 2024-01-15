<?php

if (!isset($_POST['nome']) || !isset($_POST['cargahoraria']) || !isset($_POST['professor'])) {
    die("Dados incompletos");
}

$nome = $_POST['nome'];
$cargaHoraria = $_POST['cargahoraria'];
$professor = $_POST['professor'];
$status = $_POST['status'];
$observacos = $_POST['obersavacoes'];


$jsonContent = file_get_contents('../db.json');
if ($jsonContent === false) {
    die("Erro ao ler o arquivo 'db.json'");
}

$data = json_decode($jsonContent, true);
if ($data === null && json_last_error() !== JSON_ERROR_NONE) {
    die("Erro ao decodificar JSON: " . json_last_error_msg());
}

$ultimoId = max(array_column($data['disciplinas'], 'id'));
$novoId = $ultimoId + 1;

$novoAluno = [
    'nome' => $nome,
    'cargaHoraria' => $cargaHoraria,
    'professor' => $professor,
    'status' => $status,
    'observacos' => $observacos,
    'id' => $novoId
];
$data['disciplinas'][] = $novoAluno;

$newJsonContent = json_encode($data, JSON_PRETTY_PRINT);
if (file_put_contents('../db.json', $newJsonContent) === false) {
    die("Erro ao salvar alterações no arquivo 'db.json'");
}


?>
