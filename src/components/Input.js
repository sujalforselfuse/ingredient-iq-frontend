import React from 'react'

import { ReactSearchAutocomplete } from 'react-search-autocomplete'

function Input() {
  // note: the id field is mandatory
  const items = [
    {
      id: 0,
      name: 'Health Drink'
    },
    {
      id: 1,
      name: 'Noodles'
    },
    {
      id: 2,
      name: 'Waffers'
    },
    {
      id: 3,
      name: 'Ready to eat'
    }
  ]

  const handleOnSearch = (string, results) => {
    // onSearch will have as the first callback parameter
    // the string searched and for the second the results.
    console.log(string, results)
  }

  const handleOnHover = (result) => {
    // the item hovered
    console.log(result)
  }

  const handleOnSelect = (item) => {
    // the item selected
    console.log(item)
  }

  const handleOnFocus = () => {
    console.log('Focused')
  }

  const formatResult = (item) => {
    return (
      <>
        {/* <span style={{ display: 'block', textAlign: 'left' }}>id: {item.id}</span> */}
        <span style={{ display: 'block', textAlign: 'left' }}>{item.name}</span>
      </>
    )
  }

  return (
    
        <div className='mx-auto mt-6' style={{ width: 350 }}>
          <ReactSearchAutocomplete
            items={items}
            onSearch={handleOnSearch}
            onHover={handleOnHover}
            onSelect={handleOnSelect}
            onFocus={handleOnFocus}
            autoFocus
            formatResult={formatResult}
          />
        </div>
      
  )
}

export default Input