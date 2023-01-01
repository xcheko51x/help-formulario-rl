let listaAlumnado = [];

let objAlumnado = {
    id: '',
    nombre: '',
    curso: '',
    edad: ''
}
// agregar o actualizar la info
let editando = false;

let formulario = document.querySelector('#formulario');
let nombreInput = document.querySelector('#nombre');
let cursoInput = document.querySelector('#curso');
let edadInput = document.querySelector('#edad');
let btnAgregar = document.querySelector('#btnAgregar');
let estadistica = document.querySelector('#estadistica')

formulario.addEventListener('submit', validarFormulario);
estadistica.addEventListener('submit', mostrarEstadistica)

function validarFormulario(event) {
    event.preventDefault();

    if (nombreInput.value === '' || cursoInput.value === '' || edadInput.value === '') {
        alert('Por favor, rellena todos los campos');
        return;
    }
    if (editando) {
        editarAlumnado();
        editando = false;
    } else {
        objAlumnado.id = Date.now();
        objAlumnado.nombre = nombreInput.value;
        objAlumnado.curso = cursoInput.value;
        objAlumnado.edad = edadInput.value;

        agregarAlumnado();
    }

}

function agregarAlumnado() {
    listaAlumnado.push({ ...objAlumnado });

    mostrarAlumnado();

    formulario.reset();

    limpiarObjeto();

}

function limpiarObjeto() {
    objAlumnado.id = '';
    objAlumnado.nombre = '';
    objAlumnado.curso = '';
    objAlumnado.edad = '';
}



//.div-Empleados donde vamos a guardarlos
function mostrarAlumnado() {

    limpiarHTML();

    let divAlumnado = document.querySelector('.div-alumnado');

    let tabla = document.createElement('table');
    tabla.classList.add('table', 'table-striped');
    tabla.setAttribute('id', 'lista');

    const tHead = document.createElement('thead')
    
    const trHead = document.createElement('tr')

    let thId = document.createElement('th');
    let textThID = document.createTextNode('ID');
    thId.appendChild(textThID)

    let thNombre = document.createElement('th');
    let textThNombre = document.createTextNode('NOMBRE');
    thNombre.appendChild(textThNombre)

    let thCurso = document.createElement('th');
    let textThCurso = document.createTextNode('CURSO');
    thCurso.appendChild(textThCurso)

    let thEdad = document.createElement('th');
    let textThEdad = document.createTextNode('EDAD');
    thEdad.appendChild(textThEdad)

    let thEditar = document.createElement('th');
    let textThEditar = document.createTextNode('EDITAR');
    thEditar.appendChild(textThEditar)

    let thBorrar = document.createElement('th');
    let textThBorrar = document.createTextNode('BORRAR');
    thBorrar.appendChild(textThBorrar)

    trHead.appendChild(thId)
    trHead.appendChild(thNombre)
    trHead.appendChild(thCurso)
    trHead.appendChild(thEdad)
    trHead.appendChild(thEditar)
    trHead.appendChild(thBorrar)
    
    tHead.appendChild(trHead)

    const tBody = document.createElement('tbody')

    listaAlumnado.forEach(alumnado => {
        let { id, nombre, curso, edad } = alumnado;

        let trBody = document.createElement('tr'); 

        let tdId = document.createElement('td');
        let textTdId = document.createTextNode(id);
        tdId.appendChild(textTdId)

        let tdNombre = document.createElement('td');
        let textTdNombre = document.createTextNode(nombre);
        tdNombre.appendChild(textTdNombre)

        let tdCurso = document.createElement('td');
        let textTdCurso = document.createTextNode(curso);
        tdCurso.appendChild(textTdCurso)

        let tdEdad = document.createElement('td');
        let textTdEdad = document.createTextNode(edad);
        tdEdad.appendChild(textTdEdad)

        let tdEditarBoton = document.createElement('td');
        let editarBoton = document.createElement('button');
        editarBoton.setAttribute('id', 'id-btn-editar');
        editarBoton.onclick = () => cargarAlumnado(alumnado);
        editarBoton.textContent = 'Editar';
        editarBoton.classList.add('btn', 'btn-primary');
        tdEditarBoton.appendChild(editarBoton);

        let tdEliminarBoton = document.createElement('td');
        let eliminarBoton = document.createElement('button');
        eliminarBoton.setAttribute('id', 'id-btn-eliminar');
        eliminarBoton.onclick = () => eliminaralumnado(id);
        eliminarBoton.textContent = 'Eliminar';
        eliminarBoton.classList.add('btn', 'btn-danger');
        tdEliminarBoton.appendChild(eliminarBoton);

        trBody.appendChild(tdId)
        trBody.appendChild(tdNombre)
        trBody.appendChild(tdCurso)
        trBody.appendChild(tdEdad)
        trBody.appendChild(tdEditarBoton)
        trBody.appendChild(tdEliminarBoton)

        tBody.appendChild(trBody)
    })

    tabla.appendChild(tBody)
    tabla.appendChild(tHead)
    
    divAlumnado.appendChild(tabla);
}

function cargarAlumnado(alumnado) {

    let { id, nombre, curso, edad } = alumnado;

    nombreInput.value = nombre;
    cursoInput.value = curso;
    edadInput.value = edad;

    objAlumnado.id = id;

    formulario.querySelector('button[type="submit"]').textContent = 'Actualizar';
    formulario.querySelector('button[type="submit"]').classList.remove('btn-success');
    formulario.querySelector('button[type="submit"]').classList.add('btn-primary');

    editando = true;

}


function editarAlumnado() {
    objAlumnado.nombre = nombreInput.value;
    objAlumnado.curso = cursoInput.value;
    objAlumnado.edad = edadInput.value;

    listaAlumnado.map(alumnado => {

        if (alumnado.id === objAlumnado.id) {
            alumnado.id = objAlumnado.id;
            alumnado.nombre = objAlumnado.nombre;
            alumnado.curso = objAlumnado.curso;
            alumnado.edad = objAlumnado.edad;
        }

    });

    limpiarHTML();
    mostrarAlumnado();

    formulario.reset();

    formulario.querySelector('button[type="submit"]').textContent = 'Agregar';
    formulario.querySelector('button[type="submit"]').classList.remove('btn-primary');
    formulario.querySelector('button[type="submit"]').classList.add('btn-success');

    editando = false;
}

function eliminaralumnado(id) {
    listaAlumnado = listaAlumnado.filter(alumnado => alumnado.id !== id);

    limpiarHTML();
    mostrarAlumnado();
}

function limpiarHTML() {
    let divAlumnado = document.querySelector('.div-alumnado');
    while (divAlumnado.firstChild) {
        divAlumnado.removeChild(divAlumnado.firstChild);
    }
}

function mostrarEstadistica(event) {
    event.preventDefault();
    if(listaAlumnado.length == 0) {
        alert('NO SE PUEDE OBTENER ESTADISTICAS SI NO HAY REGISTROS')
        return
    }


}
