<?php

header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');

$jsonFile = '../db.json';
$jsonData = file_get_contents($jsonFile);
$data = json_decode($jsonData, true);
$disciplinaId = intval($_GET['id']);

$putData = file_get_contents("php://input");
parse_str($putData, $receivedData);

if (isset($disciplinaId) && !empty($receivedData)) {
    $updatedDisciplina = [
         'id' => $disciplinaId,
        'nome' => $receivedData['nome'],
        'cargaHoraria' => $receivedData['cargaHoraria'],
        'professor' => $receivedData['professor'],
        'status' => $receivedData['status'],
        'observacos' => $receivedData['observacoes'] // Modifique para 'observacoes'
    ];

    $found = false;
    foreach ($data['disciplinas'] as $key => $disciplina) {
        if ($disciplina['id'] === $disciplinaId) {
            $data['disciplinas'][$key] = array_merge($disciplina, $updatedDisciplina);
            $found = true;
            break;
        }
    }

    if (!$found) {
        die("Disciplina com ID $disciplinaId não encontrada.");
    }

    if (file_put_contents($jsonFile, json_encode($data))) {
        echo "Disciplina atualizada com sucesso.";
    } else {
        echo "Erro ao atualizar a disciplina.";
    }
} else {
    die("ID da disciplina ou dados para atualização não fornecidos.");
}
