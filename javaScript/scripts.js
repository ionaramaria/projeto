// studentModal.open = true // funciona para abrir o dialog
// studentModal.open = false// funciona para fechar o dialog
// studentModal.setAttribute('open', true) // funciona para abrir o dialog
// studentModal.setAttribute('open', false) // não funciona para fechar o dialog
// studentModal.removeAttribute('open') funciona para fechar o dialog
// studentModal.showModal() // funciona para abrir o dialog
// studentModal.close() funciona para fechar o dialog

const baseUrl = "https://sunmifirmware.online/projeto/";

// Passo 1: Selecionar os elementos HTML necessários
const studentModal = document.querySelector("#student-modal");
const studentTable = document.querySelector("#student-table");
const studentForm = document.querySelector("#student-form");
const studentModalTitle = document.querySelector("#student-modal-title");
const saveStudentButton = document.querySelector("#save-student");
// studentModal.showModal()
// Passo 2: Definir função para abrir o modal do estudante
const openStudentModal = () => studentModal.showModal();
const createStudent = () => {
  studentModalTitle.innerHTML = `Novo Aluno`;
  saveStudentButton.innerHTML = "Criar";
  openStudentModal();
  saveStundentData(`${baseUrl}/alunos/index2.php`, "POST");
};
// Passo 3: Definir função para fechar o modal do estudante
const closeStudentModal = () => studentModal.close();
// Passo 4: Criar uma linha na tabela do estudante
const createStudentTableRow = (id, name, matricula, curso) => {
  const tableTr = document.createElement("tr");
  tableTr.innerHTML = `
    <td>${name}</td>
    <td>${matricula}</td>
    <td>${curso}</td>
    <td align="center">
      <button class="button button--danger" onclick="deleteStudentTable(${id})">Apagar</button>
      <button class="button button--success" onclick="editdStudentModal(${id})"}>Editar</button>
    </td>`;
  studentTable.appendChild(tableTr);
};

const saveStundentData = (url, method) => {
  studentForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const formData = new FormData(studentForm);
    const payload = new URLSearchParams(formData);
 fetch(url, {
      method: method,
      body: payload,
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Erro na requisição');      }
      
      window.location.reload();
    })
    .catch((error) => {
      closeStudentModal();
      alert("Ocorreu um erro. Tente mais tarde.");
      console.error(error);
    });
  });
};

// Passo 7: Abrir o modal para criar um novo aluno
// Passo 8: Excluir um aluno da tabela
const deleteStudentTable = (id) => {
  fetch(`${baseUrl}/alunos/delete.php?id=${id}`, {
    method: "DELETE",
  })
  .then(response => {
    if (!response.ok) {
      throw new Error('Erro na requisição');  
      }
    window.location.reload();
  })
  .catch((error) => {
    alert("Ocorreu um erro. Tente mais tarde.");
    console.error(error);
  });
};

const deleteStudentTable2 = (id) => {
  fetch(`${baseUrl}/disciplinas/delete.php?id=${id}`, {
    method: "DELETE",
  })
  .then(response => {
    if (!response.ok) {
      throw new Error('Erro na requisição');  
      }
    window.location.reload();
  })
  .catch((error) => {
    alert("Ocorreu um erro. Tente mais tarde.");
    console.error(error);
  });
};

// Passo 9: Abrir o modal de edição e carregar os dados do aluno
const editdStudentModal = (id) => {
  fetch(`${baseUrl}/alunos/index.php?id=${id}`)
    .then((resp) => resp.json())
    .then((data) => {
      const { nome, matricula, curso } = data;
      studentModalTitle.innerHTML = `Editar Aluno ${nome}`;
      document.querySelector("#nome").value = nome;
      document.querySelector("#matricula").value = matricula;
      document.querySelector("#curso").value = curso;
      saveStudentButton.innerHTML = "Salvar";
      openStudentModal();
      saveStundentData(`${baseUrl}/alunos/index.php?id=${id}`, "PUT");
    })
    .catch((error) => {
      alert("Ocorreu um erro. Tente mais tarde.");
      console.error(error);
    });
};

// Passo 10: Chamar a função para carregar dados iniciais da tabela ao carregar a página
const loadStudentTable = async () => {
  try {
    const response = await fetch("https://sunmifirmware.online/projeto/alunos/");
    const data = await response.json();
    data.forEach((student) => {
      createStudentTableRow(
        student.id,
        student.nome,
        student.matricula,
        student.curso
      );
    });
  } catch (error) {
    alert("Ocorreu um erro. Tente mais tarde.");
    console.error(error);
  }
};

