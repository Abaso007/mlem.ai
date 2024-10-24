import React, { useEffect, useState } from 'react'
import Promise from 'promise-polyfill'
import { loadResource } from '@dvcorg/gatsby-theme-iterative/src/utils/front/resources'

import * as styles from '@dvcorg/gatsby-theme-iterative/src/components/Documentation/Layout/SearchForm/styles.module.css'

declare global {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  interface Window {
    docsearch?: (opts: Record<string, unknown>) => void
  }
}

const SearchForm: React.FC = props => {
  const [searchAvailable, setSearchAvailable] = useState<boolean>(false)
  useEffect(() => {
    if (window) {
      if (!window.docsearch) {
        Promise.all([
          loadResource(
            'https://cdn.jsdelivr.net/npm/docsearch.js@2.6.2/dist/cdn/docsearch.min.css'
          ),
          loadResource(
            'https://cdn.jsdelivr.net/npm/docsearch.js@2.6.2/dist/cdn/docsearch.min.js'
          )
        ]).then(() => {
          if (window.docsearch) {
            window.docsearch({
              appId: 'MY83GIY4K1',
              apiKey: '921d1a6ecfeee885b3faea51f0542478',
              indexName: 'mlemai_doc',
              inputSelector: '#doc-search',
              debug: false // Set to `true` if you want to inspect the dropdown
            })
            setSearchAvailable(true)
          }
        })
      } else {
        window.docsearch({
          appId: 'MY83GIY4K1',
          apiKey: '921d1a6ecfeee885b3faea51f0542478',
          indexName: 'mlemai_doc',
          inputSelector: '#doc-search',
          debug: false // Set to `true` if you want to inspect the dropdown
        })
        setSearchAvailable(true)
      }
    }
  }, [])

  return (
    <div className={styles.searchArea}>
      <div className={styles.container}>
        <input
          className={styles.input}
          type="text"
          id="doc-search"
          placeholder="Search docs"
          disabled={!searchAvailable}
          {...props}
        />
      </div>
    </div>
  )
}

export default SearchForm
