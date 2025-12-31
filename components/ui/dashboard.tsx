"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"

function Editor({
  title,
  onSave,
  onCancel,
}: { title: string; onSave: (newTitle: string) => void; onCancel: () => void }) {
  const [editTitle, setEditTitle] = useState(title)

  return (
    <div className="mt-4 p-4 border rounded-lg bg-gray-50">
      <h3 className="text-lg font-semibold mb-2">Editar Título</h3>
      <input
        type="text"
        value={editTitle}
        onChange={(e) => setEditTitle(e.target.value)}
        className="w-full p-2 border rounded mb-3"
        placeholder="Ingresa el nuevo título"
      />
      <div className="space-x-2">
        <Button onClick={() => onSave(editTitle)} variant="default">
          Guardar
        </Button>
        <Button onClick={onCancel} variant="outline">
          Cancelar
        </Button>
      </div>
    </div>
  )
}

function ConfirmDelete({ onConfirm, onCancel }: { onConfirm: () => void; onCancel: () => void }) {
  return (
    <div className="mt-4 p-4 border rounded-lg bg-red-50 border-red-200">
      <h3 className="text-lg font-semibold mb-2 text-red-800">Confirmar Eliminación</h3>
      <p className="text-red-700 mb-3">¿Estás seguro de que quieres eliminar este título?</p>
      <div className="space-x-2">
        <Button onClick={onConfirm} variant="destructive">
          Eliminar
        </Button>
        <Button onClick={onCancel} variant="outline">
          Cancelar
        </Button>
      </div>
    </div>
  )
}

export function Dashboard() {
  const [title, setTitle] = useState("Título original")
  const [modo, setModo] = useState<"normal" | "editar" | "borrar">("normal")

  async function guardarCambios() {
    const res = await fetch("/api/guardar", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title }),
    })
    if (res.ok) {
      alert("Cambios guardados!")
    } else {
      alert("Error al guardar")
    }
  }

  function handleSave(newTitle: string) {
    setTitle(newTitle)
    setModo("normal")
  }

  function handleDelete() {
    setTitle("Título original")
    setModo("normal")
    alert("Título eliminado!")
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">{title}</h1>
      <div className="mt-4 space-x-2">
        <Button onClick={() => setTitle("Título actualizado")} variant="default">
          Cambiar título
        </Button>
        <Button onClick={guardarCambios} variant="default">
          Guardar cambios
        </Button>
        <Button onClick={() => setModo("editar")} variant="outline">
          Editar
        </Button>
        <Button onClick={() => setModo("borrar")} variant="destructive">
          Borrar
        </Button>
      </div>

      {modo === "editar" && <Editor title={title} onSave={handleSave} onCancel={() => setModo("normal")} />}
      {modo === "borrar" && <ConfirmDelete onConfirm={handleDelete} onCancel={() => setModo("normal")} />}
    </div>
  )
}
