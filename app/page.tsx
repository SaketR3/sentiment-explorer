'use client'
import { useEffect, useState } from 'react'
import useSWRMutation from 'swr/mutation'

async function fetcher(url: RequestInfo | URL) {
  const response = await fetch(url)
  return response.json()
}

export default function Home() {
  const [query, setQuery] = useState('')
  const [title, setTitle] = useState('')
  const [loading, setLoading] = useState(false)
  const { trigger, data: res, error } = useSWRMutation(`/api/analysis?search=${query.toLowerCase()}`, fetcher)
  
  function handleFormSubmit(e: { preventDefault: () => void; }) {
    e.preventDefault()

    if (query == '') {
      return
    }

    setLoading(true)
    setTitle(query)
    setQuery('')
    trigger()
  }

  useEffect(() => {
    setLoading(false)
  }, [res])

  return (
    <div>
      <div className='header'>
        <p className='logo font-mackinac'>Sentiment Explorer</p>
      </div>
      <div className='header-spacer'></div>
      
      <div className='banner banner-sentiment-explorer'>
        <h1 className='banner-heading font-mackinac'>Sentiment Explorer</h1>
      </div>

      <div className='description'>
        <p className='description-paragraph'>
          We live in a diverse society, where people have different opinions on many topics. But how do people really feel about certain issues? 
          Most of us – trapped in filter bubbles and echo chambers on social media – simply don't know. While there are plenty of opinion polls 
          and surveys out there, they are far from comphrehensive.
        </p>
        <p className='description-paragraph'>
          We need a simple way to gage people's opinions on issues. Knowing what people think of issues such as climate change, economic policies, 
          and civil rights can have important implications for policymakers, interest groups, and others.
        </p>
        <p className='description-paragraph'>
          That's where Sentiment Explorer comes in. With Sentiment Explorer, you can search for <em>any</em> topic you want. When you search for a topic, 
          Sentiment Explorer combs through a dataset of nearly 550,000 tweets posted during 2022 and finds tweets with your search term. A sentiment 
          analysis model that makes use of a recurrent neural network (RNN) then analyzes the relevant tweets and displays how people feel about the topic. 
        </p>
      </div>
      
      <div className='banner banner-explore-the-data'>
        <h1 className='banner-heading font-mackinac'>Explore The Data</h1>
      </div>

      <p className='instructions'>Simply enter a topic you're interested in, and click submit!</p>
      <form onSubmit={handleFormSubmit}>
        <label htmlFor='search' className='search-label visually-hidden'>Search Query: </label>
        <div className='search-container'>
          <input id='search' type='text' name='search' value={query} onChange={(e) => setQuery(e.target.value)} />
          <input id='submit' type='submit' value='Submit' />
        </div>
      </form>

      {(loading && !error) && <p className='loading'>Loading...</p>}
      {error && 
        (<div className='error-message'>
          <p>An error occurred; please try again.</p>
          <p>If the error persists, the problem may be caused by your search term.</p>
          <p>If you tried searching for a very broad term, the connection may time out due to the amount of data the model has to process.</p>
          <p>Consider using a more specific search term.</p>
        </div>)
      }
      {(!loading && res && res.analysis == -1) && <p className='error-message'>No data found for this search term.</p>}

      {(!loading && res && res.analysis != -1) && 
        <div>
          <p className='query'>{title.toUpperCase()}</p>

          <div className='analysis'>
            <div className='analysis-bar'>
              <div style={{flexBasis: `${Math.floor(res.analysis * 100)}%`}} className='analysis-bar-sections analysis-bar-section1'></div>
              <div style={{flexBasis: `${100 - Math.floor(res.analysis * 100)}%`}} className='analysis-bar-sections analysis-bar-section2'></div>
            </div>
          </div>

          <div className='numbers-outer-container'>
            <div className='numbers-inner-container'>
              <div className='color-number-container'>
                <div className='green'></div>
                <p className='numbers'>{(res.analysis * 100).toFixed(2)}% POSITIVE     </p>
              </div>
              <div className='color-number-container red-color-number-container'>
                <div className='red'></div>
                <p className='numbers'>{(100 - (res.analysis * 100)).toFixed(2)}% NEGATIVE</p>
              </div>
            </div>
          </div>
        </div>}

        <div className='footer'>
            <p className='footer-credit'>Designed and programmed by Saket Reddy</p>
            <div className='footer-column'>
                <p className='footer-header'>Contact</p>
                <p className='footer-body'>sreddyj2023@gmail.com</p>
            </div>
            <div className='footer-column'>
                <p className='footer-header footer-code-header'>Code</p>
                <a href='https://github.com/SaketR3' target='_blank' className='footer-body footer-code-body underline'>GitHub</a>
            </div>
        </div>
    </div>
  )
}
