<?php

if (isset($_GET['id'])) {

$alunoId = intval($_GET['id']);

$putData = file_get_contents("php://input");

 parse_str($putData, $receivedData);

if (isset($receivedData['nome'])) {
   
echo "teste";

$jsonContent = file_get_contents('../db.json');
if ($jsonContent === false) {
    die("Erro ao ler o arquivo 'db.json'");}


$data = json_decode($jsonContent, true);
if ($data === null && json_last_error() !== JSON_ERROR_NONE) {
    die("Erro ao decodificar JSON: " . json_last_error_msg());
}

$found = false;
foreach ($data['alunos'] as $key => $aluno) {
    if ($aluno['id'] === $alunoId) {
        $data['alunos'][$key] = array_merge($aluno, $receivedData);
        $found = true;
        break;
    }
}

if (!$found) {
    die("Aluno com ID $alunoId não encontrado");
}

$newJsonContent = json_encode($data, JSON_PRETTY_PRINT);
if (file_put_contents('../db.json', $newJsonContent) === false) {
    die("Erro ao salvar alterações no arquivo 'db.json'");
}

echo "Aluno atualizado com sucesso!";
}
}



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
foreach ($data['alunos'] as $aluno) {
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

$jsonContent = file_get_contents('../db.json');


if ($jsonContent === false) {
    die("Erro ao ler o arquivo 'db.json'");
}


$data = json_decode($jsonContent, true);


if ($data === null && json_last_error() !== JSON_ERROR_NONE) {
    die("Erro ao decodificar JSON: " . json_last_error_msg());
}

$alunos = $data['alunos'];


$jsonAlunos = json_encode($alunos, JSON_PRETTY_PRINT);

echo $jsonAlunos;

?>
