import React, { useState } from "react";
import { FaPlus, FaEdit, FaTimes } from "react-icons/fa"; // Importamos los iconos necesarios
import "./App.css";

function App() {
  const [tareas, setTareas] = useState([]);
  const [nuevaTarea, setNuevaTarea] = useState("");
  const [modoEdicion, setModoEdicion] = useState(null); // Controla qué tarea se está editando

  const agregarTarea = () => {
    if (nuevaTarea.trim() === "") return;
    setTareas([...tareas, { id: Date.now(), texto: nuevaTarea, completada: false }]);
    setNuevaTarea("");
  };

  const eliminarTarea = (id) => {
    setTareas(tareas.filter((tarea) => tarea.id !== id));
  };

  const iniciarEdicion = (id) => {
    setModoEdicion(id); // Establece el ID de la tarea que se está editando
  };

  const actualizarTarea = (id, textoActualizado) => {
    if (textoActualizado.trim() === "") return;
    setTareas(
      tareas.map((t) =>
        t.id === id ? { ...t, texto: textoActualizado } : t
      )
    );
    setModoEdicion(null); // Finaliza el modo edición
  };

  const toggleCompletada = (id) => {
    setTareas(
      tareas.map((t) =>
        t.id === id ? { ...t, completada: !t.completada } : t
      )
    );
  };

  return (
    <div className="app-container">
      <header className="header">
        <h1>Lista de Tareas</h1>
        <button className="filter-button">
          No mostrar completadas
        </button>
      </header>
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
      <ul className="task-list">
        {tareas.map((tarea) => (
          <li key={tarea.id} className={tarea.completada ? "completed" : ""}>
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
                  onBlur={(e) => actualizarTarea(tarea.id, e.target.value)} // Actualiza al perder foco
                  autoFocus
                />
              ) : (
                <span>{tarea.texto}</span>
              )}
            </div>
            <div className="task-actions">
              {modoEdicion === tarea.id ? (
                <>
                  {/* Botón Actualizar */}
                  <button
                    onClick={() =>
                      actualizarTarea(tarea.id, document.activeElement.value)
                    }
                    className="update-button"
                  >
                    Actualizar
                  </button>
                  {/* Botón Eliminar */}
                  <button
                    onClick={() => eliminarTarea(tarea.id)}
                    className="delete-button"
                  >
                    <FaTimes />
                  </button>
                </>
              ) : modoEdicion === null ? (
                <>
                  {/* Botón Editar */}
                  <button
                    onClick={() => iniciarEdicion(tarea.id)}
                    className="edit-button"
                  >
                    <FaEdit />
                  </button>
                  {/* Botón Eliminar */}
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
