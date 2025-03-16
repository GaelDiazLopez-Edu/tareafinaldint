import React, { useState } from "react";
import { FaPlus, FaEdit, FaTimes, FaEye, FaEyeSlash } from "react-icons/fa";
import "./App.css";

function App() {
  const [tareas, setTareas] = useState([]);
  const [nuevaTarea, setNuevaTarea] = useState("");
  const [modoEdicion, setModoEdicion] = useState(null);
  const [mostrarCompletadas, setMostrarCompletadas] = useState(true);

  // Función para agregar una nueva tarea
  const agregarTarea = () => {
    if (nuevaTarea.trim() === "") return;
    setTareas([...tareas, { id: Date.now(), texto: nuevaTarea, completada: false }]);
    setNuevaTarea("");
  };

  // Función para eliminar una tarea específica
  const eliminarTarea = (id) => {
    setTareas(tareas.filter((tarea) => tarea.id !== id));
  };

  // Función para iniciar el modo edición
  const iniciarEdicion = (id) => {
    setModoEdicion(id);
  };

  // Función para actualizar una tarea en edición
  const actualizarTarea = (id, textoActualizado) => {
    if (textoActualizado.trim() === "") return;
    setTareas(
      tareas.map((t) =>
        t.id === id ? { ...t, texto: textoActualizado } : t
      )
    );
    setModoEdicion(null);
  };

  // Función para marcar o desmarcar una tarea como completada
  const toggleCompletada = (id) => {
    setTareas(
      tareas.map((t) =>
        t.id === id ? { ...t, completada: !t.completada } : t
      )
    );
  };

  // Función para alternar entre mostrar o no mostrar las tareas completadas
  const toggleMostrarCompletadas = () => {
    setMostrarCompletadas(!mostrarCompletadas);
  };

  return (
    <div className="app-container">
      {/* Encabezado */}
      <header className="header">
        <h1>Lista de Tareas</h1>
        <button className="filter-button" onClick={toggleMostrarCompletadas}>
          {mostrarCompletadas ? (
            <>
              No mostrar completadas <FaEyeSlash />
            </>
          ) : (
            <>
              Mostrar todas <FaEye />
            </>
          )}
        </button>
      </header>

      {/* Input para agregar nuevas tareas */}
      <div className="task-input">
        <input
          type="text"
          value={nuevaTarea}
          onChange={(e) => setNuevaTarea(e.target.value)}
          placeholder="Escribe una tarea"
        />
        <button onClick={agregarTarea} className="add-button">
          <FaPlus />
        </button>
      </div>

      {/* Lista de tareas */}
      <ul className="task-list">
        {tareas
          .filter((tarea) => (mostrarCompletadas ? true : !tarea.completada)) // Filtra las tareas según el estado "mostrarCompletadas"
          .map((tarea) => (
            <li key={tarea.id} className={tarea.completada ? "completed" : ""}>
              {/* Contenido de la tarea */}
              <div className="task-content">
                <input
                  type="checkbox"
                  checked={tarea.completada}
                  onChange={() => toggleCompletada(tarea.id)}
                />
                {modoEdicion === tarea.id ? (
                  <input
                    type="text"
                    defaultValue={tarea.texto}
                    onBlur={(e) => actualizarTarea(tarea.id, e.target.value)}
                    autoFocus
                  />
                ) : (
                  <span>{tarea.texto}</span>
                )}
              </div>

              {/* Botones de acción */}
              <div className="task-actions">
                {modoEdicion === tarea.id ? (
                  <>
                    <button
                      onClick={() =>
                        actualizarTarea(tarea.id, document.activeElement.value)
                      }
                      className="update-button"
                    >
                      Actualizar
                    </button>
                    <button
                      onClick={() => eliminarTarea(tarea.id)}
                      className="delete-button"
                    >
                      <FaTimes />
                    </button>
                  </>
                ) : modoEdicion === null ? (
                  <>
                    <button
                      onClick={() => iniciarEdicion(tarea.id)}
                      className="edit-button"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => eliminarTarea(tarea.id)}
                      className="delete-button"
                    >
                      <FaTimes />
                    </button>
                  </>
                ) : null}
              </div>
            </li>
          ))}
      </ul>
    </div>
  );
}

export default App;
