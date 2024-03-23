import React from 'react'

export const SearchItem = ({search, setSearch}) => {
  return (
    <form className='searchForm' onSubmit={(e) => e.preventDefault()}>
        <lable htmlFor="search"></lable>
        <input
            id = 'Search'
            type="text"
            role='searchbox'
            placeholder='Search Items'
            value={search}
            onChange={(e) => setSearch(e.target.value)}
        />
    </form>
  )
}