import React from 'react'

const CharacterTableDetail = ({ character }) => {
  if (!character) {
    return (
      <div className="mt-6 p-6 bg-gray-100 rounded-lg text-center text-blue-500">
        Seçili karakter yok.
      </div>
    )
  }

  return (
    <div className="mt-6 p-10 bg-white rounded-xl shadow-lg max-w-6xl mx-auto flex items-center justify-center gap-4">
      <img
        src={character.image}
        alt={character.name}
        className="w-40 h-40 rounded-full border-8 border-blue-400 shadow-lg transition-transform duration-300 hover:scale-105"
      />
      <div className="text-gray-800 text-center">
        <h3 className="text-3xl font-extrabold mb-4">{character.name}</h3>

        <div className="space-y-3 text-lg">
          <p>
            <span className="font-semibold text-blue-600">Cinsiyet:</span>{' '}
            {character.gender}
          </p>
          <p>
            <span className="font-semibold text-blue-600">Durum:</span>{' '}
            {character.status}
          </p>
          <p>
            <span className="font-semibold text-blue-600">Tür:</span>{' '}
            {character.species}
          </p>
          <p>
            <span className="font-semibold text-blue-600">Lokasyon:</span>{' '}
            {character.location.name}
          </p>
        </div>
      </div>
    </div>
  )
}

export default CharacterTableDetail
