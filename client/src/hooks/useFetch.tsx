import * as React from 'react'

const API_KEY = import.meta.env.VITE_GIPHY_API_KEY

interface FetchProps {
    keyword: string
}

export const useFetch = (props: FetchProps) => {
    const { keyword } = props
    const [gifUrl, setGifUrl] = React.useState<string>('')

    
    React.useEffect(() => {
        const fetchGif = async () => {
            // &tag=${encodeURIComponent('ethereum')}
            try {
                const response = await fetch(`http://api.giphy.com/v1/gifs/random?api_key=${encodeURIComponent(API_KEY)}&tag=${encodeURIComponent(keyword.split(" ").join(""))}`, {
                    method: 'GET'
                })
                console.log('response', response)
                const { data } = await response.json()
                console.log('data', data)
                console.log('url', data.url)
                if (response.ok && response.status === 200) {
                    setGifUrl(data.url)
                }
            } catch {
                console.error('Fetching of the GIF failed')
                setGifUrl("https://www.omnisend.com/blog/wp-content/uploads/2016/09/funny-gifs-9.gif") // url fallback
            }
        }
        if (keyword) {
            fetchGif()
        } else {
            setGifUrl("https://www.omnisend.com/blog/wp-content/uploads/2016/09/funny-gifs-9.gif") // url fallback
        }
    }, [keyword])

    return gifUrl
}