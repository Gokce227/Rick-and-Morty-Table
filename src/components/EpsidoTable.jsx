import React, { useEffect, useState } from 'react'
import { DataGrid } from '@mui/x-data-grid'
import { useDispatch, useSelector } from 'react-redux'
import { getCharacters } from '../redux/slice/CharactarSlice'
import CharacterTableDetail from './CharacterTableDetail'

const EpsidoTable = () => {
     const dispatch = useDispatch()
     const { characters, status } = useSelector((state) => state.characters)

     const [paginationModel, setPaginationModel] = useState({
          page: 0,
          pageSize: 20,
     })

     const [locationFilter, setLocationFilter] = useState('')
     const [episodeFilter, setEpisodeFilter] = useState('')
     const [selectedCharacter, setSelectedCharacter] = useState(null)

     useEffect(() => {
          if (status === 'idle') {
               dispatch(getCharacters())
          }
     }, [status, dispatch])

     const locationOptions = [...new Set(characters.map((c) => c.location.name))].sort()

     // Tüm episode URL'lerini al, benzersiz yap ve ID'sini çek
     const allEpisodeUrls = characters.flatMap((c) => c.episode)
     const uniqueEpisodeUrls = [...new Set(allEpisodeUrls)]
     const episodeOptions = uniqueEpisodeUrls
          .map((url) => url.split('/').pop())
          .sort((a, b) => a - b)

     const columns = [
          { field: 'id', headerName: 'ID', width: 90 },
          { field: 'name', headerName: 'Name', width: 200 },
          { field: 'gender', headerName: 'Gender', width: 130 },
          { field: 'status', headerName: 'Status', width: 130 },
          { field: 'species', headerName: 'Species', width: 130 },
     ]

     const limitedCharacters = characters.slice(0, 250)

     const filteredRows = limitedCharacters
          .filter((char) => (locationFilter ? char.location.name === locationFilter : true))
          .filter((char) =>
               episodeFilter ? char.episode.some((epUrl) => epUrl.endsWith(`/${episodeFilter}`)) : true
          )
          .map((char) => ({
               id: char.id,
               name: char.name,
               gender: char.gender,
               status: char.status,
               species: char.species,
          }))

     const handleRowClick = (params) => {
          const fullCharacter = characters.find((char) => char.id === params.id)
          setSelectedCharacter(fullCharacter)
     }

     return (
          <div className="max-w-7xl mx-auto p-6 bg-gray-50 rounded-lg shadow-md">
               <h2 className="text-3xl font-semibold mb-8 text-center text-gray-800">Rick and Morty Epsideos & Locations </h2>

               <div className="flex flex-wrap justify-center gap-4 mb-6">
                    <select
                         value={locationFilter}
                         onChange={(e) => setLocationFilter(e.target.value)}
                         className="w-44 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                    >
                         <option value="">Lokasyon Seç</option>
                         {locationOptions.map((option) => (
                              <option key={option} value={option}>
                                   {option}
                              </option>
                         ))}
                    </select>
                    <select
                         value={episodeFilter}
                         onChange={(e) => setEpisodeFilter(e.target.value)}
                         className="w-44 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                    >
                         <option value="">Episode Seç (ID)</option>
                         {episodeOptions.map((id) => (
                              <option key={id} value={id}>
                                   Episode {id}
                              </option>
                         ))}
                    </select>
                    <button
                         onClick={() => {
                              setLocationFilter('')
                              setEpisodeFilter('')
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

export default EpsidoTable
