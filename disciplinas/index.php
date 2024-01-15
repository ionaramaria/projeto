<?php

header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
if (isset($_GET['id'])) {
   

$requestedId = intval($_GET['id']);

$jsonContent = file_get_contents('../db.json');
if ($jsonContent === false) {
    die("Erro ao ler o arquivo 'db.json'");
}

$data = json_decode($jsonContent, true);
if ($data === null && json_last_error() !== JSON_ERROR_NONE) {
    die("Erro ao decodificar JSON: " . json_last_error_msg());
}

$alunoEncontrado = null;
foreach ($data['disciplinas'] as $aluno) {
    if ($aluno['id'] === $requestedId) {
        $alunoEncontrado = $aluno;
        break;
    }
}

if ($alunoEncontrado === null) {
    die("Aluno com ID $requestedId não encontrado");
}

$jsonAluno = json_encode($alunoEncontrado, JSON_PRETTY_PRINT);

header('Content-Type: application/json');

echo $jsonAluno;
exit;
}