<?php

if (!isset($_GET['id'])) {
    die("ID não fornecido");
}
$alunoId = intval($_GET['id']);

$jsonContent = file_get_contents('../db.json');
if ($jsonContent === false) {
    die("Erro ao ler o arquivo 'db.json'");
}

$data = json_decode($jsonContent, true);
if ($data === null && json_last_error() !== JSON_ERROR_NONE) {
    die("Erro ao decodificar JSON: " . json_last_error_msg());
}

$found = false;
foreach ($data['disciplinas'] as $key => $aluno) {
    if ($aluno['id'] === $alunoId) {
        unset($data['disciplinas'][$key]);
        $found = true;
        break;
    }
}

if (!$found) {
    die("Aluno com ID $alunoId não encontrado");
}

$data['disciplinas'] = array_values($data['disciplinas']);

$newJsonContent = json_encode($data, JSON_PRETTY_PRINT);
if (file_put_contents('../db.json', $newJsonContent) === false) {
    die("Erro ao salvar alterações no arquivo 'db.json'");
}

echo "Aluno removido com sucesso!";

?>