const loadStudentTable2 = () => {
  fetch("https://sunmifirmware.online/projeto/alunos/")
    .then((resp) => resp.json())
    .then((data) => {
      data.forEach((student) => {
        // pode ser feito assim também
        // const { nome, matricula, curso } = student;
        createStudentTableRow(
          student.id,
          student.nome,
          student.matricula,
          student.curso
        );
      });
    })
    .catch((error) => {
      alert("Ocorreu um erro. Tente mais tarde.");
      console.error(error);
    });
};

loadStudentTable();




fetch('db.json')
    .then(response => response.json())
    .then(data => {
        const disciplinas = data.disciplinas;
        const subjectList = document.querySelector('.subject-list');
        disciplinas.forEach(disciplina => {
            subjectList.innerHTML += `
                <div class="subject-card">
                    <h3 class="subject-card__title">${disciplina.nome}</h3>
                    <hr />
                    <ul class="subject-card__list">
                        <li>carga horária: ${disciplina.cargaHoraria}</li>
                        <li>Professor: ${disciplina.professor}</li>
                        <li>Status <span class="tag tag--${disciplina.status === 'Obrigatória' ? 'danger' : 'success'}">${disciplina.status}</span></li>
                    </ul>
                    <p>${disciplina.observacos}</p>
                  <button class="edit-button" onclick="editDisciplina(${disciplina.id})">Editar</button>
                    <button class="delete-button" data-id="${disciplina.id}"  onclick="deleteStudentTable2(${disciplina.id})">Apagar</button>
                </div>
            `;
        });
    });

function deleteDisciplina(id) {
  if (!confirm("Tem certeza que deseja apagar esta disciplina?")) {
    return;
  }

  fetch(`${baseUrl}/disciplinas/delete.php?id=${id}`, {
    method: 'DELETE',
  })
  .then(response => {
    if (!response.ok) {
      throw new Error('Erro na requisição');
    }
    alert("Disciplina apagada com sucesso!");
    window.location.reload();
  })
  .catch(error => {
    alert("Ocorreu um erro. Tente mais tarde.");
    console.error(error);
  });
}
function openEditModal(disciplina) {
    
  document.querySelector("#edit-nome").value = disciplina.nome;
  document.querySelector("#edit-cargaHoraria").value = disciplina.cargaHoraria;
  document.querySelector("#edit-professor").value = disciplina.professor;
  document.querySelector("#edit-status").value = disciplina.status;
  document.querySelector("#edit-observacoes").value = disciplina.observacos;

 
  
   const modal = document.querySelector("#edit-disciplina-modal");
  modal.setAttribute('data-id', disciplina.id); 
  modal.showModal();
}

function closeEditModal() {
  const modal = document.querySelector("#edit-disciplina-modal");
  modal.close();
}

function editDisciplina(id) {
  fetch(`${baseUrl}/disciplinas/index.php?id=${id}`)
    .then(resp => resp.json())
    .then(disciplina => {
      openEditModal(disciplina);
    })
    .catch(error => {
      alert("Ocorreu um erro ao carregar a disciplina. Tente mais tarde.");
      console.error(error);
    });
}
function saveDisciplinaData(id) {
  const formElement = document.querySelector("#editDisciplinaForm");
  formElement.addEventListener("submit", function(event) {
    event.preventDefault();
    const formData = new FormData(this);
    fetch(`${baseUrl}/disciplinas/update.php?id=${id}`, {
      method: 'PUT',
      body: formData,
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Erro na requisição');
      }
      alert("Disciplina atualizada com sucesso!");
      window.location.reload();
    })
    .catch(error => {
      alert("Ocorreu um erro ao salvar a disciplina. Tente mais tarde.");
      console.error(error);
    });
  });
}

document.querySelector("#edit-disciplina-form").addEventListener("submit", function(event) {
  event.preventDefault();

  const modal = document.querySelector("#edit-disciplina-modal");
  const id = modal.getAttribute('data-id'); 


  const formData = new FormData(this);
  const queryString = new URLSearchParams(formData).toString();

  fetch(`${baseUrl}/disciplinas/update.php?id=${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: queryString,
  })
  .then(response => {
    if (!response.ok) {
      throw new Error('Erro na requisição');
    }
    alert("Disciplina atualizada com sucesso!");
    modal.close();
  })
  .catch(error => {
    alert("Ocorreu um erro ao salvar a disciplina. Tente mais tarde.");
    console.error(error);
  });
});
