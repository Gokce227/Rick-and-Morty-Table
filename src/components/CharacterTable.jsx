import React, { useEffect, useState } from 'react'
import { DataGrid } from '@mui/x-data-grid'
import { useDispatch, useSelector } from 'react-redux'
import { getCharacters } from '../redux/slice/CharactarSlice'
import CharacterTableDetail from './CharacterTableDetail'

const CharacterTable = () => {
  const dispatch = useDispatch()
  const { characters, status } = useSelector((state) => state.characters) // Slicesimizdan karakterlerimizi cektik

  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 20, // Sayfa ilk acildiginda 20 satir gozukecek
  })

  const [searchQuery, setSearchQuery] = useState('')
  const [speciesFilter, setSpeciesFilter] = useState('')
  const [genderFilter, setGenderFilter] = useState('')
  const [statusFilter, setStatusFilter] = useState('')
  const [selectedCharacter, setSelectedCharacter] = useState(null)

  useEffect(() => {
    if (status === 'idle') {
      dispatch(getCharacters())
    }
  }, [status, dispatch])

  const speciesOptions = [...new Set(characters.map((c) => c.species))].sort()  // Her bir tur degerini aliyoruz
  const genderOptions = [...new Set(characters.map((c) => c.gender))].sort()
  const statusOptions = [...new Set(characters.map((c) => c.status))].sort()

  const limitedCharacters = characters.slice(0, 250) // 250 satir tablo gozukecek

  const filteredRows = limitedCharacters
    .filter((char) => char.name.toLowerCase().includes(searchQuery.toLowerCase()))
    .filter((char) => (speciesFilter ? char.species === speciesFilter : true)) 
    .filter((char) => (genderFilter ? char.gender === genderFilter : true))
    .filter((char) => (statusFilter ? char.status === statusFilter : true))
    .map((char) => ({
      id: char.id,
      name: char.name,
      gender: char.gender,
      status: char.status,
      species: char.species, // Yeni bir dizi olusturuldu
    }))

  const columns = [
    { field: 'id', headerName: 'ID', width: 90 },
    { field: 'name', headerName: 'Name', width: 200 },
    { field: 'gender', headerName: 'Gender', width: 130 },
    { field: 'status', headerName: 'Status', width: 130 },
    { field: 'species', headerName: 'Species', width: 130 },
  ]

  const handleRowClick = (params) => {
    const fullCharacter = characters.find((char) => char.id === params.id)
    setSelectedCharacter(fullCharacter)
  }

  return (
    <div className="max-w-7xl mx-auto p-6 bg-gray-50 rounded-lg shadow-md">
      <h2 className="text-3xl font-semibold mb-6 text-center text-gray-800">Rick and Morty Characters</h2>

      <div className="flex flex-wrap justify-center gap-4 mb-6">
        <input
          type="text"
          placeholder="Karakter Ara"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-80 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <select
          value={speciesFilter}
          onChange={(e) => setSpeciesFilter(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          <option value="">Tür Seç</option>
          {speciesOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>

        <select
          value={genderFilter}
          onChange={(e) => setGenderFilter(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          <option value="">Cinsiyet Seç</option>
          {genderOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          <option value="">Durum Seç</option>
          {statusOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>

        <button
          onClick={() => {
            setSearchQuery('')
            setSpeciesFilter('')
            setGenderFilter('')
            setStatusFilter('')
          }}
          className="px-5 py-2 bg-white border border-gray-300 rounded-md hover:border-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-700 transition"
        >
          Filtreleri Temizle
        </button>
      </div>

      <div className="bg-white rounded-md shadow overflow-hidden">
          {filteredRows.length === 0 ? (
                <div className="text-center text-blue-500 py-10 text-lg">
                    Filtreleme sonucunda eşleşen bir karakter bulunamadı.
                </div>
            ) : (
              <DataGrid
                rows={filteredRows}
                columns={columns}
                paginationModel={paginationModel}
                onPaginationModelChange={setPaginationModel}
                pageSizeOptions={[20, 50, 100]}
                disableRowSelectionOnClick
                onRowClick={handleRowClick}
                autoHeight
                sx={{
                    border: 'none',
                    '& .MuiDataGrid-columnHeaders': {
                          backgroundColor: '#f3f4f6',
                    },
                    '& .MuiDataGrid-row:hover': {
                          backgroundColor: '#e0f7fa',
                          cursor: 'pointer',
                    },
                }}
                components={{
                    ColumnMenu: () => null,
                }}
              />
         )}
      </div>

      <div className="mt-6">
        <CharacterTableDetail character={selectedCharacter} />
      </div>
    </div>
  )
}

export default CharacterTable
